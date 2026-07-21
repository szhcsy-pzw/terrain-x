// 共享类型：catalog.ts 里的产品类型 + 站点设置类型
export type {
  Bike,
  BikeSize,
  BikeSpec,
  OutdoorItem,
  ComponentGroup,
  ComponentItem,
  BomRow,
  Dealer,
} from "./catalog";

/** 站点设置（后台「站点设置」可编辑） */
export interface SiteSettings {
  logoUrl: string; // 默认 assets/logo/combo.svg
  heroBg: string; // 首页 hero 背景图路径或预设 id
  heroTitle1: string;
  heroTitle2: string;
  heroSubtitle: string;
  differentiators: { title: string; desc: string }[];
  communityNote: string;
  manualNote: string;
  storeUrl: string;
  hq: { name: string; phone: string; email: string; addr: string };
}

/** 选配清单条目 */
export interface BuildItem {
  id: string; // component id
  addedAt: number;
}
