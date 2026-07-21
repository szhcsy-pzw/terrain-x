"use client";

// ============================================================
// 产品详情抽屉状态（对应旧站 SandoDrawer）
// 统一承载三类产品：整车 / 配件 / 户外单品
// ============================================================

import { createContext, useContext, useState } from "react";
import { Bike, ComponentItem, OutdoorItem } from "./types";

export type DrawerPayload =
  | { kind: "bike"; data: Bike }
  | { kind: "component"; data: ComponentItem }
  | { kind: "outdoor"; data: OutdoorItem; series: "hiking" | "camping" };

interface DrawerCtx {
  payload: DrawerPayload | null;
  openDrawer: (p: DrawerPayload) => void;
  closeDrawer: () => void;
}

const Ctx = createContext<DrawerCtx | null>(null);

export function DrawerProvider({ children }: { children: React.ReactNode }) {
  const [payload, setPayload] = useState<DrawerPayload | null>(null);

  const value: DrawerCtx = {
    payload,
    openDrawer: (p) => setPayload(p),
    closeDrawer: () => setPayload(null),
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useDrawer(): DrawerCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useDrawer must be used within DrawerProvider");
  return ctx;
}
