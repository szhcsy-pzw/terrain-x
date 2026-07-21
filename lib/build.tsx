"use client";

// ============================================================
// 选配清单（迁移自旧站 js/build.js 的 SandoBuild）
// localStorage key 与旧站一致：sando_build_v1
// 条目为复合 id：kind:rawId，支持 整车/配件/户外 三类产品
//   bike:x1 · part:frame-01 · out:h1
// 兼容旧数据（纯配件 id 无前缀）自动识别为配件
// ============================================================

import { createContext, useContext, useEffect, useState } from "react";

const KEY = "sando_build_v1";

export type BuildKind = "bike" | "part" | "out";

export interface BuildRef {
  kind: BuildKind;
  id: string; // 原始产品 id
}

interface BuildCtx {
  items: string[]; // 复合 id 列表
  refs: BuildRef[]; // 解析后的引用列表
  has: (kind: BuildKind, id: string) => boolean;
  toggleItem: (kind: BuildKind, id: string) => void;
  remove: (kind: BuildKind, id: string) => void;
  clear: () => void;
  open: boolean;
  setOpen: (v: boolean) => void;
}

const Ctx = createContext<BuildCtx | null>(null);

function makeKey(kind: BuildKind, id: string) {
  return `${kind}:${id}`;
}

function parseKey(key: string): BuildRef {
  if (key.startsWith("bike:")) return { kind: "bike", id: key.slice(5) };
  if (key.startsWith("out:")) return { kind: "out", id: key.slice(4) };
  if (key.startsWith("part:")) return { kind: "part", id: key.slice(5) };
  // 旧数据：无前缀的纯配件 id
  return { kind: "part", id: key };
}

export function BuildProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  const persist = (next: string[]) => {
    setItems(next);
    window.localStorage.setItem(KEY, JSON.stringify(next));
  };

  const value: BuildCtx = {
    items,
    refs: items.map(parseKey),
    has: (kind, id) => items.includes(makeKey(kind, id)) || (kind === "part" && items.includes(id)),
    toggleItem: (kind, id) => {
      const key = makeKey(kind, id);
      // 配件兼容旧前缀
      const legacy = kind === "part" ? id : key;
      if (items.includes(key) || (kind === "part" && items.includes(legacy))) {
        persist(items.filter((x) => x !== key && x !== legacy));
      } else {
        persist([...items, key]);
      }
    },
    remove: (kind, id) => {
      const key = makeKey(kind, id);
      const legacy = kind === "part" ? id : key;
      persist(items.filter((x) => x !== key && x !== legacy));
    },
    clear: () => persist([]),
    open,
    setOpen,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useBuild(): BuildCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useBuild must be used within BuildProvider");
  return ctx;
}
