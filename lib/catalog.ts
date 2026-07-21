// ============================================================
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
  en?: { part?: string; brand?: string; craft?: string; spec?: string; supplier?: string };
}
export interface Dealer { name: string; en: string; lng: number; lat: number; addr: string }

export const hidePartsPrices: boolean = true;
export const storeUrl: string = "https://terrainx.taobao.com";

export const bikes: Bike[] = [
  {
    "id": "x1",
    "code": "SANDO-X1",
    "level": "ENTRY HARDTAIL",
    "sizes": [
      {
        "code": "S",
        "h": "158-168cm",
        "inseam": "72-76cm",
        "frameSku": "SANDO-X1-FR-S",
        "crank": 170,
        "dropper": 0,
        "stem": 50,
        "bar": 740,
        "rotor": 160
      },
      {
        "code": "M",
        "h": "168-178cm",
        "inseam": "76-82cm",
        "frameSku": "SANDO-X1-FR-M",
        "crank": 170,
        "dropper": 0,
        "stem": 50,
        "bar": 740,
        "rotor": 180
      },
      {
        "code": "L",
        "h": "178-188cm",
        "inseam": "82-88cm",
        "frameSku": "SANDO-X1-FR-L",
        "crank": 175,
        "dropper": 0,
        "stem": 60,
        "bar": 760,
        "rotor": 180
      },
      {
        "code": "XL",
        "h": "186-196cm",
        "inseam": "88-94cm",
        "frameSku": "SANDO-X1-FR-XL",
        "crank": 175,
        "dropper": 0,
        "stem": 60,
        "bar": 760,
        "rotor": 203
      }
    ],
    "image": "assets/bikes/x1.svg",
    "name": "X1 硬尾XC",
    "sub": "入门级 · 29″ 铝合金硬尾",
    "price": "¥4,299",
    "priceNote": "起",
    "accent": "orange",
    "specs": [
      {
        "k": "车架",
        "v": "6061铝液压成型"
      },
      {
        "k": "前叉",
        "v": "SR SUNTOUR XCR 32 Air 120mm"
      },
      {
        "k": "变速",
        "v": "蓝图 T5 1×11"
      },
      {
        "k": "刹车",
        "v": "TEKTRO M275 油压"
      },
      {
        "k": "轮组",
        "v": "久裕 29×2.25"
      },
      {
        "k": "整备",
        "v": "≈13.5kg"
      }
    ],
    "intro": "X1 是山度的入门硬尾，把预算花在刀刃上：全车国产顶级配套，整车附「零件护照」，公开每颗零件的规格、品牌与山度加价率，拒绝虚高溢价。",
    "features": [
      "蓝图 T5 1×11 单盘系统，告别前拨，操作更简洁",
      "SR SUNTOUR XCR 32 气压前叉，120mm 行程应对林道",
      "山度几何™ S/M/L/XL 亚洲体型尺码，一上车就合身",
      "整车 BOM 透明，公开加价率，拒绝虚高溢价"
    ],
    "en": {
      "name": "X1 Hardtail XC",
      "sub": "Entry · 29″ alloy hardtail",
      "intro": "X1 is SANDO's entry hardtail — every yuan goes to the essentials: full Chinese top-tier spec, with a transparent \"Parts Passport\" that discloses each part's spec, brand and SANDO's markup rate — no inflated premium.",
      "specs": [
        {
          "k": "Frame",
          "v": "6061 alloy hydroformed"
        },
        {
          "k": "Fork",
          "v": "SR SUNTOUR XCR 32 Air 120mm"
        },
        {
          "k": "Drivetrain",
          "v": "L-TWOO T5 1×11"
        },
        {
          "k": "Brakes",
          "v": "TEKTRO M275 hydraulic"
        },
        {
          "k": "Wheelset",
          "v": "NOVATEC 29×2.25"
        },
        {
          "k": "Weight",
          "v": "≈13.5kg"
        }
      ],
      "features": [
        "L-TWOO T5 1×11 single-ring — no front derailleur, simpler shifting",
        "SR SUNTOUR XCR 32 air fork, 120mm travel for the trail",
        "SANDO Geometry™ S/M/L/XL Asian-fit sizing — fits from the first ride",
        "Fully transparent BOM — no inflated brand premium"
      ]
    }
  },
  {
    "id": "t1",
    "code": "SANDO-T1",
    "level": "TRAIL HARDTAIL",
    "sizes": [
      {
        "code": "S",
        "h": "158-168cm",
        "inseam": "72-76cm",
        "frameSku": "SANDO-T1-FR-S",
        "crank": 170,
        "dropper": 125,
        "stem": 45,
        "bar": 760,
        "rotor": 180
      },
      {
        "code": "M",
        "h": "168-178cm",
        "inseam": "76-82cm",
        "frameSku": "SANDO-T1-FR-M",
        "crank": 170,
        "dropper": 125,
        "stem": 50,
        "bar": 760,
        "rotor": 180
      },
      {
        "code": "L",
        "h": "178-188cm",
        "inseam": "82-88cm",
        "frameSku": "SANDO-T1-FR-L",
        "crank": 175,
        "dropper": 125,
        "stem": 55,
        "bar": 780,
        "rotor": 203
      },
      {
        "code": "XL",
        "h": "186-196cm",
        "inseam": "88-94cm",
        "frameSku": "SANDO-T1-FR-XL",
        "crank": 175,
        "dropper": 125,
        "stem": 60,
        "bar": 780,
        "rotor": 203
      }
    ],
    "image": "assets/bikes/t1.svg",
    "name": "T1 进阶硬尾",
    "sub": "进阶级 · 29″ 内走线 + Flip Chip",
    "price": "¥6,499",
    "priceNote": "起",
    "accent": "orange",
    "specs": [
      {
        "k": "车架",
        "v": "6066铝 内走线"
      },
      {
        "k": "前叉",
        "v": "SR SUNTOUR X1 34 Air 140mm"
      },
      {
        "k": "变速",
        "v": "蓝图 T7 1×12"
      },
      {
        "k": "刹车",
        "v": "TEKTRO M735 四活塞"
      },
      {
        "k": "升降座管",
        "v": "线控 125mm 标配"
      },
      {
        "k": "整备",
        "v": "≈13.0kg"
      }
    ],
    "intro": "T1 在 X1 之上补齐进阶玩家要的：内走线车架、Flip Chip 几何微调、线控升降座管，下坡更自由。",
    "features": [
      "6066 铝合金内走线车架，外观更干净、防护更好",
      "Flip Chip 几何芯片，6 档微调适应爬坡/下坡",
      "蓝图 T7 1×12 十二速，齿比更绵密",
      "线控升降座管 125mm 标配，站姿冲坡更稳"
    ],
    "en": {
      "name": "T1 Trail Hardtail",
      "sub": "Trail · 29″ internal routing + Flip Chip",
      "intro": "T1 adds what trail riders want over X1: internally routed frame, Flip Chip geometry tuning, and a dropper post for more freedom on descents.",
      "specs": [
        {
          "k": "Frame",
          "v": "6066 alloy internal routing"
        },
        {
          "k": "Fork",
          "v": "SR SUNTOUR X1 34 Air 140mm"
        },
        {
          "k": "Drivetrain",
          "v": "L-TWOO T7 1×12"
        },
        {
          "k": "Brakes",
          "v": "TEKTRO M735 4-piston"
        },
        {
          "k": "Dropper",
          "v": "125mm cable dropper std"
        },
        {
          "k": "Weight",
          "v": "≈13.0kg"
        }
      ],
      "features": [
        "6066 alloy frame with internal cable routing — cleaner look, better protection",
        "Flip Chip geometry chip — 6-step tuning for climb/descent",
        "L-TWOO T7 1×12 twelve-speed — tighter gear spacing",
        "125mm cable-controlled dropper post standard — steadier standing climbs"
      ]
    }
  },
  {
    "id": "f1",
    "code": "SANDO-F1",
    "level": "FULL SUSPENSION",
    "sizes": [
      {
        "code": "S",
        "h": "160-170cm",
        "inseam": "74-78cm",
        "frameSku": "SANDO-F1-FR-S",
        "crank": 170,
        "dropper": 150,
        "stem": 40,
        "bar": 780,
        "rotor": 200
      },
      {
        "code": "M",
        "h": "170-180cm",
        "inseam": "78-83cm",
        "frameSku": "SANDO-F1-FR-M",
        "crank": 170,
        "dropper": 150,
        "stem": 45,
        "bar": 780,
        "rotor": 200
      },
      {
        "code": "L",
        "h": "180-190cm",
        "inseam": "83-89cm",
        "frameSku": "SANDO-F1-FR-L",
        "crank": 175,
        "dropper": 150,
        "stem": 50,
        "bar": 800,
        "rotor": 220
      },
      {
        "code": "XL",
        "h": "188-198cm",
        "inseam": "89-95cm",
        "frameSku": "SANDO-F1-FR-XL",
        "crank": 175,
        "dropper": 150,
        "stem": 50,
        "bar": 800,
        "rotor": 220
      }
    ],
    "image": "assets/bikes/f1.svg",
    "name": "F1 全避震",
    "sub": "竞赛级 · 29″ 140/130mm 全避震",
    "price": "¥12,999",
    "priceNote": "起",
    "accent": "orange",
    "specs": [
      {
        "k": "车架",
        "v": "铝 四转点 全避震（平台待定）"
      },
      {
        "k": "前叉",
        "v": "SR SUNTOUR Durolux 36 Air 150mm"
      },
      {
        "k": "变速",
        "v": "蓝图 T9 1×12 碳导板"
      },
      {
        "k": "刹车",
        "v": "TEKTRO Orion 四活塞"
      },
      {
        "k": "升降座管",
        "v": "线控 150mm 标配"
      },
      {
        "k": "整备",
        "v": "≈14kg"
      }
    ],
    "intro": "F1 是山度的竞赛级全避震，硬核通过性与轻量并举；悬挂采用公有四转点平台，暂缓自研与碳纤维版本。",
    "features": [
      "140/130mm 四转点全避震，竞赛级几何",
      "Durolux 36 气压前叉 + 后胆，硬核路况也稳",
      "蓝图 T9 碳导板 1×12，轻量且变速精准",
      "TEKTRO Orion 四活塞刹车，长下坡不掉链子"
    ],
    "en": {
      "name": "F1 Full Suspension",
      "sub": "Race · 29″ 140/130mm full suspension",
      "intro": "F1 is SANDO's race-grade full suspension — hardcore capability with low weight; uses a public four-bar suspension platform, with in-house development and the carbon version deferred.",
      "specs": [
        {
          "k": "Frame",
          "v": "Alloy four-bar full suspension (platform TBD)"
        },
        {
          "k": "Fork",
          "v": "SR SUNTOUR Durolux 36 Air 150mm"
        },
        {
          "k": "Drivetrain",
          "v": "L-TWOO T9 1×12 carbon guide"
        },
        {
          "k": "Brakes",
          "v": "TEKTRO Orion 4-piston"
        },
        {
          "k": "Dropper",
          "v": "150mm cable dropper std"
        },
        {
          "k": "Weight",
          "v": "≈14kg"
        }
      ],
      "features": [
        "140/130mm four-bar full suspension, race geometry",
        "Durolux 36 air fork + rear shock — stable on hardcore terrain",
        "L-TWOO T9 carbon-guide 1×12 — light and precise",
        "TEKTRO Orion four-piston brakes — no fade on long descents"
      ]
    }
  }
];

export const hiking: OutdoorItem[] = [
  {
    "id": "h1",
    "name": "Summit Trail 徒步鞋",
    "icon": "🥾",
    "price": "¥899",
    "image": "assets/outdoor/h1.svg",
    "tag": "防水 · 中帮",
    "desc": "GORE-TEX 防水膜 + Vibram 大底，亚洲脚型楦头，重装山路稳定支撑。",
    "fit": "M/L/XL",
    "intro": "重装山路的主力鞋，亚洲脚型楦头宽窄适中，长时间行走不挤脚。",
    "features": [
      "GORE-TEX 防水透气膜，雨天不湿脚",
      "Vibram 大底，湿滑岩石抓地稳",
      "中帮包裹，崴脚风险更低",
      "EVA 中底缓震，长途不累"
    ],
    "en": {
      "name": "Summit Trail Hiking Shoe",
      "tag": "Waterproof · Mid",
      "desc": "GORE-TEX membrane + Vibram outsole, Asian-last upper, stable support for heavy trails.",
      "intro": "The workhorse for loaded mountain trails, with an Asian-last upper that's neither too narrow nor wide — no pinching on long hikes.",
      "features": [
        "GORE-TEX waterproof-breathable membrane — dry feet in rain",
        "Vibram outsole — grip on wet rock",
        "Mid-cut wrap — lower ankle-sprain risk",
        "EVA midsole cushioning — less fatigue"
      ]
    }
  },
  {
    "id": "h2",
    "name": "Ridge 30 登山背包",
    "icon": "🎒",
    "price": "¥699",
    "image": "assets/outdoor/h2.svg",
    "tag": "30L · 轻量",
    "desc": "航空铝架板负重系统，可拆卸顶包，防雨罩一体收纳。",
    "fit": "28L/30L/35L",
    "intro": "一日重装或轻量过夜的黄金容量，架板把重量从肩膀转移到胯部。",
    "features": [
      "航空铝架板负重系统，护腰不伤背",
      "可拆卸顶包，扩容更灵活",
      "一体防雨罩，说下就下",
      "透气背板，背心不闷"
    ],
    "en": {
      "name": "Ridge 30 Hiking Pack",
      "tag": "30L · Lightweight",
      "desc": "Aircraft-aluminium frame load system, removable top lid, integrated rain cover.",
      "intro": "The sweet-spot capacity for a day hike or light overnighter; the frame shifts weight from shoulders to hips.",
      "features": [
        "Aircraft-aluminium frame load system — protects back",
        "Removable top lid — flexible expansion",
        "Integrated rain cover — ready for sudden rain",
        "Ventilated back panel — no sweaty back"
      ]
    }
  },
  {
    "id": "h3",
    "name": "Pathfinder trekking 手杖",
    "icon": "🦯",
    "price": "¥329",
    "image": "assets/outdoor/h3.svg",
    "tag": "碳纤维",
    "desc": "3K 碳纤维三节杖，EVA  ergonomic 握把，雪篮/泥篮双配件。",
    "fit": "100-135cm",
    "intro": "上坡借力、下坡护膝的轻量三节杖，碳纤本体几乎无感。",
    "features": [
      "3K 碳纤维本体，轻到忘记存在",
      "EVA ergonomic 握把，久握不滑",
      "三节外锁，调节快",
      "雪篮/泥篮双配件，四季通用"
    ],
    "en": {
      "name": "Pathfinder Trekking Pole",
      "tag": "Carbon",
      "desc": "3K carbon 3-section pole, EVA ergonomic grip, snow/mud baskets included.",
      "intro": "A lightweight 3-section pole that lends power uphill and protects knees downhill — the carbon body is barely noticeable.",
      "features": [
        "3K carbon shaft — light enough to forget",
        "EVA ergonomic grip — no slip on long holds",
        "3-section external lock — quick adjust",
        "Snow/mud baskets included — all-season"
      ]
    }
  },
  {
    "id": "h4",
    "name": "Horizon 冲锋衣",
    "icon": "🧥",
    "price": "¥1,099",
    "image": "assets/outdoor/h4.svg",
    "tag": "三层压胶",
    "desc": "20K 防水透气，全压胶接缝，腋下透气拉链，可收纳进自身口袋。",
    "fit": "S/M/L/XL",
    "intro": "山地多变气候的硬壳防线，收纳进自身口袋，随取随穿。",
    "features": [
      "20K 防水透气膜",
      "全压胶接缝，杜绝渗水",
      "腋下透气拉链，运动不闷",
      "可收纳进自身口袋"
    ],
    "en": {
      "name": "Horizon Hardshell Jacket",
      "tag": "3-layer taped",
      "desc": "20K waterproof-breathable, fully taped seams, pit zips, packs into its own pocket.",
      "intro": "The hardshell line against fickle mountain weather — packs into its own pocket, grab and wear anytime.",
      "features": [
        "20K waterproof-breathable membrane",
        "Fully taped seams — no seepage",
        "Pit zips — no stuffiness when moving",
        "Packs into its own pocket"
      ]
    }
  },
  {
    "id": "h5",
    "name": "Compass Pro 多功能刀",
    "icon": "🔪",
    "price": "¥259",
    "image": "assets/outdoor/h5.svg",
    "tag": "EDC",
    "desc": "D2 工具钢一体刀身，G10 手柄，附打火棒槽与安全带割刀。",
    "fit": "—",
    "intro": "户外随身 EDC，危机时刻能割、能打火、能求救。",
    "features": [
      "D2 工具钢一体刀身，硬度耐用",
      "G10 手柄，湿手不打滑",
      "集成打火棒槽",
      "隐藏安全带割刀"
    ],
    "en": {
      "name": "Compass Pro Multi-tool",
      "tag": "EDC",
      "desc": "D2 tool-steel full-tang blade, G10 handle, with ferro-rod slot and seatbelt cutter.",
      "intro": "An everyday-carry for the outdoors — can cut, spark and signal in a crisis.",
      "features": [
        "D2 tool-steel full-tang blade — hard and durable",
        "G10 handle — no slip when wet",
        "Integrated ferro-rod slot",
        "Hidden seatbelt cutter"
      ]
    }
  },
  {
    "id": "h6",
    "name": "Signal 头灯",
    "icon": "🔦",
    "price": "¥299",
    "image": "assets/outdoor/h6.svg",
    "tag": "800流明",
    "desc": "铝合金机身，泛/聚双光杯，Type-C 直充，IPX6 防雨。",
    "fit": "—",
    "intro": "夜行与营地的双手自由光源，泛光铺路、聚光探远。",
    "features": [
      "800 流明，泛/聚双光杯",
      "Type-C 直充，无需拆电池",
      "IPX6 防雨",
      "铝合金机身，耐摔"
    ],
    "en": {
      "name": "Signal Headlamp",
      "tag": "800 lm",
      "desc": "Aluminium body, flood/spot dual reflectors, Type-C direct charge, IPX6 rainproof.",
      "intro": "A hands-free light for night trails and camp — flood lights the path, spot reaches far.",
      "features": [
        "800 lm, flood/spot dual reflectors",
        "Type-C direct charge — no battery removal",
        "IPX6 rainproof",
        "Aluminium body — drop-resistant"
      ]
    }
  }
];

export const camping: OutdoorItem[] = [
  {
    "id": "c1",
    "name": "Basecamp 隧道帐",
    "icon": "⛺",
    "price": "¥1,499",
    "image": "assets/outdoor/c1.svg",
    "tag": "3-4人",
    "desc": "20D 硅涂尼龙，铝合金帐杆，前厅可扩展，抗风 8 级。",
    "fit": "3-4人",
    "intro": "小队过夜的主力帐，隧道结构空间大、抗风强，前厅能做饭能储物。",
    "features": [
      "20D 硅涂尼龙，轻且耐晒",
      "铝合金帐杆，抗风 8 级",
      "前厅扩展，雨天也能活动",
      "内帐透气，冷凝水少"
    ],
    "en": {
      "name": "Basecamp Tunnel Tent",
      "tag": "3-4P",
      "desc": "20D silicone-coated nylon, aluminium poles, extendable vestibule, wind-rated to level 8.",
      "intro": "The squad's overnighter tent — tunnel structure gives big space and wind resistance, vestibule for cooking and storage.",
      "features": [
        "20D silicone-coated nylon — light and UV-resistant",
        "Aluminium poles — wind-rated to level 8",
        "Extendable vestibule — activity even in rain",
        "Breathable inner — less condensation"
      ]
    }
  },
  {
    "id": "c2",
    "name": "Terra 睡袋",
    "icon": "🛏️",
    "price": "¥459",
    "image": "assets/outdoor/c2.svg",
    "tag": "-12℃",
    "desc": "850 蓬松度白鸭绒，信封/木乃伊双形态，压缩袋收纳。",
    "fit": "—",
    "intro": "实测温标不虚标，木乃伊锁温、信封能当被，一袋两用。",
    "features": [
      "850 蓬白鸭绒，轻盈保暖",
      "信封/木乃伊双形态",
      "压缩袋收纳，背包无忧",
      "实测温标，不玩虚的"
    ],
    "en": {
      "name": "Terra Sleeping Bag",
      "tag": "-12℃",
      "desc": "850-fill white down, envelope/mummy dual form, compression sack.",
      "intro": "Real temperature rating, no fluff — mummy locks heat, envelope works as a quilt, two uses in one bag.",
      "features": [
        "850-fill white down — light and warm",
        "Envelope/mummy dual form",
        "Compression sack — backpack-friendly",
        "Real rated temp — no fake numbers"
      ]
    }
  },
  {
    "id": "c3",
    "name": "Ember 焚火台",
    "icon": "🔥",
    "price": "¥389",
    "image": "assets/outdoor/c3.svg",
    "tag": "便携",
    "desc": "不锈钢折叠结构，底部进风设计，配烧烤网与收纳袋。",
    "fit": "—",
    "intro": "折叠收纳的营地灶台，底部进风让火烧得更旺更干净。",
    "features": [
      "不锈钢折叠，收纳超薄",
      "底部进风，燃烧充分",
      "附烧烤网，一物两用",
      "收纳袋随行"
    ],
    "en": {
      "name": "Ember Fire Pit",
      "tag": "Portable",
      "desc": "Stainless folding structure, bottom air-intake design, with grill grate and carry bag.",
      "intro": "A foldable camp stove; bottom air-intake makes the fire burn hotter and cleaner.",
      "features": [
        "Stainless foldable — ultra-thin when packed",
        "Bottom air-intake — efficient burn",
        "Includes grill grate — two uses",
        "Carry bag included"
      ]
    }
  },
  {
    "id": "c4",
    "name": "Lumen 营地灯",
    "icon": "💡",
    "price": "¥159",
    "image": "assets/outdoor/c4.svg",
    "tag": "1000流明",
    "desc": "磁吸底座 + 挂钩双固定，无极调光，20000mAh 可反向充电。",
    "fit": "—",
    "intro": "营地照明兼充电宝，磁吸上帐顶、挂钩挂枝头都稳。",
    "features": [
      "1000 流明无极调光",
      "磁吸 + 挂钩双固定",
      "20000mAh 可反向充电",
      "Type-C 直充"
    ],
    "en": {
      "name": "Lumen Camp Light",
      "tag": "1000 lm",
      "desc": "Magnetic base + hook dual mount, stepless dimming, 20000mAh reverse-charge.",
      "intro": "Camp lighting and power bank in one — sticks to tent top via magnet or hangs on a branch.",
      "features": [
        "1000 lm stepless dimming",
        "Magnetic + hook dual mount",
        "20000mAh reverse-charge",
        "Type-C direct charge"
      ]
    }
  },
  {
    "id": "c5",
    "name": "Rest 充气垫",
    "icon": "🟦",
    "price": "¥349",
    "image": "assets/outdoor/c5.svg",
    "tag": "R值4.5",
    "desc": "TPU 贴合耐磨面料，菱形立衬锁温，内置脚踩充气泵。",
    "fit": "单人/双人",
    "intro": "不带电泵的充气垫，脚踩三分钟充好，R值4.5 春秋冬通用。",
    "features": [
      "TPU 耐磨面料",
      "菱形立衬锁温",
      "内置脚踩充气泵",
      "R值4.5，三季可用"
    ],
    "en": {
      "name": "Rest Air Mat",
      "tag": "R-value 4.5",
      "desc": "TPU wear-resistant fabric, diamond baffles for warmth, built-in foot pump.",
      "intro": "An air mat with no separate pump — foot-pump in three minutes; R-value 4.5 for three-season use.",
      "features": [
        "TPU wear-resistant fabric",
        "Diamond baffles lock warmth",
        "Built-in foot pump",
        "R-value 4.5 — three-season"
      ]
    }
  },
  {
    "id": "c6",
    "name": "Nomad 折叠桌椅",
    "icon": "🪑",
    "price": "¥279",
    "image": "assets/outdoor/c6.svg",
    "tag": "铝合金",
    "desc": "航空铝椅架 + 600D 牛津布，可折叠收纳，承重 120kg。",
    "fit": "—",
    "intro": "营地里的坐席，航空铝轻、牛津布耐，折叠塞包无负担。",
    "features": [
      "航空铝椅架，轻而稳",
      "600D 牛津布耐磨",
      "可折叠收纳",
      "承重 120kg"
    ],
    "en": {
      "name": "Nomad Folding Chair & Table",
      "tag": "Aluminium",
      "desc": "Aircraft-aluminium chair frame + 600D oxford cloth, foldable, 120kg load.",
      "intro": "Camp seating — light aircraft aluminium, durable oxford cloth, folds flat into the pack.",
      "features": [
        "Aircraft-aluminium frame — light and stable",
        "600D oxford cloth — wear-resistant",
        "Foldable",
        "120kg load capacity"
      ]
    }
  }
];

export const componentGroups: ComponentGroup[] = [
  {
    "id": "frame",
    "name": "车架 / 前叉",
    "en": "FRAME & FORK"
  },
  {
    "id": "drivetrain",
    "name": "变速 / 传动",
    "en": "DRIVETRAIN"
  },
  {
    "id": "brake",
    "name": "刹车系统",
    "en": "BRAKE"
  },
  {
    "id": "wheel",
    "name": "轮组 / 轮胎",
    "en": "WHEEL & TIRE"
  },
  {
    "id": "cockpit",
    "name": "把组 / 座管",
    "en": "COCKPIT"
  },
  {
    "id": "contact",
    "name": "脚踏 / 碗组 / 中轴",
    "en": "CONTACT"
  },
  {
    "id": "acc",
    "name": "升级包 / 配件",
    "en": "UPGRADE & ACC"
  }
];

export const components: ComponentItem[] = [
  {
    "id": "frame-01",
    "g": "frame",
    "icon": "🚲",
    "name": "X1 铝合金硬尾车架",
    "brand": "SANDO OEM",
    "spec": "6061铝 液压成型 29″ Boost",
    "price": "¥650",
    "fit": "S/M/L/XL",
    "en": {
      "name": "X1 Alloy Hardtail Frame",
      "spec": "6061 alloy hydroformed 29″ Boost"
    }
  },
  {
    "id": "frame-02",
    "g": "frame",
    "icon": "🚲",
    "name": "T1 铝合金硬尾车架",
    "brand": "SANDO OEM",
    "spec": "6066铝 内走线 Flip Chip",
    "price": "¥1,000",
    "fit": "S/M/L/XL",
    "en": {
      "name": "T1 Alloy Hardtail Frame",
      "spec": "6066 alloy internal routing Flip Chip"
    }
  },
  {
    "id": "frame-03",
    "g": "frame",
    "icon": "🚲",
    "name": "F1 全避震车架",
    "brand": "SANDO OEM",
    "spec": "铝 140/130mm 四转点（平台待定）",
    "price": "¥3,250",
    "fit": "M/L/XL",
    "en": {
      "name": "F1 Full-Suspension Frame",
      "spec": "Alloy 140/130mm four-bar (platform TBD)"
    }
  },
  {
    "id": "frame-04",
    "g": "frame",
    "icon": "🔧",
    "name": "XCR 32 Air 前叉",
    "brand": "SR SUNTOUR",
    "spec": "气压 120mm 回弹调节",
    "price": "¥500",
    "fit": "29″",
    "en": {
      "name": "XCR 32 Air Fork",
      "spec": "Air 120mm rebound adjust"
    }
  },
  {
    "id": "frame-05",
    "g": "frame",
    "icon": "🔧",
    "name": "X1 34 Air 前叉",
    "brand": "SR SUNTOUR",
    "spec": "气压 140mm 线控锁死",
    "price": "¥750",
    "fit": "29″",
    "en": {
      "name": "X1 34 Air Fork",
      "spec": "Air 140mm remote lockout"
    }
  },
  {
    "id": "frame-06",
    "g": "frame",
    "icon": "🔧",
    "name": "Durolux 36 Air 前叉",
    "brand": "SR SUNTOUR",
    "spec": "气压 150mm 线控",
    "price": "¥1,400",
    "fit": "29″",
    "en": {
      "name": "Durolux 36 Air Fork",
      "spec": "Air 150mm remote lockout"
    }
  },
  {
    "id": "frame-07",
    "g": "frame",
    "icon": "🛞",
    "name": "后胆 渐进式",
    "brand": "SR SUNTOUR / KS",
    "spec": "气压 渐进曲线 130mm",
    "price": "¥800",
    "fit": "F1",
    "en": {
      "name": "Progressive Rear Shock",
      "spec": "Air progressive curve 130mm"
    }
  },
  {
    "id": "drivetrain-01",
    "g": "drivetrain",
    "icon": "⚙️",
    "name": "蓝图 T5 指拨",
    "brand": "L-TWOO",
    "spec": "1×11 双向释放 铝合金",
    "price": "¥100",
    "fit": "X1",
    "en": {
      "name": "L-TWOO T5 Shifter",
      "spec": "1×11 dual-release alloy"
    }
  },
  {
    "id": "drivetrain-02",
    "g": "drivetrain",
    "icon": "⚙️",
    "name": "蓝图 T5 后拨",
    "brand": "L-TWOO",
    "spec": "1×11 阻尼稳链",
    "price": "¥150",
    "fit": "X1",
    "en": {
      "name": "L-TWOO T5 Rear Derailleur",
      "spec": "1×11 clutch chain stability"
    }
  },
  {
    "id": "drivetrain-03",
    "g": "drivetrain",
    "icon": "⚙️",
    "name": "蓝图 T7 指拨+后拨",
    "brand": "L-TWOO",
    "spec": "1×12 双向释放 阻尼",
    "price": "¥215",
    "fit": "T1",
    "en": {
      "name": "L-TWOO T7 Shifter+RD",
      "spec": "1×12 dual-release clutch"
    }
  },
  {
    "id": "drivetrain-04",
    "g": "drivetrain",
    "icon": "⚙️",
    "name": "蓝图 T9 套件",
    "brand": "L-TWOO",
    "spec": "1×12 碳导板",
    "price": "¥500",
    "fit": "F1",
    "en": {
      "name": "L-TWOO T9 Groupset",
      "spec": "1×12 carbon guide"
    }
  },
  {
    "id": "drivetrain-05",
    "g": "drivetrain",
    "icon": "📡",
    "name": "日晖 飞轮 11速",
    "brand": "SUNSHINE",
    "spec": "11-46T 精冲 CNC",
    "price": "¥100",
    "fit": "X1",
    "en": {
      "name": "SUNSHINE 11-sp Cassette",
      "spec": "11-46T stamped CNC"
    }
  },
  {
    "id": "drivetrain-06",
    "g": "drivetrain",
    "icon": "📡",
    "name": "日晖 飞轮 12速",
    "brand": "SUNSHINE",
    "spec": "10-50T CNC 镂空",
    "price": "¥150",
    "fit": "T1/F1",
    "en": {
      "name": "SUNSHINE 12-sp Cassette",
      "spec": "10-50T CNC hollow"
    }
  },
  {
    "id": "drivetrain-07",
    "g": "drivetrain",
    "icon": "🔗",
    "name": "KMC X11 链条",
    "brand": "KMC",
    "spec": "高精度滚子 X快扣",
    "price": "¥60",
    "fit": "X1",
    "en": {
      "name": "KMC X11 Chain",
      "spec": "High-precision roller X-link"
    }
  },
  {
    "id": "drivetrain-08",
    "g": "drivetrain",
    "icon": "🔗",
    "name": "KMC X12 链条",
    "brand": "KMC",
    "spec": "高精度 12速",
    "price": "¥85",
    "fit": "T1/F1",
    "en": {
      "name": "KMC X12 Chain",
      "spec": "High-precision 12-sp"
    }
  },
  {
    "id": "drivetrain-09",
    "g": "drivetrain",
    "icon": "🔩",
    "name": "PROWHEEL 牙盘",
    "brand": "PROWHEEL",
    "spec": "30-32T 一体 CNC",
    "price": "¥200",
    "fit": "全系",
    "en": {
      "name": "PROWHEEL Chainring",
      "spec": "30-32T one-piece CNC"
    }
  },
  {
    "id": "brake-01",
    "g": "brake",
    "icon": "🛑",
    "name": "TEKTRO M275 油压碟刹",
    "brand": "TEKTRO",
    "spec": "双边 矿物油 180/160",
    "price": "¥250",
    "fit": "X1",
    "en": {
      "name": "TEKTRO M275 Hydraulic Disc",
      "spec": "Dual-piston mineral oil 180/160"
    }
  },
  {
    "id": "brake-02",
    "g": "brake",
    "icon": "🛑",
    "name": "TEKTRO M735 四活塞",
    "brand": "TEKTRO",
    "spec": "四活塞 矿物油 203/180",
    "price": "¥375",
    "fit": "T1",
    "en": {
      "name": "TEKTRO M735 4-Piston",
      "spec": "4-piston mineral oil 203/180"
    }
  },
  {
    "id": "brake-03",
    "g": "brake",
    "icon": "🛑",
    "name": "TEKTRO Orion 四活塞",
    "brand": "TEKTRO",
    "spec": "四活塞 203/180",
    "price": "¥650",
    "fit": "F1",
    "en": {
      "name": "TEKTRO Orion 4-Piston",
      "spec": "4-piston 203/180"
    }
  },
  {
    "id": "brake-04",
    "g": "brake",
    "icon": "💿",
    "name": "散热碟片",
    "brand": "TEKTRO",
    "spec": "180/160/203mm 不锈钢",
    "price": "¥70",
    "fit": "全系",
    "en": {
      "name": "Vented Rotor",
      "spec": "180/160/203mm stainless"
    }
  },
  {
    "id": "wheel-01",
    "g": "wheel",
    "icon": "🛞",
    "name": "久裕 29″ 铝合金轮组",
    "brand": "NOVATEC",
    "spec": "培林花鼓 双抽铝圈",
    "price": "¥600",
    "fit": "X1",
    "en": {
      "name": "NOVATEC 29″ Alloy Wheelset",
      "spec": "Bearing hub double-wall rim"
    }
  },
  {
    "id": "wheel-02",
    "g": "wheel",
    "icon": "🛞",
    "name": "久裕 30mm 内宽轮组",
    "brand": "NOVATEC",
    "spec": "宽圈 培林 29″",
    "price": "¥850",
    "fit": "T1",
    "en": {
      "name": "NOVATEC 30mm Inner Wheelset",
      "spec": "Wide rim bearing 29″"
    }
  },
  {
    "id": "wheel-03",
    "g": "wheel",
    "icon": "🛞",
    "name": "久裕 碳/铝 轮组",
    "brand": "NOVATEC",
    "spec": "碳圈/铝圈 29″",
    "price": "¥1,850",
    "fit": "F1",
    "en": {
      "name": "NOVATEC Carbon/Alloy Wheelset",
      "spec": "Carbon/Alloy rim 29″"
    }
  },
  {
    "id": "wheel-04",
    "g": "wheel",
    "icon": "🟤",
    "name": "正新 CST 轮胎",
    "brand": "CST",
    "spec": "29×2.25 60TPI 防刺",
    "price": "¥125",
    "fit": "X1",
    "en": {
      "name": "CST Tyre",
      "spec": "29×2.25 60TPI puncture-proof"
    }
  },
  {
    "id": "wheel-05",
    "g": "wheel",
    "icon": "🟤",
    "name": "玛吉斯 真空胎",
    "brand": "MAXXIS",
    "spec": "29×2.4/2.5 真空",
    "price": "¥300",
    "fit": "T1/F1",
    "en": {
      "name": "MAXXIS Tubeless Tyre",
      "spec": "29×2.4/2.5 tubeless"
    }
  },
  {
    "id": "cockpit-01",
    "g": "cockpit",
    "icon": "🔩",
    "name": "UNO 把组套件",
    "brand": "UNO",
    "spec": "铝把横/把立/座管 3D锻",
    "price": "¥225",
    "fit": "全系",
    "en": {
      "name": "UNO Cockpit Set",
      "spec": "Alloy bar/stem/seatpost 3D forged"
    }
  },
  {
    "id": "cockpit-02",
    "g": "cockpit",
    "icon": "💺",
    "name": "VELO 人体工学坐垫",
    "brand": "VELO",
    "spec": "运动型 高回弹海绵",
    "price": "¥95",
    "fit": "全系",
    "en": {
      "name": "VELO Ergo Saddle",
      "spec": "Sport high-rebound foam"
    }
  },
  {
    "id": "cockpit-03",
    "g": "cockpit",
    "icon": "⬆️",
    "name": "KS 线控升降座管 125mm",
    "brand": "KS",
    "spec": "气压线控 标配 T1",
    "price": "¥500",
    "fit": "T1",
    "en": {
      "name": "KS 125mm Dropper Post",
      "spec": "Air remote standard T1"
    }
  },
  {
    "id": "cockpit-04",
    "g": "cockpit",
    "icon": "⬆️",
    "name": "KS 线控升降座管 150mm",
    "brand": "KS",
    "spec": "气压线控 标配 F1",
    "price": "¥650",
    "fit": "F1",
    "en": {
      "name": "KS 150mm Dropper Post",
      "spec": "Air remote standard F1"
    }
  },
  {
    "id": "contact-01",
    "g": "contact",
    "icon": "🦶",
    "name": "维格 平板脚踏",
    "brand": "WELLGO",
    "spec": "铝合金本体 钢轴",
    "price": "¥55",
    "fit": "全系",
    "en": {
      "name": "WELLGO Flat Pedal",
      "spec": "Alloy body steel axle"
    }
  },
  {
    "id": "contact-02",
    "g": "contact",
    "icon": "🦶",
    "name": "维格 锁踏",
    "brand": "WELLGO",
    "spec": "铝合金 自锁",
    "price": "¥110",
    "fit": "T1/F1",
    "en": {
      "name": "WELLGO Clipless Pedal",
      "spec": "Alloy self-locking"
    }
  },
  {
    "id": "contact-03",
    "g": "contact",
    "icon": "🔵",
    "name": "NECO 锥管碗组",
    "brand": "NECO",
    "spec": "密封轴承 锥管",
    "price": "¥45",
    "fit": "全系",
    "en": {
      "name": "NECO Tapered Headset",
      "spec": "Sealed bearing tapered"
    }
  },
  {
    "id": "contact-04",
    "g": "contact",
    "icon": "🔵",
    "name": "BSA 螺纹中轴",
    "brand": "SANDO OEM",
    "spec": "密封轴承 BSA",
    "price": "¥40",
    "fit": "全系",
    "en": {
      "name": "BSA Threaded BB",
      "spec": "Sealed bearing BSA"
    }
  },
  {
    "id": "contact-05",
    "g": "contact",
    "icon": "🟠",
    "name": "ODI 锁死把套",
    "brand": "ODI",
    "spec": "双锁环 防滑",
    "price": "¥40",
    "fit": "全系",
    "en": {
      "name": "ODI Lock-on Grip",
      "spec": "Dual lock-ring anti-slip"
    }
  },
  {
    "id": "acc-01",
    "g": "acc",
    "icon": "📦",
    "name": "轮组升级包",
    "brand": "SANDO",
    "spec": "久裕碳圈轮组 + 真空胎",
    "price": "¥2,200",
    "fit": "全系",
    "en": {
      "name": "Wheelset Upgrade Kit",
      "spec": "NOVATEC carbon rim + tubeless"
    }
  },
  {
    "id": "acc-02",
    "g": "acc",
    "icon": "📦",
    "name": "变速升级包",
    "brand": "SANDO",
    "spec": "蓝图 T9 全套替换",
    "price": "¥600",
    "fit": "X1/T1",
    "en": {
      "name": "Drivetrain Upgrade Kit",
      "spec": "Full L-TWOO T9 swap"
    }
  },
  {
    "id": "acc-03",
    "g": "acc",
    "icon": "📦",
    "name": "刹车升级包",
    "brand": "SANDO",
    "spec": "四活塞 + 203碟片",
    "price": "¥500",
    "fit": "X1/T1",
    "en": {
      "name": "Brake Upgrade Kit",
      "spec": "4-piston + 203 rotor"
    }
  },
  {
    "id": "acc-04",
    "g": "acc",
    "icon": "🪪",
    "name": "零件护照 (二维码)",
    "brand": "SANDO",
    "spec": "整车 BOM 透明追溯",
    "price": "—",
    "fit": "全系",
    "en": {
      "name": "Parts Passport (QR)",
      "spec": "Full BOM transparent trace"
    }
  }
];

export const bikeBOM: Record<string, BomRow[]> = {
  "x1": [
    {
      "no": 1,
      "part": "车架",
      "spec": "6061 铝硬尾 29″ Boost",
      "brand": "SANDO OEM",
      "craft": "液压成型 + 双面平滑焊 + T4/T6 热处理",
      "supplier": "天津/深圳",
      "cost": "¥650",
      "cid": "frame-01",
      "en": {
        "part": "Frame",
        "brand": "SANDO OEM",
        "craft": "Hydroformed + smooth double-sided welds + T4/T6 heat treat",
        "supplier": "Tianjin/Shenzhen",
        "spec": "6061 alloy hydroformed 29″ Boost"
      }
    },
    {
      "no": 2,
      "part": "前叉",
      "spec": "XCR 32 Air 120mm",
      "brand": "SR SUNTOUR",
      "craft": "气压弹簧 + 回弹调节",
      "supplier": "昆山",
      "cost": "¥500",
      "cid": "frame-04",
      "en": {
        "part": "Fork",
        "brand": "SR SUNTOUR",
        "craft": "Air spring + rebound adjust",
        "supplier": "Kunshan",
        "spec": "Air 120mm rebound adjust"
      }
    },
    {
      "no": 3,
      "part": "指拨",
      "spec": "T5 1×11",
      "brand": "蓝图 L-TWOO",
      "craft": "双向释放，铝合金本体",
      "supplier": "珠海",
      "cost": "¥100",
      "cid": "drivetrain-01",
      "en": {
        "part": "Shifter",
        "brand": "L-TWOO",
        "craft": "Dual-release, alloy body",
        "supplier": "Zhuhai",
        "spec": "1×11 dual-release alloy"
      }
    },
    {
      "no": 4,
      "part": "后拨",
      "spec": "T5 1×11 带阻尼",
      "brand": "蓝图 L-TWOO",
      "craft": "阻尼稳链，防止链条跳动",
      "supplier": "珠海",
      "cost": "¥150",
      "cid": "drivetrain-02",
      "en": {
        "part": "Rear Derailleur",
        "brand": "L-TWOO",
        "craft": "Clutch stabilises chain, prevents bounce",
        "supplier": "Zhuhai",
        "spec": "1×11 clutch chain stability"
      }
    },
    {
      "no": 5,
      "part": "飞轮",
      "spec": "11-46T 11速",
      "brand": "日晖 SUNSHINE",
      "craft": "精冲 + 热处理，CNC 镂空",
      "supplier": "深圳",
      "cost": "¥100",
      "cid": "drivetrain-05",
      "en": {
        "part": "Cassette",
        "brand": "SUNSHINE",
        "craft": "Stamped + heat-treated, CNC hollow",
        "supplier": "Shenzhen",
        "spec": "11-46T stamped CNC"
      }
    },
    {
      "no": 6,
      "part": "链条",
      "spec": "X11",
      "brand": "KMC 桂盟",
      "craft": "高精度滚子链，X 桥快扣",
      "supplier": "深圳桂盟",
      "cost": "¥60",
      "cid": "drivetrain-07",
      "en": {
        "part": "Chain",
        "brand": "KMC",
        "craft": "High-precision roller, X-link",
        "supplier": "Shenzhen (KMC)",
        "spec": "High-precision roller X-link"
      }
    },
    {
      "no": 7,
      "part": "牙盘",
      "spec": "32T 一体",
      "brand": "PROWHEEL 浩盟",
      "craft": "CNC 铝合金，中空曲柄",
      "supplier": "深圳",
      "cost": "¥200",
      "cid": "drivetrain-09",
      "en": {
        "part": "Chainring",
        "brand": "PROWHEEL",
        "craft": "CNC alloy, hollow crank",
        "supplier": "Shenzhen",
        "spec": "30-32T one-piece CNC"
      }
    },
    {
      "no": 8,
      "part": "中轴",
      "spec": "BSA 螺纹",
      "brand": "配套",
      "craft": "密封轴承",
      "supplier": "—",
      "cost": "¥40",
      "cid": "contact-04",
      "en": {
        "part": "Bottom Bracket",
        "brand": "OEM",
        "craft": "Sealed bearing",
        "supplier": "—",
        "spec": "Sealed bearing BSA"
      }
    },
    {
      "no": 9,
      "part": "刹车",
      "spec": "M275 油压",
      "brand": "TEKTRO 彦豪",
      "craft": "双边制动，矿物油",
      "supplier": "台湾/深圳",
      "cost": "¥250",
      "cid": "brake-01",
      "en": {
        "part": "Brake",
        "brand": "TEKTRO",
        "craft": "Dual-piston, mineral oil",
        "supplier": "Taiwan/Shenzhen",
        "spec": "Dual-piston mineral oil 180/160"
      }
    },
    {
      "no": 10,
      "part": "碟片",
      "spec": "180/160mm",
      "brand": "TEKTRO",
      "craft": "不锈钢，散热纹",
      "supplier": "—",
      "cost": "¥70",
      "cid": "brake-04",
      "en": {
        "part": "Rotor",
        "brand": "TEKTRO",
        "craft": "Stainless, vented",
        "supplier": "—",
        "spec": "180/160/203mm stainless"
      }
    },
    {
      "no": 11,
      "part": "轮组",
      "spec": "29″ 铝合金",
      "brand": "久裕 NOVATEC",
      "craft": "培林花鼓 + 双抽铝圈",
      "supplier": "昆山久裕",
      "cost": "¥600",
      "cid": "wheel-01",
      "en": {
        "part": "Wheelset",
        "brand": "NOVATEC",
        "craft": "Bearing hub + double-wall rim",
        "supplier": "Kunshan (NOVATEC)",
        "spec": "Bearing hub double-wall rim"
      }
    },
    {
      "no": 12,
      "part": "轮胎",
      "spec": "29×2.25",
      "brand": "正新 CST",
      "craft": "60TPI，防刺层",
      "supplier": "厦门",
      "cost": "¥125",
      "cid": "wheel-04",
      "en": {
        "part": "Tyre",
        "brand": "CST",
        "craft": "60TPI, puncture-proof layer",
        "supplier": "Xiamen",
        "spec": "29×2.25 60TPI puncture-proof"
      }
    },
    {
      "no": 13,
      "part": "把组",
      "spec": "铝把横/把立/座管",
      "brand": "UNO",
      "craft": "3D 锻铝",
      "supplier": "台湾/深圳",
      "cost": "¥225",
      "cid": "cockpit-01",
      "en": {
        "part": "Cockpit",
        "brand": "UNO",
        "craft": "3D forged alloy",
        "supplier": "Taiwan/Shenzhen",
        "spec": "Alloy bar/stem/seatpost 3D forged"
      }
    },
    {
      "no": 14,
      "part": "坐垫",
      "spec": "运动型",
      "brand": "VELO",
      "craft": "人体工学海绵",
      "supplier": "台湾/昆山",
      "cost": "¥95",
      "cid": "cockpit-02",
      "en": {
        "part": "Saddle",
        "brand": "VELO",
        "craft": "Ergonomic foam",
        "supplier": "Taiwan/Kunshan",
        "spec": "Sport high-rebound foam"
      }
    },
    {
      "no": 15,
      "part": "脚踏",
      "spec": "平板",
      "brand": "维格 WELLGO",
      "craft": "铝合金本体 + 钢轴",
      "supplier": "台湾",
      "cost": "¥55",
      "cid": "contact-01",
      "en": {
        "part": "Pedal",
        "brand": "WELLGO",
        "craft": "Alloy body + steel axle",
        "supplier": "Taiwan",
        "spec": "Alloy body steel axle"
      }
    },
    {
      "no": 16,
      "part": "碗组",
      "spec": "锥管",
      "brand": "NECO",
      "craft": "密封轴承",
      "supplier": "深圳",
      "cost": "¥45",
      "cid": "contact-03",
      "en": {
        "part": "Headset",
        "brand": "NECO",
        "craft": "Sealed bearing",
        "supplier": "Shenzhen",
        "spec": "Sealed bearing tapered"
      }
    },
    {
      "no": 17,
      "part": "把套",
      "spec": "锁死",
      "brand": "ODI",
      "craft": "双锁环",
      "supplier": "—",
      "cost": "¥40",
      "cid": "contact-05",
      "en": {
        "part": "Grip",
        "brand": "ODI",
        "craft": "Dual lock-ring",
        "supplier": "—",
        "spec": "Dual lock-ring anti-slip"
      }
    },
    {
      "no": 18,
      "part": "杂项",
      "spec": "线管/螺丝",
      "brand": "通用",
      "craft": "—",
      "supplier": "—",
      "cost": "¥65",
      "en": {
        "part": "Misc",
        "brand": "Generic",
        "craft": "—",
        "supplier": "—",
        "spec": "Cables / screws"
      }
    }
  ],
  "t1": [
    {
      "no": 1,
      "part": "车架",
      "spec": "6066 铝 29″ Boost 内走线",
      "brand": "SANDO OEM",
      "craft": "液压成型 + 内走线 + Flip Chip",
      "supplier": "厦门/深圳",
      "cost": "¥1000",
      "cid": "frame-02",
      "en": {
        "part": "Frame",
        "brand": "SANDO OEM",
        "craft": "Hydroformed + internal routing + Flip Chip",
        "supplier": "Xiamen/Shenzhen",
        "spec": "6066 alloy internal routing Flip Chip"
      }
    },
    {
      "no": 2,
      "part": "前叉",
      "spec": "X1 34 Air 140mm",
      "brand": "SR SUNTOUR",
      "craft": "气压 + 线控锁死",
      "supplier": "昆山",
      "cost": "¥750",
      "cid": "frame-05",
      "en": {
        "part": "Fork",
        "brand": "SR SUNTOUR",
        "craft": "Air + remote lockout",
        "supplier": "Kunshan",
        "spec": "Air 140mm remote lockout"
      }
    },
    {
      "no": 3,
      "part": "指拨+后拨",
      "spec": "1×12 双向释放 阻尼",
      "brand": "蓝图 L-TWOO",
      "craft": "双向释放",
      "supplier": "珠海",
      "cost": "¥215",
      "cid": "drivetrain-03",
      "en": {
        "part": "指拨+后拨",
        "brand": "L-TWOO",
        "craft": "Dual-release",
        "supplier": "Zhuhai",
        "spec": "1×12 dual-release clutch"
      }
    },
    {
      "no": 4,
      "part": "飞轮",
      "spec": "10-50T 12速",
      "brand": "日晖 SUNSHINE",
      "craft": "CNC 镂空",
      "supplier": "深圳",
      "cost": "¥150",
      "cid": "drivetrain-06",
      "en": {
        "part": "Cassette",
        "brand": "SUNSHINE",
        "craft": "CNC hollow",
        "supplier": "Shenzhen",
        "spec": "10-50T CNC hollow"
      }
    },
    {
      "no": 5,
      "part": "链条",
      "spec": "X12",
      "brand": "KMC 桂盟",
      "craft": "高精度",
      "supplier": "深圳桂盟",
      "cost": "¥85",
      "cid": "drivetrain-08",
      "en": {
        "part": "Chain",
        "brand": "KMC",
        "craft": "High-precision",
        "supplier": "Shenzhen (KMC)",
        "spec": "High-precision 12-sp"
      }
    },
    {
      "no": 6,
      "part": "牙盘",
      "spec": "30T 一体",
      "brand": "PROWHEEL 浩盟",
      "craft": "CNC",
      "supplier": "深圳",
      "cost": "¥200",
      "cid": "drivetrain-09",
      "en": {
        "part": "Chainring",
        "brand": "PROWHEEL",
        "craft": "CNC",
        "supplier": "Shenzhen",
        "spec": "30-32T one-piece CNC"
      }
    },
    {
      "no": 7,
      "part": "中轴",
      "spec": "BSA",
      "brand": "配套",
      "craft": "—",
      "supplier": "—",
      "cost": "¥40",
      "cid": "contact-04",
      "en": {
        "part": "Bottom Bracket",
        "brand": "OEM",
        "craft": "—",
        "supplier": "—",
        "spec": "Sealed bearing BSA"
      }
    },
    {
      "no": 8,
      "part": "刹车",
      "spec": "M735 四活塞",
      "brand": "TEKTRO 彦豪",
      "craft": "四活塞，矿物油",
      "supplier": "台湾/深圳",
      "cost": "¥375",
      "cid": "brake-02",
      "en": {
        "part": "Brake",
        "brand": "TEKTRO",
        "craft": "4-piston, mineral oil",
        "supplier": "Taiwan/Shenzhen",
        "spec": "4-piston mineral oil 203/180"
      }
    },
    {
      "no": 9,
      "part": "碟片",
      "spec": "203/180mm",
      "brand": "TEKTRO",
      "craft": "散热",
      "supplier": "—",
      "cost": "¥70",
      "cid": "brake-04",
      "en": {
        "part": "Rotor",
        "brand": "TEKTRO",
        "craft": "Vented",
        "supplier": "—",
        "spec": "180/160/203mm stainless"
      }
    },
    {
      "no": 10,
      "part": "轮组",
      "spec": "29″ 30mm 内宽",
      "brand": "久裕 NOVATEC",
      "craft": "宽圈，培林",
      "supplier": "昆山",
      "cost": "¥850",
      "cid": "wheel-02",
      "en": {
        "part": "Wheelset",
        "brand": "NOVATEC",
        "craft": "Wide rim, bearing",
        "supplier": "Kunshan",
        "spec": "Wide rim bearing 29″"
      }
    },
    {
      "no": 11,
      "part": "轮胎",
      "spec": "29×2.4",
      "brand": "正新/玛吉斯",
      "craft": "真空胎",
      "supplier": "厦门",
      "cost": "¥300",
      "cid": "wheel-05",
      "en": {
        "part": "Tyre",
        "brand": "CST/MAXXIS",
        "craft": "Tubeless",
        "supplier": "Xiamen",
        "spec": "29×2.4/2.5 tubeless"
      }
    },
    {
      "no": 12,
      "part": "把组",
      "spec": "铝把横 780mm",
      "brand": "UNO",
      "craft": "3D 锻",
      "supplier": "台湾/深圳",
      "cost": "¥225",
      "cid": "cockpit-01",
      "en": {
        "part": "Cockpit",
        "brand": "UNO",
        "craft": "3D 锻",
        "supplier": "Taiwan/Shenzhen",
        "spec": "Alloy bar/stem/seatpost 3D forged"
      }
    },
    {
      "no": 13,
      "part": "坐垫",
      "spec": "运动型",
      "brand": "VELO",
      "craft": "ergonomics",
      "supplier": "台湾",
      "cost": "¥95",
      "cid": "cockpit-02",
      "en": {
        "part": "Saddle",
        "brand": "VELO",
        "craft": "Ergonomic",
        "supplier": "Taiwan",
        "spec": "Sport high-rebound foam"
      }
    },
    {
      "no": 14,
      "part": "升降座管",
      "spec": "线控 125mm",
      "brand": "KS/EXA",
      "craft": "气压线控",
      "supplier": "台湾/深圳",
      "cost": "¥500",
      "cid": "cockpit-03",
      "en": {
        "part": "Dropper Post",
        "brand": "KS/EXA",
        "craft": "Air remote",
        "supplier": "Taiwan/Shenzhen",
        "spec": "Air remote standard T1"
      }
    },
    {
      "no": 15,
      "part": "脚踏",
      "spec": "平板/锁踏",
      "brand": "维格 WELLGO",
      "craft": "—",
      "supplier": "台湾",
      "cost": "¥55",
      "cid": "contact-01",
      "en": {
        "part": "Pedal",
        "brand": "WELLGO",
        "craft": "—",
        "supplier": "Taiwan",
        "spec": "Alloy body steel axle"
      }
    },
    {
      "no": 16,
      "part": "碗组",
      "spec": "锥管",
      "brand": "NECO",
      "craft": "—",
      "supplier": "深圳",
      "cost": "¥45",
      "cid": "contact-03",
      "en": {
        "part": "Headset",
        "brand": "NECO",
        "craft": "—",
        "supplier": "Shenzhen",
        "spec": "Sealed bearing tapered"
      }
    },
    {
      "no": 17,
      "part": "把套",
      "spec": "锁死",
      "brand": "ODI",
      "craft": "—",
      "supplier": "—",
      "cost": "¥40",
      "cid": "contact-05",
      "en": {
        "part": "Grip",
        "brand": "ODI",
        "craft": "—",
        "supplier": "—",
        "spec": "Dual lock-ring anti-slip"
      }
    },
    {
      "no": 18,
      "part": "杂项",
      "spec": "线管/螺丝",
      "brand": "通用",
      "craft": "—",
      "supplier": "—",
      "cost": "¥80",
      "en": {
        "part": "Misc",
        "brand": "Generic",
        "craft": "—",
        "supplier": "—",
        "spec": "Cables / screws"
      }
    }
  ],
  "f1": [
    {
      "no": 1,
      "part": "车架",
      "spec": "铝 29″ 140/130 四转点",
      "brand": "SANDO OEM",
      "craft": "液压成型 + 双面平滑焊 + T4/T6 热处理",
      "supplier": "厦门/深圳",
      "cost": "¥3250",
      "cid": "frame-03",
      "en": {
        "part": "Frame",
        "brand": "SANDO OEM",
        "craft": "Hydroformed + smooth double-sided welds + T4/T6 heat treat",
        "supplier": "Xiamen/Shenzhen",
        "spec": "Alloy 140/130mm four-bar (platform TBD)"
      }
    },
    {
      "no": 2,
      "part": "后胆",
      "spec": "气压 渐进",
      "brand": "SR SUNTOUR / KS",
      "craft": "渐进式曲线",
      "supplier": "台湾/昆山",
      "cost": "¥800",
      "cid": "frame-07",
      "en": {
        "part": "Rear Shock",
        "brand": "SR SUNTOUR / KS",
        "craft": "渐进式曲线",
        "supplier": "Taiwan/Kunshan",
        "spec": "Air progressive curve 130mm"
      }
    },
    {
      "no": 3,
      "part": "前叉",
      "spec": "Durolux 36 Air 150mm",
      "brand": "SR SUNTOUR",
      "craft": "气压 + 线控",
      "supplier": "昆山",
      "cost": "¥1400",
      "cid": "frame-06",
      "en": {
        "part": "Fork",
        "brand": "SR SUNTOUR",
        "craft": "Air + remote lockout",
        "supplier": "Kunshan",
        "spec": "Air 150mm remote lockout"
      }
    },
    {
      "no": 4,
      "part": "指拨+后拨",
      "spec": "1×12 碳导板",
      "brand": "蓝图 L-TWOO",
      "craft": "双向释放",
      "supplier": "珠海",
      "cost": "¥500",
      "cid": "drivetrain-04",
      "en": {
        "part": "指拨+后拨",
        "brand": "L-TWOO",
        "craft": "Dual-release",
        "supplier": "Zhuhai",
        "spec": "1×12 carbon guide"
      }
    },
    {
      "no": 5,
      "part": "飞轮",
      "spec": "10-51T 12速",
      "brand": "日晖 SUNSHINE",
      "craft": "CNC",
      "supplier": "深圳",
      "cost": "¥150",
      "cid": "drivetrain-06",
      "en": {
        "part": "Cassette",
        "brand": "SUNSHINE",
        "craft": "CNC",
        "supplier": "Shenzhen",
        "spec": "10-50T CNC hollow"
      }
    },
    {
      "no": 6,
      "part": "链条",
      "spec": "X12",
      "brand": "KMC 桂盟",
      "craft": "高精度",
      "supplier": "深圳桂盟",
      "cost": "¥85",
      "cid": "drivetrain-08",
      "en": {
        "part": "Chain",
        "brand": "KMC",
        "craft": "High-precision",
        "supplier": "Shenzhen (KMC)",
        "spec": "High-precision 12-sp"
      }
    },
    {
      "no": 7,
      "part": "牙盘",
      "spec": "30T 一体",
      "brand": "PROWHEEL 浩盟",
      "craft": "CNC",
      "supplier": "深圳/昆山",
      "cost": "¥200",
      "cid": "drivetrain-09",
      "en": {
        "part": "Chainring",
        "brand": "PROWHEEL",
        "craft": "CNC",
        "supplier": "Shenzhen/Kunshan",
        "spec": "30-32T one-piece CNC"
      }
    },
    {
      "no": 8,
      "part": "中轴",
      "spec": "BSA/DUB",
      "brand": "配套",
      "craft": "—",
      "supplier": "—",
      "cost": "¥40",
      "cid": "contact-04",
      "en": {
        "part": "Bottom Bracket",
        "brand": "OEM",
        "craft": "—",
        "supplier": "—",
        "spec": "Sealed bearing BSA"
      }
    },
    {
      "no": 9,
      "part": "刹车",
      "spec": "Orion 四活塞",
      "brand": "TEKTRO 彦豪",
      "craft": "四活塞",
      "supplier": "台湾/珠海",
      "cost": "¥650",
      "cid": "brake-03",
      "en": {
        "part": "Brake",
        "brand": "TEKTRO",
        "craft": "4-piston",
        "supplier": "Taiwan/Zhuhai",
        "spec": "4-piston 203/180"
      }
    },
    {
      "no": 10,
      "part": "碟片",
      "spec": "203/180mm",
      "brand": "配套",
      "craft": "—",
      "supplier": "—",
      "cost": "¥70",
      "cid": "brake-04",
      "en": {
        "part": "Rotor",
        "brand": "OEM",
        "craft": "—",
        "supplier": "—",
        "spec": "180/160/203mm stainless"
      }
    },
    {
      "no": 11,
      "part": "轮组",
      "spec": "29″ 碳/铝",
      "brand": "久裕 NOVATEC",
      "craft": "碳圈/铝圈",
      "supplier": "昆山/厦门",
      "cost": "¥1850",
      "cid": "wheel-03",
      "en": {
        "part": "Wheelset",
        "brand": "NOVATEC",
        "craft": "Carbon/Alloy rim",
        "supplier": "昆山/厦门",
        "spec": "Carbon/Alloy rim 29″"
      }
    },
    {
      "no": 12,
      "part": "轮胎",
      "spec": "29×2.5 真空",
      "brand": "玛吉斯/正新",
      "craft": "真空胎",
      "supplier": "厦门",
      "cost": "¥300",
      "cid": "wheel-05",
      "en": {
        "part": "Tyre",
        "brand": "MAXXIS/CST",
        "craft": "Tubeless",
        "supplier": "Xiamen",
        "spec": "29×2.4/2.5 tubeless"
      }
    },
    {
      "no": 13,
      "part": "把组",
      "spec": "铝/碳",
      "brand": "UNO/FSA",
      "craft": "—",
      "supplier": "台湾/深圳",
      "cost": "¥225",
      "cid": "cockpit-01",
      "en": {
        "part": "Cockpit",
        "brand": "UNO/FSA",
        "craft": "—",
        "supplier": "Taiwan/Shenzhen",
        "spec": "Alloy bar/stem/seatpost 3D forged"
      }
    },
    {
      "no": 14,
      "part": "坐垫",
      "spec": "运动型",
      "brand": "VELO",
      "craft": "ergonomics",
      "supplier": "台湾",
      "cost": "¥95",
      "cid": "cockpit-02",
      "en": {
        "part": "Saddle",
        "brand": "VELO",
        "craft": "Ergonomic",
        "supplier": "Taiwan",
        "spec": "Sport high-rebound foam"
      }
    },
    {
      "no": 15,
      "part": "升降座管",
      "spec": "线控 150mm",
      "brand": "KS",
      "craft": "气压",
      "supplier": "台湾/深圳",
      "cost": "¥650",
      "cid": "cockpit-04",
      "en": {
        "part": "Dropper Post",
        "brand": "KS",
        "craft": "气压",
        "supplier": "Taiwan/Shenzhen",
        "spec": "Air remote standard F1"
      }
    },
    {
      "no": 16,
      "part": "脚踏",
      "spec": "锁踏/平板",
      "brand": "维格 WELLGO",
      "craft": "—",
      "supplier": "台湾",
      "cost": "¥110",
      "cid": "contact-02",
      "en": {
        "part": "Pedal",
        "brand": "WELLGO",
        "craft": "—",
        "supplier": "Taiwan",
        "spec": "Alloy self-locking"
      }
    },
    {
      "no": 17,
      "part": "碗组",
      "spec": "锥管",
      "brand": "NECO",
      "craft": "—",
      "supplier": "深圳",
      "cost": "¥45",
      "cid": "contact-03",
      "en": {
        "part": "Headset",
        "brand": "NECO",
        "craft": "—",
        "supplier": "Shenzhen",
        "spec": "Sealed bearing tapered"
      }
    },
    {
      "no": 18,
      "part": "把套",
      "spec": "锁死",
      "brand": "ODI",
      "craft": "—",
      "supplier": "—",
      "cost": "¥40",
      "cid": "contact-05",
      "en": {
        "part": "Grip",
        "brand": "ODI",
        "craft": "—",
        "supplier": "—",
        "spec": "Dual lock-ring anti-slip"
      }
    },
    {
      "no": 19,
      "part": "杂项",
      "spec": "线管/螺丝",
      "brand": "通用",
      "craft": "—",
      "supplier": "—",
      "cost": "¥100",
      "en": {
        "part": "Misc",
        "brand": "Generic",
        "craft": "—",
        "supplier": "—",
        "spec": "Cables / screws"
      }
    }
  ]
};

export const dealers: Dealer[] = [
  {
    "name": "北京",
    "en": "Beijing",
    "lng": 116.41,
    "lat": 39.9,
    "addr": "地址待补充"
  },
  {
    "name": "上海",
    "en": "Shanghai",
    "lng": 121.47,
    "lat": 31.23,
    "addr": "地址待补充"
  },
  {
    "name": "广州",
    "en": "Guangzhou",
    "lng": 113.26,
    "lat": 23.13,
    "addr": "地址待补充"
  },
  {
    "name": "深圳",
    "en": "Shenzhen",
    "lng": 114.06,
    "lat": 22.55,
    "addr": "地址待补充"
  },
  {
    "name": "成都",
    "en": "Chengdu",
    "lng": 104.07,
    "lat": 30.57,
    "addr": "地址待补充"
  },
  {
    "name": "重庆",
    "en": "Chongqing",
    "lng": 106.55,
    "lat": 29.56,
    "addr": "地址待补充"
  },
  {
    "name": "杭州",
    "en": "Hangzhou",
    "lng": 120.15,
    "lat": 30.27,
    "addr": "地址待补充"
  },
  {
    "name": "武汉",
    "en": "Wuhan",
    "lng": 114.3,
    "lat": 30.59,
    "addr": "地址待补充"
  },
  {
    "name": "西安",
    "en": "Xi'an",
    "lng": 108.95,
    "lat": 34.27,
    "addr": "地址待补充"
  },
  {
    "name": "南京",
    "en": "Nanjing",
    "lng": 118.78,
    "lat": 32.07,
    "addr": "地址待补充"
  },
  {
    "name": "天津",
    "en": "Tianjin",
    "lng": 117.2,
    "lat": 39.13,
    "addr": "地址待补充"
  },
  {
    "name": "苏州",
    "en": "Suzhou",
    "lng": 120.62,
    "lat": 31.32,
    "addr": "地址待补充"
  },
  {
    "name": "长沙",
    "en": "Changsha",
    "lng": 112.94,
    "lat": 28.23,
    "addr": "地址待补充"
  },
  {
    "name": "郑州",
    "en": "Zhengzhou",
    "lng": 113.62,
    "lat": 34.75,
    "addr": "地址待补充"
  },
  {
    "name": "青岛",
    "en": "Qingdao",
    "lng": 120.38,
    "lat": 36.07,
    "addr": "地址待补充"
  },
  {
    "name": "沈阳",
    "en": "Shenyang",
    "lng": 123.43,
    "lat": 41.8,
    "addr": "地址待补充"
  },
  {
    "name": "大连",
    "en": "Dalian",
    "lng": 121.62,
    "lat": 38.92,
    "addr": "地址待补充"
  },
  {
    "name": "厦门",
    "en": "Xiamen",
    "lng": 118.09,
    "lat": 24.48,
    "addr": "地址待补充"
  },
  {
    "name": "昆明",
    "en": "Kunming",
    "lng": 102.71,
    "lat": 25.05,
    "addr": "地址待补充"
  },
  {
    "name": "哈尔滨",
    "en": "Harbin",
    "lng": 126.53,
    "lat": 45.8,
    "addr": "地址待补充"
  },
  {
    "name": "济南",
    "en": "Jinan",
    "lng": 117,
    "lat": 36.65,
    "addr": "地址待补充"
  },
  {
    "name": "福州",
    "en": "Fuzhou",
    "lng": 119.3,
    "lat": 26.08,
    "addr": "地址待补充"
  },
  {
    "name": "合肥",
    "en": "Hefei",
    "lng": 117.27,
    "lat": 31.86,
    "addr": "地址待补充"
  },
  {
    "name": "南昌",
    "en": "Nanchang",
    "lng": 115.86,
    "lat": 28.68,
    "addr": "地址待补充"
  },
  {
    "name": "贵阳",
    "en": "Guiyang",
    "lng": 106.71,
    "lat": 26.65,
    "addr": "地址待补充"
  },
  {
    "name": "南宁",
    "en": "Nanning",
    "lng": 108.37,
    "lat": 22.82,
    "addr": "地址待补充"
  },
  {
    "name": "兰州",
    "en": "Lanzhou",
    "lng": 103.83,
    "lat": 36.06,
    "addr": "地址待补充"
  },
  {
    "name": "太原",
    "en": "Taiyuan",
    "lng": 112.55,
    "lat": 37.87,
    "addr": "地址待补充"
  },
  {
    "name": "石家庄",
    "en": "Shijiazhuang",
    "lng": 114.5,
    "lat": 38.05,
    "addr": "地址待补充"
  },
  {
    "name": "乌鲁木齐",
    "en": "Urumqi",
    "lng": 87.62,
    "lat": 43.82,
    "addr": "地址待补充"
  },
  {
    "name": "拉萨",
    "en": "Lhasa",
    "lng": 91.11,
    "lat": 29.97,
    "addr": "地址待补充"
  },
  {
    "name": "呼和浩特",
    "en": "Hohhot",
    "lng": 111.75,
    "lat": 40.84,
    "addr": "地址待补充"
  },
  {
    "name": "银川",
    "en": "Yinchuan",
    "lng": 106.27,
    "lat": 38.47,
    "addr": "地址待补充"
  },
  {
    "name": "西宁",
    "en": "Xining",
    "lng": 101.78,
    "lat": 36.62,
    "addr": "地址待补充"
  },
  {
    "name": "海口",
    "en": "Haikou",
    "lng": 110.35,
    "lat": 20.02,
    "addr": "地址待补充"
  },
  {
    "name": "香港",
    "en": "Hong Kong",
    "lng": 114.17,
    "lat": 22.32,
    "addr": "地址待补充"
  },
  {
    "name": "澳门",
    "en": "Macau",
    "lng": 113.55,
    "lat": 22.2,
    "addr": "地址待补充"
  }
];
