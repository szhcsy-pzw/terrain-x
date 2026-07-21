"use client";

// ============================================================
// 图片媒体层 v2：
// - key 支持两类：
//     路径型  "assets/hero/home.svg"   → 通用图（logo/背景/系统图）
//     产品型  "bike:x1" / "part:frame-01" / "out:h1"  → 精准绑定单个产品
// - 上传图转 base64 存 localStorage，读取优先；产品图无上传时回退默认/系统图
// ============================================================

import { useEffect, useState } from "react";
// 已落库的部署默认图片（data/seed.json 的 media 字段）。后台上传图经导出→落库后，部署即生效。
import seed from "@/data/seed.json";

const MEDIA_KEY = "sando_media_v1";

export type MediaMap = Record<string, string>; // key → base64 dataURL

const SEED_MEDIA: MediaMap = (seed.media ?? {}) as MediaMap;

export function loadMediaMap(): MediaMap {
  const base: MediaMap = { ...SEED_MEDIA };
  if (typeof window === "undefined") return base;
  try {
    const raw = window.localStorage.getItem(MEDIA_KEY);
    return raw ? { ...base, ...JSON.parse(raw) } : base;
  } catch {
    return base;
  }
}

export function saveMediaMap(map: MediaMap) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(MEDIA_KEY, JSON.stringify(map));
  window.dispatchEvent(new Event("sando-data-updated"));
}

export function clearMediaMap() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(MEDIA_KEY);
  window.dispatchEvent(new Event("sando-data-updated"));
}

/**
 * 解析图片：优先产品专属上传图，其次路径上传图，最后默认路径
 * @param key 产品 key（bike:x1）或路径（assets/...）
 * @param fallbackPath key 无上传时用的默认路径（assets/...）
 */
function resolve(key: string, fallbackPath: string): string {
  const map = loadMediaMap();
  if (map[key]) return map[key];
  if (map[fallbackPath]) return map[fallbackPath];
  return "/" + fallbackPath;
}

/** Hook：按 key + 回退路径取图，自动响应后台上传 */
export function useMedia(key: string, fallbackPath?: string): string {
  const fb = fallbackPath ?? key;
  const [src, setSrc] = useState<string>("/" + fb);
  useEffect(() => {
    const reload = () => setSrc(resolve(key, fb));
    reload();
    window.addEventListener("sando-data-updated", reload);
    window.addEventListener("storage", reload);
    return () => {
      window.removeEventListener("sando-data-updated", reload);
      window.removeEventListener("storage", reload);
    };
  }, [key, fb]);
  return src;
}

/** 压缩并读取上传文件 → base64 dataURL */
export function fileToCompressedDataUrl(file: File, maxWidth = 1200): Promise<string> {
  if (file.type === "image/svg+xml") {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width);
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("canvas ctx"));
        const keepAlpha = file.type === "image/png";
        if (!keepAlpha) {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, w, h);
        }
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL(keepAlpha ? "image/png" : "image/jpeg", keepAlpha ? undefined : 0.82));
      };
      img.onerror = reject;
      img.src = String(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
