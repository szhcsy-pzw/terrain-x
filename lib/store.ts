"use client";

// ============================================================
// 运行时数据层 v2（对齐旧站 SANDO_DATA 结构）
// - 默认数据来自 lib/catalog.ts（构建进静态产物）
// - 后台 /admin 的修改写入 localStorage，前台读取时合并覆盖
// - 将来接真实后端（如 GitHub API / 自有 API）时，只需替换 loadSiteData
// ============================================================

import { useEffect, useState } from "react";
import {
  bikeBOM,
  bikes,
  camping,
  componentGroups,
  components,
  dealers,
  hiking,
  storeUrl,
} from "./catalog";
import { Bike, ComponentItem, OutdoorItem, SiteSettings } from "./types";
import { defaultSiteSettings } from "./site-config";

export interface CatalogData {
  bikes: Bike[];
  hiking: OutdoorItem[];
  camping: OutdoorItem[];
  components: ComponentItem[];
  settings: SiteSettings;
}

const STORAGE_KEY = "sando_admin_v2";

export function defaultCatalog(): CatalogData {
  return {
    bikes,
    hiking,
    camping,
    components,
    settings: defaultSiteSettings,
  };
}

export function loadCatalog(): CatalogData {
  if (typeof window === "undefined") return defaultCatalog();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultCatalog();
    const parsed = JSON.parse(raw) as CatalogData;
    return { ...defaultCatalog(), ...parsed };
  } catch {
    return defaultCatalog();
  }
}

export function saveCatalog(data: CatalogData) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new Event("sando-data-updated"));
}

export function resetCatalog() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event("sando-data-updated"));
}

/** 前台页面 Hook：自动响应后台修改 */
export function useCatalog(): CatalogData {
  const [data, setData] = useState<CatalogData>(() => defaultCatalog());
  useEffect(() => {
    const reload = () => setData(loadCatalog());
    reload();
    window.addEventListener("sando-data-updated", reload);
    window.addEventListener("storage", reload);
    return () => {
      window.removeEventListener("sando-data-updated", reload);
      window.removeEventListener("storage", reload);
    };
  }, []);
  return data;
}

// 静态只读数据（后台不编辑的部分直接引用）
export { bikeBOM, componentGroups, dealers, storeUrl };
