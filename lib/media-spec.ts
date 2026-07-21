// ============================================================
// 全站可编辑图片位 + 上传规格指引
// - 通用图（logo / 背景）：静态清单，key = 路径
// - 产品图（整车 / 配件 / 户外）：从 catalog 动态生成，key = bike:/part:/out:
//   上传后精准绑定到单个产品；配件无上传时回退到所属系统图
// ============================================================

import { componentGroups } from "./catalog";

export interface MediaSlot {
  /** 图片 key：通用图=路径（assets/...），产品图=bike:x1 / part:frame-01 / out:h1 */
  key: string;
  /** 默认/回退图片路径（相对 public） */
  path: string;
  /** 显示名 */
  label: string;
  /** 用途说明 */
  usage: string;
  /** 建议尺寸（像素） */
  size: string;
  /** 建议比例 */
  ratio: string;
  /** 建议格式 */
  format: string;
  /** 上传压缩到的最大宽度（px） */
  maxWidth: number;
  /** 建议文件体积上限提示 */
  maxSizeHint: string;
  /** 子分组名（配件按系统归类显示用） */
  sub?: string;
}

export interface MediaGroup {
  id: string;
  title: string;
  icon: string;
  slots: MediaSlot[];
}

// ---------- 通用图规格 ----------
const LOGO_SPEC = { size: "320 × 96 px", ratio: "10:3 横版", format: "SVG / 透明底 PNG", maxWidth: 640, maxSizeHint: "≤ 100 KB" };
const HERO_SPEC = { size: "1600 × 900 px", ratio: "16:9", format: "JPG / WebP", maxWidth: 1920, maxSizeHint: "≤ 400 KB" };
const PRODUCT_SPEC = { size: "800 × 600 px", ratio: "4:3", format: "PNG / WebP", maxWidth: 1200, maxSizeHint: "≤ 250 KB" };
const PART_SPEC = { size: "800 × 600 px", ratio: "4:3", format: "PNG / WebP", maxWidth: 1200, maxSizeHint: "≤ 250 KB" };

// ---------- 通用图（logo + 背景）----------
export const generalGroups: MediaGroup[] = [
  {
    id: "logo",
    title: "品牌 Logo",
    icon: "🏷️",
    slots: [
      { key: "assets/logo/combo.svg", path: "assets/logo/combo.svg", label: "组合 Logo（导航 + 页脚）", usage: "顶部导航左侧 & 页脚，透明底横向。", ...LOGO_SPEC },
      { key: "assets/logo/sando.svg", path: "assets/logo/sando.svg", label: "SANDO 单品牌 Logo", usage: "SANDO 自行车相关品牌位。", ...LOGO_SPEC },
      { key: "assets/logo/terrainx.svg", path: "assets/logo/terrainx.svg", label: "terrain-x 单品牌 Logo", usage: "terrain-x 户外相关品牌位。", ...LOGO_SPEC },
    ],
  },
  {
    id: "hero",
    title: "首屏背景图",
    icon: "🖼️",
    slots: [
      { key: "assets/hero/home.svg", path: "assets/hero/home.svg", label: "首页 Hero 背景", usage: "首页顶部大图，深色蒙版之上显示文字。", ...HERO_SPEC },
      { key: "assets/hero/outdoor.svg", path: "assets/hero/outdoor.svg", label: "户外页 Hero 背景", usage: "户外产品线页顶部背景。", ...HERO_SPEC },
    ],
  },
];

// ---------- 产品图（动态生成）----------
interface CatalogLike {
  bikes: { id: string; name: string; code: string; image: string }[];
  hiking: { id: string; name: string; image: string }[];
  camping: { id: string; name: string; image: string }[];
  components: { id: string; name: string; g: string }[];
}

export function productGroups(catalog: CatalogLike): MediaGroup[] {
  return [
    {
      id: "bikes",
      title: "整车效果图",
      icon: "🚲",
      slots: catalog.bikes.map((b) => ({
        key: `bike:${b.id}`,
        path: b.image,
        label: `${b.name}`,
        usage: `整车 ${b.code} 的效果图，用于车型卡 / 整车页 / 详情抽屉。`,
        ...PRODUCT_SPEC,
      })),
    },
    {
      id: "parts",
      title: "自行车配件图",
      icon: "🔧",
      slots: catalog.components.map((c) => {
        const g = componentGroups.find((x) => x.id === c.g);
        return {
          key: `part:${c.id}`,
          path: `assets/parts/${c.g}.svg`,
          label: c.name,
          usage: g ? `所属系统：${g.name}。不上传则用系统通用图。` : "不上传则用系统通用图。",
          sub: g?.name ?? c.g,
          ...PART_SPEC,
        };
      }),
    },
    {
      id: "outdoor",
      title: "户外产品图",
      icon: "⛺",
      slots: [
        ...catalog.hiking.map((o) => ({
          key: `out:${o.id}`,
          path: o.image,
          label: o.name,
          usage: "户外徒步单品，用于列表卡 / 详情抽屉。",
          sub: "户外徒步",
          ...PRODUCT_SPEC,
        })),
        ...catalog.camping.map((o) => ({
          key: `out:${o.id}`,
          path: o.image,
          label: o.name,
          usage: "露营装备单品，用于列表卡 / 详情抽屉。",
          sub: "露营装备",
          ...PRODUCT_SPEC,
        })),
      ],
    },
  ];
}

/** 全部图片位（通用 + 产品） */
export function allSlots(catalog: CatalogLike): MediaSlot[] {
  return [
    ...generalGroups.flatMap((g) => g.slots),
    ...productGroups(catalog).flatMap((g) => g.slots),
  ];
}

/** 根据 key 反查图片位 */
export function findSlot(catalog: CatalogLike, key: string): MediaSlot | undefined {
  return allSlots(catalog).find((s) => s.key === key);
}
