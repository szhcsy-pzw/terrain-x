import { SiteSettings } from "./types";

// 站点默认设置（迁移自旧站 index.html / dealers.html / sections）
export const defaultSiteSettings: SiteSettings = {
  logoUrl: "assets/logo/combo.svg",
  heroBg: "assets/hero/home.svg",
  heroTitle1: "山有度",
  heroTitle2: "行无疆",
  heroSubtitle:
    "SANDO 以国产一线配套与供应链透明重塑山地车，terrain-x 以全场景装备覆盖徒步与露营。一个品牌矩阵，从山脚到营地，专业而诚实。",
  differentiators: [
    { title: "供应链透明", desc: "每辆车附「零件护照」，公开全部零件的品牌、型号与山度加价率。" },
    { title: "国产一线配套", desc: "全系蓝图 1×12 + KMC + 久裕 + 正新/玛吉斯，国产 ≠ 低端。" },
    { title: "模块化升级", desc: "基础整车 + 轮组/变速/刹车升级包，标准化 Boost 148/110、BSA 接口。" },
    { title: "山度几何™", desc: "基于亚洲体型优化的 Asian Fit 几何，持续迭代形成技术资产。" },
    { title: "社区共创", desc: "车型配置社区投票 + 专业调校，每款车发布「配置征询帖」。" },
    { title: "terrain-x 全场景", desc: "徒步 + 露营双线打通，从山脚到营地一套装备。" },
  ],
  communityNote: "每款车型的配置由社区投票决定。扫码进群，参与下一款 SANDO 的配置征询。",
  manualNote:
    "每一辆 SANDO 整车都配有完整使用手册：出发前检查、安全骑行、尺寸适配、部件技术、保养周期与扭矩规格、尺码对照与车架零件号。",
  storeUrl: "https://terrainx.taobao.com",
  hq: {
    name: "SANDO × terrain-x 深圳总部",
    phone: "18938665477",
    email: "SZHCSY@GMAIL.COM",
    addr: "深圳市龙华区龙华路粮食大院1栋",
  },
};

export const geometryPoints = [
  { title: "Reach 前伸量", value: "标准 / 略短", desc: "亚洲人躯干相对较短，过长的 Reach 易致腰背酸痛，故做缩短优化。" },
  { title: "Stack 堆叠高", value: "偏高 +10-15mm", desc: "亚洲骑行者坐姿更直立，舒适优先。" },
  { title: "头管角度", value: "66.5° - 68°", desc: "稳定优先，适合技术不熟练用户。" },
  { title: "五通下沉量", value: "适中", desc: "降低重心但不牺牲通过性。" },
  { title: "后下叉长度", value: "标准", desc: "灵活但不敏感，兼顾爬坡与下坡。" },
  { title: "Flip Chip", value: "T1 / F1 标配", desc: "几何微调芯片，6 档可调适应不同路况。" },
];

export const faqs = [
  { q: "如何选尺码？", a: "按身高与内缝对照「尺码 × 零件号」表选择；介于两个尺码之间时，灵活优先选小码、稳定优先选大码。" },
  { q: "新车需要首检吗？", a: "建议骑行 100km 或一个月内回店首检：复紧螺丝、检查变速刹车手感、轮组张力。" },
  { q: "碟刹需要磨合吗？", a: "需要。前 20 次制动用中等力度渐进刹车，让来令片与碟片表面贴合，避免急刹锁死。" },
  { q: "保养周期怎么安排？", a: "链条每 200-300km 清洁上油；前叉每 50 小时下管保养、100 小时全保养；整车每年大保养一次。" },
  { q: "F1 的避震行程是多少？", a: "前 150mm（Durolux 36 Air）/ 后 130mm（四转点平台），Flip Chip 可微调几何。" },
  { q: "可以改装第三方零件吗？", a: "可以。全系标准化接口：Boost 148/110 开档、BSA 螺纹中轴、锥管碗组，改装不影响车架质保（改装件本身除外）。" },
];

export const faqsEn = [
  { q: "How do I choose a size?", a: "Match your height and inseam against the Size × Part No. chart. Between two sizes: go smaller for agility, larger for stability." },
  { q: "Does a new bike need a first check?", a: "Yes — bring it back after 100km or one month: re-torque bolts, check shifting/braking feel and wheel tension." },
  { q: "Do disc brakes need bedding in?", a: "Yes. For the first 20 stops, brake progressively with medium force so pads and rotors mate properly — avoid hard lock-ups." },
  { q: "What is the maintenance schedule?", a: "Clean and lube the chain every 200-300km; lower-leg fork service every 50 hours, full service every 100 hours; full bike overhaul once a year." },
  { q: "What is the F1's suspension travel?", a: "150mm front (Durolux 36 Air) / 130mm rear (four-bar platform); Flip Chip allows geometry fine-tuning." },
  { q: "Can I install third-party parts?", a: "Yes. Fully standard interfaces: Boost 148/110 spacing, BSA threaded BB, tapered headset. Aftermarket parts don't void the frame warranty (the parts themselves excluded)." },
];

/** 英文模式的站点文案 fallback（后台设置数据只有中文时兜底） */
export const settingsEnFallback = {
  heroTitle1: "Ride Far,",
  heroTitle2: "Ride True",
  heroSubtitle:
    "SANDO rebuilds the mountain bike with Chinese top-tier spec and supply-chain transparency; terrain-x covers hiking and camping gear for every scenario. One brand matrix, from trailhead to campsite — professional and honest.",
  manualNote:
    "Every SANDO bike ships with a complete owner's manual: pre-ride checks, safe riding, size fit, component tech, maintenance intervals & torque specs, sizing and frame part numbers.",
  communityNote:
    "Every bike's spec is voted by the community. Scan the QR code to join the group and vote on the next SANDO build.",
  differentiators: [
    { title: "Supply-chain transparency", desc: "Every bike ships with a Parts Passport disclosing each part's brand, model and SANDO's markup." },
    { title: "Chinese top-tier spec", desc: "Full L-TWOO T-series + KMC + SUNSHINE + NOVATEC — Chinese-made ≠ low-end." },
    { title: "Modular upgrades", desc: "Base bike + wheel/drivetrain/brake upgrade packs, standard Boost 148/110 and BSA interfaces." },
    { title: "SANDO Geometry™", desc: "Asian Fit geometry optimized for Asian body data — a continuously iterated technical asset." },
    { title: "Community co-creation", desc: "Specs voted by the community + professional tuning — a consultation post for every new bike." },
    { title: "terrain-x full scene", desc: "Hiking + camping in one line — one kit from trailhead to campsite." },
  ],
};

export const geometryPointsEn = [
  { title: "Reach", value: "Standard / slightly shorter", desc: "Asian riders have relatively shorter torsos; an over-long Reach causes lower-back pain, so it's shortened." },
  { title: "Stack", value: "+10-15mm higher", desc: "Asian riders sit more upright — comfort first." },
  { title: "Head angle", value: "66.5° - 68°", desc: "Stability first, friendly for less experienced riders." },
  { title: "BB drop", value: "Moderate", desc: "Lower center of gravity without sacrificing clearance." },
  { title: "Chainstay", value: "Standard", desc: "Agile but not twitchy — balanced for climbing and descending." },
  { title: "Flip Chip", value: "Std on T1 / F1", desc: "Geometry tuning chip with 6 positions for different terrain." },
];
