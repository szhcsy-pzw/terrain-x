// 把旧站 data/i18n-data.js 的英文补丁合并进 lib/catalog.ts 的 en 字段
// 运行: node scripts/migrate-i18n.cjs
const fs = require("fs");
const path = require("path");

const OLD = "C:/Users/Administrator/.qclaw/_tmp_clone/data";
const libDir = path.join(__dirname, "..", "lib");

// 先让 SANDO_DATA 可用，再执行 i18n-data.js 打补丁
const rawProducts = fs.readFileSync(path.join(OLD, "products.js"), "utf8");
const mod = { exports: {} };
new Function("module", "window", rawProducts)(mod, {});
const windowObj = { SANDO_DATA: mod.exports };

const rawI18n = fs.readFileSync(path.join(OLD, "i18n-data.js"), "utf8");
new Function("window", rawI18n)(windowObj);

const D = windowObj.SANDO_DATA;

// 用打了 en 补丁的数据重新生成 catalog.ts（复用 migrate-data 的模板逻辑）
delete require.cache[require.resolve("./migrate-data.cjs")];

// 直接在这里内联生成，避免重复跑脚本读旧文件
const dealers = (() => {
  const raw = fs.readFileSync(path.join(OLD, "dealers.js"), "utf8");
  const w = {};
  new Function("window", raw)(w);
  return w.SANDO_DEALERS;
})();

const out = `// ============================================================
// 从旧站 data/products.js + i18n-data.js + dealers.js 自动迁移
// 结构与原站 SANDO_DATA 保持一致（含 en 双语字段）
// ============================================================

export interface BikeSize {
  code: string; h: string; inseam: string; frameSku: string;
  crank: number; dropper: number; stem: number; bar: number; rotor: number;
}
export interface BikeSpec { k: string; v: string }
export interface Bike {
  id: string; code: string; level: string;
  sizes: BikeSize[];
  image: string; name: string; sub: string;
  price: string; priceNote: string; accent: string;
  specs: BikeSpec[]; intro: string; features: string[];
  en?: { name?: string; sub?: string; intro?: string; features?: string[]; specs?: BikeSpec[] };
  hidden?: boolean;
}
export interface OutdoorItem {
  id: string; name: string; icon: string; price: string; image: string;
  tag: string; desc: string; fit: string; intro: string; features: string[];
  en?: { name?: string; tag?: string; desc?: string; intro?: string; features?: string[] };
  hidden?: boolean;
}
export interface ComponentGroup { id: string; name: string; en: string }
export interface ComponentItem {
  id: string; g: string; icon: string; name: string; brand: string;
  spec: string; price: string; fit: string;
  en?: { name?: string; spec?: string };
  hidden?: boolean;
}
export interface BomRow {
  no: number; part: string; spec: string; brand: string;
  craft: string; supplier: string; cost: string; cid?: string;
}
export interface Dealer { name: string; en: string; lng: number; lat: number; addr: string }

export const hidePartsPrices: boolean = ${D.hidePartsPrices};
export const storeUrl: string = ${JSON.stringify(D.storeUrl)};

export const bikes: Bike[] = ${JSON.stringify(D.bikes, null, 2)};

export const hiking: OutdoorItem[] = ${JSON.stringify(D.hiking, null, 2)};

export const camping: OutdoorItem[] = ${JSON.stringify(D.camping, null, 2)};

export const componentGroups: ComponentGroup[] = ${JSON.stringify(D.componentGroups, null, 2)};

export const components: ComponentItem[] = ${JSON.stringify(D.components, null, 2)};

export const bikeBOM: Record<string, BomRow[]> = ${JSON.stringify(D.bikeBOM, null, 2)};

export const dealers: Dealer[] = ${JSON.stringify(dealers, null, 2)};
`;

fs.writeFileSync(path.join(libDir, "catalog.ts"), out, "utf8");
const withEn = [
  ...D.bikes.filter((b) => b.en).map((b) => b.id),
  ...D.hiking.filter((b) => b.en).map((b) => b.id),
  ...D.camping.filter((b) => b.en).map((b) => b.id),
  ...D.components.filter((b) => b.en).map((b) => b.id),
];
console.log("OK -> lib/catalog.ts | en-patched:", withEn.length, "items");
