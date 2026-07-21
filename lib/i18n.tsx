"use client";

// ============================================================
// 轻量双语机制（迁移自旧站 js/i18n.js 的思路）
// - UI 字符串字典 t(key)
// - 产品字段 en 补丁：pick(obj, "name") 按当前语言取值
// - localStorage.sando_lang 持久化（与旧站同 key，老访客无感切换）
// ============================================================

import { createContext, useContext, useEffect, useState } from "react";

export type Lang = "cn" | "en";

const UI = {
  cn: {
    // 导航
    "nav.home": "首页",
    "nav.bikes": "自行车整车",
    "nav.parts": "自行车配件",
    "nav.outdoor": "户外",
    "nav.hiking": "户外徒步",
    "nav.camping": "露营装备",
    "nav.dealers": "经销网络",
    "nav.support": "支持",
    "nav.about": "关于",
    "nav.admin": "后台",
    // 通用
    "common.from": "起",
    "common.fit": "适配",
    "common.learnMore": "了解详情",
    "common.viewAll": "查看全部",
    "common.addToBuild": "+ 选配清单",
    "common.inBuild": "✓ 已加入",
    "common.priceAsk": "价格咨询",
    "common.close": "关闭",
    // 抽屉
    "d.features": "功能介绍",
    "d.specs": "型号 / 参数",
    "d.intro": "产品介绍",
    "d.note": "备注",
    // 选配清单
    "build.title": "选配清单",
    "build.empty": "还没有选配件，去配件页挑几件吧。",
    "build.export": "导出 JSON",
    "build.clear": "清空",
    "build.items": "件",
    "build.compare": "规格对比",
    "build.compareNeed": "规格对比 (≥2)",
    "cmp.brand": "品牌",
    "cmp.system": "系统",
    "cmp.spec": "规格",
    "cmp.fit": "适配",
    "cmp.price": "参考价",
    // 页脚
    "footer.products": "产品线",
    "footer.support": "支持",
    // 页面标题与副标题
    "page.bikes.title": "SANDO 山地车",
    "page.bikes.sub": "从入门硬尾到竞赛级全避震，阶梯式进阶。每一辆都附「零件护照」，公开全部零件的品牌、规格与山度加价率。",
    "page.parts.title": "自行车配件",
    "page.parts.sub": "从车架前叉到变速刹车，全系国产顶级配套，零件护照可追溯。",
    "page.passport.title": "零件护照",
    "page.passport.sub": "每一辆 SANDO 整车都公开完整 BOM：零件规格、品牌、工艺、产地与采购成本——拒绝虚高溢价。",
    "page.outdoor.sub": "terrain-x 户外产品线，下设 户外徒步 与 露营装备 两大系列——一条产品线，从山脚到营地。",
    "page.hiking.title": "户外徒步",
    "page.hiking.sub": "鞋、包、杖、冲锋衣与 EDC 工具，亚洲脚型与负重系统优化——6 大核心单品，覆盖重装与轻徒步两种节奏。",
    "page.camping.title": "露营装备",
    "page.camping.sub": "帐篷、睡袋、焚火台与营地照明——6 大核心单品，3-4 人小队一晚无忧，从山野到营地的完整方案。",
    "page.dealers.title": "经销网络",
    "page.support.title": "帮助与支持",
    "page.support.sub": "使用手册、零件护照、常见问题与联系方式——购车之后，服务才刚开始。",
    "page.about.title": "关于 SANDO × terrain-x",
    "page.about.sub": "我们不做品牌溢价，只做透明的专业度。一个品牌矩阵，从山脚到营地。",
    // bikes 页
    "bikes.geometryTitle": "山度几何™ · 亚洲体型专属",
    "bikes.geometrySub": "基于亚洲男性 165-185cm 体型数据优化：更短的 Reach、更高的 Stack、更稳的头管角度。",
    "bikes.sizesTitle": "尺码 × 零件号",
    "bikes.passportBtn": "零件护照 →",
    "bikes.partsBtn": "配套零配件",
    // parts 页
    "parts.allGroups": "全部系统",
    "parts.countNote": "件零配件 · 点击卡片查看详情，「+ 选配清单」加入你的配置单",
    "parts.filterModel": "适配",
    "parts.clearFilter": "清除",
    // passport 页
    "passport.size": "尺码：",
    "passport.height": "身高",
    "passport.inseam": "内缝",
    "passport.frameNo": "车架号",
    "passport.bikePrice": "整车售价",
    "passport.bomTotal": "BOM 零件成本合计",
    "passport.bomNote": "项 · 不含组装/涂装/质保/渠道",
    "passport.costDisclaimer": "* 成本为 BOM 采购参考价（中位数），不含车架涂装、组装人工、检测质保、包装物流与渠道服务。点击任意行查看零件详情，可加入选配清单。",
    "passport.colNo": "#",
    "passport.colPart": "零件",
    "passport.colSpec": "规格",
    "passport.colBrand": "品牌",
    "passport.colCraft": "工艺",
    "passport.colSupplier": "产地/供应商",
    "passport.colCost": "采购成本",
    // outdoor
    "outdoor.hikingSeries": "徒步装备系列",
    "outdoor.campingSeries": "营地方案系列",
    "outdoor.hikingSub": "覆盖重装与轻徒步两种节奏",
    "outdoor.campingSub": "3-4 人小队一晚无忧",
    "outdoor.all": "全部 →",
    "outdoor.items": "件单品",
    // dealers
    "dealers.search": "搜索城市…",
    "dealers.note": "* 各城市门店地址陆续确认中，标注「地址待补充」的城市可先通过总部预约服务。",
    // support
    "support.faq": "常见问题",
    "support.email": "服务邮箱",
    "support.website": "官方网站",
    "support.phone": "总部电话",
    "support.manual": "使用手册",
    "support.manualDesc": "出发前检查、安全骑行、保养周期与扭矩规格，在线阅读或下载 PDF。",
    "support.passport": "零件护照",
    "support.passportDesc": "查询整车 BOM：每颗零件的规格、品牌、工艺与采购成本，全透明。",
    "support.dealers": "经销网络",
    "support.dealersDesc": "试驾、首检、保养预约，查找你所在城市的服务点。",
    // manual
    "manual.download": "⬇ 下载 PDF",
    "manual.fallback": "无法在线预览？",
    "manual.downloadLink": "点击下载 PDF",
    "manual.offline": "离线阅读。",
    // 首页
    "home.ctaBikes": "探索 SANDO 车型 →",
    "home.ctaOutdoor": "进入 terrain-x 户外",
    "home.stat1": "产品线 PRODUCT LINES",
    "home.stat2": "SANDO 车型 X1/T1/F1",
    "home.stat3": "零件护照透明",
    "home.manualTitle": "自行车使用手册",
    "home.manualChip": "PDF · 中文 · 在线阅读 →",
    "home.linesTitle": "三条产品线，一套专业标准",
    "home.linesSub": "从竞赛级山地车到全场景户外装备，共享同一套供应链透明与品控哲学。",
    "home.line1Title": "自行车整车",
    "home.line1Desc": "X1 入门硬尾 / T1 进阶硬尾 / F1 全避震，透明 BOM 阶梯进阶。",
    "home.line1M1": "车型",
    "home.line1M2": "几何",
    "home.line1M3": "品牌",
    "home.line2Title": "自行车配件",
    "home.line2Desc": "从车架前叉到变速刹车，全系国产顶级配套，零件护照可追溯。",
    "home.line2M1": "零配件",
    "home.line2M2": "系统",
    "home.line2M3": "品牌",
    "home.line3Title": "户外",
    "home.line3Desc": "下设户外徒步与露营装备两大系列，从山脚到营地一套装备。",
    "home.line3M1": "系列",
    "home.line3M2": "单品",
    "home.line3M3": "品牌",
    "home.line3M1V": "徒步 / 露营",
    "home.enter": "进入 →",
    "home.bikesTitle": "三款车型，阶梯式进阶",
    "home.bikesSub": "入门到竞赛，同一套「透明 BOM + 国产顶级 + 可升级」逻辑。",
    "home.diffTitle": "六大差异化壁垒",
    "home.diffSub": "我们不做品牌溢价，只做透明的专业度。",
    "home.outdoorTitle": "从山脚到营地",
    "home.cardH1Label": "户外徒步系列",
    "home.cardH1Sub": "鞋 / 包 / 杖 / 冲锋衣 / EDC",
    "home.cardH4Label": "硬壳防护",
    "home.cardH4Sub": "20K 防水透气",
    "home.cardC1Label": "露营装备系列",
    "home.cardC1Sub": "帐篷 / 睡袋 / 焚火台 / 营地照明",
    "home.cardC4Label": "营地照明",
    "home.cardC4Sub": "1000 流明无极调光",
    // 关于页
    "about.sandoTitle": "以透明重塑山地车",
    "about.sandoBody": "每辆 SANDO 整车都附「零件护照」：公开全部零件的品牌、型号与山度加价率。全系采用蓝图 T 系列变速、KMC 链条、日晖飞轮、久裕轮组——国产 ≠ 低端。基础整车 + 模块化升级包（轮组 / 变速 / 刹车），标准化 Boost 148/110 与 BSA 接口，随骑行水平一起成长。",
    "about.sandoBtn": "查看车型 →",
    "about.terraTitle": "全场景户外装备",
    "about.terraBody": "terrain-x 下设户外徒步与露营装备两大系列：鞋、包、杖、冲锋衣与 EDC 工具，帐篷、睡袋、焚火台与营地照明。与 SANDO 共享同一套供应链透明与品控哲学——从山脚到营地，一套装备。",
    "about.terraBtn": "进入户外 →",
    "about.diffTitle": "六大差异化壁垒",
    "about.wallTitle": "国产顶级配套品牌",
    "about.wallSub": "全车零件品牌全公开——这就是「零件护照」的底气。",
    "about.geoTitle": "山度几何™ · 技术资产",
    "about.geoSub": "基于亚洲男性 165-185cm 体型数据优化的 Asian Fit 几何，持续迭代形成技术资产。",
    "about.communityTitle": "社区共创",
    // 抽屉分组名
    "drawer.hiking": "户外徒步",
    "drawer.camping": "露营装备",
    "group.frame": "车架 / 前叉",
    "group.drivetrain": "变速 / 传动",
    "group.brake": "刹车系统",
    "group.wheel": "轮组 / 轮胎",
    "group.cockpit": "把组 / 座管",
    "group.contact": "脚踏 / 碗组 / 中轴",
    "group.acc": "升级包 / 配件",
    // 页脚
    "footer.slogan": "山有度，行无疆。SANDO 山地车与 terrain-x 户外装备，共享同一套供应链透明与品控哲学——专业而诚实。",
    "footer.hqName": "SANDO × terrain-x 深圳总部",
    "footer.hqAddr": "深圳市龙华区龙华路粮食大院1栋",
    "footer.passport": "零件护照",
    "footer.manual": "使用手册",
    "footer.tagline": "SANDO × terrain-x · 透明 BOM · 国产顶级配套",
  },
  en: {
    "nav.home": "Home",
    "nav.bikes": "Bikes",
    "nav.parts": "Components",
    "nav.outdoor": "Outdoor",
    "nav.hiking": "Hiking",
    "nav.camping": "Camping",
    "nav.dealers": "Dealers",
    "nav.support": "Support",
    "nav.about": "About",
    "nav.admin": "Admin",
    "common.from": "from",
    "common.fit": "Fit",
    "common.learnMore": "Learn more",
    "common.viewAll": "View all",
    "common.addToBuild": "+ Build list",
    "common.inBuild": "✓ Added",
    "common.priceAsk": "Ask price",
    "common.close": "Close",
    "d.features": "Features",
    "d.specs": "Specs",
    "d.intro": "About",
    "d.note": "Note",
    "build.title": "Build List",
    "build.empty": "Nothing here yet — pick some components.",
    "build.export": "Export JSON",
    "build.clear": "Clear",
    "build.items": "items",
    "build.compare": "Compare",
    "build.compareNeed": "Compare (≥2)",
    "cmp.brand": "Brand",
    "cmp.system": "System",
    "cmp.spec": "Spec",
    "cmp.fit": "Fit",
    "cmp.price": "Price",
    "footer.products": "Product Lines",
    "footer.support": "Support",
    "page.bikes.title": "SANDO Mountain Bikes",
    "page.bikes.sub": "From entry hardtail to race-grade full suspension — a clear progression. Every bike ships with a Parts Passport disclosing each part's brand, spec and SANDO's markup.",
    "page.parts.title": "Bike Components",
    "page.parts.sub": "From frames and forks to drivetrain and brakes — full Chinese top-tier spec, traceable via the Parts Passport.",
    "page.passport.title": "Parts Passport",
    "page.passport.sub": "Every SANDO bike discloses its full BOM: part specs, brands, craftsmanship, origin and purchase cost — no inflated premium.",
    "page.outdoor.sub": "The terrain-x outdoor line covers two series — hiking and camping. One line, from trailhead to campsite.",
    "page.hiking.title": "Hiking",
    "page.hiking.sub": "Shoes, packs, poles, shells and EDC — tuned for Asian fit and carry systems. 6 core items for heavy or light hiking.",
    "page.camping.title": "Camping",
    "page.camping.sub": "Tents, sleeping bags, fire pits and camp lighting — 6 core items, a full setup for a 3-4 person crew, from trailhead to campsite.",
    "page.dealers.title": "Dealer Network",
    "page.support.title": "Support",
    "page.support.sub": "Owner's manual, parts passport, FAQ and contact — service begins after the purchase.",
    "page.about.title": "About SANDO × terrain-x",
    "page.about.sub": "No brand premium — only transparent professionalism. One brand matrix, from trailhead to campsite.",
    "bikes.geometryTitle": "SANDO Geometry™ · Asian Fit",
    "bikes.geometrySub": "Optimized for Asian riders 165-185cm: shorter Reach, higher Stack, more stable head angle.",
    "bikes.sizesTitle": "Size × Part No.",
    "bikes.passportBtn": "Parts Passport →",
    "bikes.partsBtn": "Components",
    "parts.allGroups": "All systems",
    "parts.countNote": "components · click a card for details, add to your build list",
    "parts.filterModel": "Fit",
    "parts.clearFilter": "Clear",
    "passport.size": "Size:",
    "passport.height": "Height",
    "passport.inseam": "Inseam",
    "passport.frameNo": "Frame SKU",
    "passport.bikePrice": "Bike price",
    "passport.bomTotal": "BOM cost total",
    "passport.bomNote": "items · excl. assembly/coating/warranty/channel",
    "passport.costDisclaimer": "* Costs are BOM purchase references (midpoints), excluding frame coating, assembly, QC/warranty, packaging, logistics and channel service. Click any row for details and to add it to your build list.",
    "passport.colNo": "#",
    "passport.colPart": "Part",
    "passport.colSpec": "Spec",
    "passport.colBrand": "Brand",
    "passport.colCraft": "Craft",
    "passport.colSupplier": "Origin/Supplier",
    "passport.colCost": "Cost",
    "outdoor.hikingSeries": "Hiking Series",
    "outdoor.campingSeries": "Camping Series",
    "outdoor.hikingSub": "For heavy and light hiking",
    "outdoor.campingSub": "One worry-free night for a 3-4 person crew",
    "outdoor.all": "View all →",
    "outdoor.items": "items",
    "dealers.search": "Search city…",
    "dealers.note": "* Store addresses are being confirmed. For cities marked \"TBD\", book service via headquarters.",
    "support.faq": "FAQ",
    "support.email": "Service email",
    "support.website": "Website",
    "support.phone": "HQ phone",
    "support.manual": "Owner's Manual",
    "support.manualDesc": "Pre-ride checks, safe riding, maintenance intervals and torque specs — read online or download the PDF.",
    "support.passport": "Parts Passport",
    "support.passportDesc": "Look up the full BOM: every part's spec, brand, craft and purchase cost, fully transparent.",
    "support.dealers": "Dealer Network",
    "support.dealersDesc": "Test rides, first check, maintenance booking — find a service point near you.",
    "manual.download": "⬇ Download PDF",
    "manual.fallback": "Can't preview?",
    "manual.downloadLink": "Download the PDF",
    "manual.offline": "to read offline.",
    "home.ctaBikes": "Explore SANDO bikes →",
    "home.ctaOutdoor": "Enter terrain-x outdoor",
    "home.stat1": "PRODUCT LINES",
    "home.stat2": "SANDO BIKES X1/T1/F1",
    "home.stat3": "PARTS PASSPORT TRANSPARENT",
    "home.manualTitle": "Owner's Manual",
    "home.manualChip": "PDF · CN · Read online →",
    "home.linesTitle": "Three product lines, one professional standard",
    "home.linesSub": "From race-grade mountain bikes to full-scene outdoor gear — one shared philosophy of supply-chain transparency and quality control.",
    "home.line1Title": "Complete Bikes",
    "home.line1Desc": "X1 entry hardtail / T1 trail hardtail / F1 full suspension — transparent BOM progression.",
    "home.line1M1": "Bikes",
    "home.line1M2": "Geometry",
    "home.line1M3": "Brand",
    "home.line2Title": "Bike Components",
    "home.line2Desc": "From frames and forks to drivetrain and brakes — full Chinese top-tier spec, traceable via Parts Passport.",
    "home.line2M1": "Components",
    "home.line2M2": "Systems",
    "home.line2M3": "Brand",
    "home.line3Title": "Outdoor",
    "home.line3Desc": "Two series — hiking and camping. One kit from trailhead to campsite.",
    "home.line3M1": "Series",
    "home.line3M2": "Items",
    "home.line3M3": "Brand",
    "home.line3M1V": "Hiking / Camping",
    "home.enter": "Enter →",
    "home.bikesTitle": "Three bikes, a clear progression",
    "home.bikesSub": "Entry to race — one logic: transparent BOM + Chinese top-tier + upgradeable.",
    "home.diffTitle": "Six differentiators",
    "home.diffSub": "No brand premium — only transparent professionalism.",
    "home.outdoorTitle": "From trailhead to campsite",
    "home.cardH1Label": "Hiking Series",
    "home.cardH1Sub": "Shoes / Packs / Poles / Shells / EDC",
    "home.cardH4Label": "Hardshell",
    "home.cardH4Sub": "20K waterproof & breathable",
    "home.cardC1Label": "Camping Series",
    "home.cardC1Sub": "Tents / Sleeping bags / Fire pits / Lighting",
    "home.cardC4Label": "Camp Lighting",
    "home.cardC4Sub": "1000lm stepless dimming",
    "about.sandoTitle": "Rebuilding MTB with transparency",
    "about.sandoBody": "Every SANDO bike ships with a Parts Passport disclosing each part's brand, model and SANDO's markup. Full L-TWOO T-series drivetrain, KMC chains, SUNSHINE cassettes, NOVATEC wheelsets — Chinese-made ≠ low-end. Base bike + modular upgrade packs (wheels / drivetrain / brakes), standard Boost 148/110 and BSA interfaces that grow with your riding.",
    "about.sandoBtn": "View bikes →",
    "about.terraTitle": "Full-scene outdoor gear",
    "about.terraBody": "terrain-x covers two series — hiking (shoes, packs, poles, shells, EDC) and camping (tents, sleeping bags, fire pits, lighting) — sharing SANDO's philosophy of supply-chain transparency and quality control. One kit, from trailhead to campsite.",
    "about.terraBtn": "Enter outdoor →",
    "about.diffTitle": "Six differentiators",
    "about.wallTitle": "Chinese top-tier partners",
    "about.wallSub": "Every part brand disclosed — that's the confidence behind the Parts Passport.",
    "about.geoTitle": "SANDO Geometry™ · Technical asset",
    "about.geoSub": "Asian Fit geometry optimized from 165-185cm Asian male body data — a continuously iterated technical asset.",
    "about.communityTitle": "Community co-creation",
    "drawer.hiking": "Hiking",
    "drawer.camping": "Camping",
    "group.frame": "Frame & Fork",
    "group.drivetrain": "Drivetrain",
    "group.brake": "Brake",
    "group.wheel": "Wheel & Tire",
    "group.cockpit": "Cockpit",
    "group.contact": "Contact Points",
    "group.acc": "Upgrade & ACC",
    "footer.slogan": "Mountains measured, journeys boundless. SANDO bikes and terrain-x outdoor gear share one philosophy of supply-chain transparency and quality control — professional and honest.",
    "footer.hqName": "SANDO × terrain-x Shenzhen HQ",
    "footer.hqAddr": "Building 1, Liangshi Dayuan, Longhua Rd, Longhua Dist., Shenzhen",
    "footer.passport": "Parts Passport",
    "footer.manual": "Owner's Manual",
    "footer.tagline": "SANDO × terrain-x · Transparent BOM · Chinese top-tier spec",
  },
} as const;

type UIKey = keyof (typeof UI)["cn"];

/** 规格键名翻译（对应旧站 SandoT.specKey） */
const SPEC_KEY_EN: Record<string, string> = {
  "车架": "Frame",
  "前叉": "Fork",
  "变速": "Drivetrain",
  "刹车": "Brakes",
  "轮组": "Wheelset",
  "整备": "Weight",
  "升降座管": "Dropper",
  "轮胎": "Tires",
  "把组": "Cockpit",
  "坐垫": "Saddle",
  "脚踏": "Pedals",
};

interface I18nCtx {
  lang: Lang;
  toggle: () => void;
  t: (key: UIKey) => string;
  /** 规格键名本地化：specKey("车架") → "Frame"（en 时） */
  specKey: (k: string) => string;
  /** 取对象的本地化字段：pick(bike, "name") → en.name ?? name */
  pick: (obj: any, field: string) => string;
  /** 取对象的本地化数组字段 */
  pickArr: (obj: any, field: string) => string[];
  /** 取规格数组的本地化版本（en.specs 若存在则用） */
  pickSpecs: (obj: any) => { k: string; v: string }[];
}

const Ctx = createContext<I18nCtx | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("cn");

  useEffect(() => {
    const url = new URLSearchParams(window.location.search).get("lang");
    const saved = window.localStorage.getItem("sando_lang");
    const initial: Lang = url === "en" || url === "cn" ? url : saved === "en" ? "en" : "cn";
    setLang(initial);
    document.documentElement.lang = initial === "cn" ? "zh-CN" : "en";
  }, []);

  const toggle = () => {
    setLang((prev) => {
      const next: Lang = prev === "cn" ? "en" : "cn";
      window.localStorage.setItem("sando_lang", next);
      document.documentElement.lang = next === "cn" ? "zh-CN" : "en";
      return next;
    });
  };

  const t = (key: UIKey) => UI[lang][key] ?? UI.cn[key] ?? key;

  const specKey = (k: string) => (lang === "en" ? SPEC_KEY_EN[k] ?? k : k);

  const pick = (obj: any, field: string) => {
    if (lang === "en" && obj?.en?.[field]) return obj.en[field];
    return obj?.[field] ?? "";
  };

  const pickArr = (obj: any, field: string): string[] => {
    if (lang === "en" && Array.isArray(obj?.en?.[field])) return obj.en[field];
    return Array.isArray(obj?.[field]) ? obj[field] : [];
  };

  const pickSpecs = (obj: any): { k: string; v: string }[] => {
    if (lang === "en" && Array.isArray(obj?.en?.specs)) return obj.en.specs;
    return Array.isArray(obj?.specs) ? obj.specs : [];
  };

  return (
    <Ctx.Provider value={{ lang, toggle, t, specKey, pick, pickArr, pickSpecs }}>
      {children}
    </Ctx.Provider>
  );
}

export function useI18n(): I18nCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
