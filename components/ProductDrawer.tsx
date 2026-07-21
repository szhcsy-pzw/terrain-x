"use client";

// ============================================================
// 产品详情侧滑抽屉（对齐旧站 SandoDrawer 的信息结构）
// 右侧面板：品牌 chip + 大图 + 标题/副标题/编号 + 价格 +
//           规格表 + 功能介绍 + 产品简介 + CTA
// Esc / 遮罩 / 关闭按钮 关闭；语言切换时内容自动重渲染
// ============================================================

import { useEffect } from "react";
import Link from "next/link";
import { useDrawer } from "@/lib/drawer";
import { useI18n } from "@/lib/i18n";
import { componentGroups, hidePartsPrices } from "@/lib/catalog";
import MediaImage from "./MediaImage";
import BuildButton from "./BuildButton";

export default function ProductDrawer() {
  const { payload, closeDrawer } = useDrawer();
  const { t, lang, specKey, pick, pickArr, pickSpecs } = useI18n();

  // Esc 关闭 + 锁滚动
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeDrawer();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = payload ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [payload, closeDrawer]);

  const open = !!payload;

  // 按类型整理展示数据
  let brandChip = "SANDO";
  let brandCls = "bg-orange-500";
  let kindLabel = "";
  let image = "";
  let imageKey = "";
  let icon = "🚲";
  let title = "";
  let subtitle = "";
  let code = "";
  let price = "";
  let priceNote = "";
  let showPrice = true;
  let specs: { k: string; v: string }[] = [];
  let features: string[] = [];
  let intro = "";
  let fit = "";
  let cta: React.ReactNode = null;

  if (payload?.kind === "bike") {
    const b = payload.data;
    kindLabel = b.level;
    image = b.image;
    imageKey = `bike:${b.id}`;
    title = pick(b, "name");
    subtitle = pick(b, "sub");
    code = b.code;
    price = b.price;
    priceNote = t("common.from");
    specs = pickSpecs(b).map((s) => ({ k: specKey(s.k), v: s.v }));
    features = pickArr(b, "features");
    intro = pick(b, "intro");
    cta = (
      <div className="space-y-2.5">
        <BuildButton kind="bike" id={b.id} />
        <div className="flex gap-3">
          <Link href={`/bike-parts/?model=${b.id}`} onClick={closeDrawer} className="btn-primary flex-1 justify-center !py-2.5">
            {t("bikes.passportBtn")}
          </Link>
          <Link href={`/parts/?model=${b.id}`} onClick={closeDrawer} className="btn-ghost !py-2.5">
            {t("bikes.partsBtn")}
          </Link>
        </div>
      </div>
    );
  } else if (payload?.kind === "component") {
    const c = payload.data;
    // 分组名走 UI 字典（group.xxx），保证英文模式可翻译
    kindLabel = t(`group.${c.g}` as any);
    icon = c.icon || "🔧";
    image = `assets/parts/${c.g}.svg`;
    imageKey = `part:${c.id}`;
    title = pick(c, "name");
    subtitle = lang === "en" && c.en?.spec ? c.en.spec : c.spec;
    code = c.brand;
    price = c.price;
    showPrice = !hidePartsPrices && c.price !== "—";
    fit = c.fit;
    cta = <BuildButton kind="part" id={c.id} />;
  } else if (payload?.kind === "outdoor") {
    const o = payload.data;
    brandChip = "terrain-x";
    brandCls = "bg-teal-500";
    kindLabel = payload.series === "hiking" ? t("drawer.hiking") : t("drawer.camping");
    image = o.image;
    imageKey = `out:${o.id}`;
    icon = o.icon;
    title = pick(o, "name");
    subtitle = pick(o, "desc");
    code = lang === "en" && o.en?.tag ? o.en.tag : o.tag;
    price = o.price;
    fit = o.fit;
    features = pickArr(o, "features");
    intro = pick(o, "intro");
    cta = <BuildButton kind="out" id={o.id} />;
  }

  return (
    <>
      {/* 遮罩 */}
      <div
        onClick={closeDrawer}
        className={`fixed inset-0 z-[60] bg-rock-950/50 transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      {/* 面板 */}
      <aside
        role="dialog"
        aria-modal="true"
        className={`fixed right-0 top-0 z-[61] flex h-full w-full max-w-lg flex-col bg-white shadow-lift transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={closeDrawer}
          aria-label={t("common.close")}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-xl text-rock-600 shadow-card transition hover:bg-rock-100"
        >
          ×
        </button>

        <div className="flex-1 overflow-y-auto">
          {/* 头图 */}
          <div className="relative bg-rock-100">
            <MediaImage path={imageKey} fallback={image} alt={title} className="h-64 w-full object-cover" />
            <div className="absolute left-5 top-5 flex gap-2">
              <span className={`rounded-full px-3 py-1 text-xs font-bold text-white ${brandCls}`}>
                {brandChip}
              </span>
              {kindLabel && (
                <span className="rounded-full bg-rock-950/80 px-3 py-1 font-mono text-[11px] tracking-wider text-white">
                  {kindLabel}
                </span>
              )}
            </div>
          </div>

          <div className="p-7">
            {/* 标题区 */}
            <h2 className="text-2xl font-extrabold text-rock-950">
              {icon && payload?.kind !== "bike" && <span className="mr-2">{icon}</span>}
              {title}
            </h2>
            {subtitle && <p className="mt-1.5 text-sm leading-6 text-rock-500">{subtitle}</p>}
            {code && <p className="mt-1 font-mono text-xs tracking-wider text-rock-400">{code}</p>}

            {/* 价格 */}
            {showPrice && price && (
              <p className="mt-4 text-3xl font-black text-orange-600">
                {price}
                {priceNote && <span className="ml-1.5 text-sm font-normal text-rock-400">{priceNote}</span>}
              </p>
            )}
            {fit && (
              <p className="mt-2 text-xs text-rock-400">
                {t("common.fit")}: <b className="text-rock-700">{fit}</b>
              </p>
            )}

            {/* 规格表 */}
            {specs.length > 0 && (
              <>
                <h3 className="mt-7 border-b border-rock-100 pb-2 text-sm font-extrabold uppercase tracking-wider text-rock-900">
                  {t("d.specs")}
                </h3>
                <dl className="mt-3 space-y-2.5">
                  {specs.map((s, i) => (
                    <div key={i} className="flex justify-between gap-4 text-sm">
                      <dt className="shrink-0 text-rock-400">{s.k}</dt>
                      <dd className="text-right font-semibold text-rock-800">{s.v}</dd>
                    </div>
                  ))}
                </dl>
              </>
            )}

            {/* 功能介绍 */}
            {features.length > 0 && (
              <>
                <h3 className="mt-7 border-b border-rock-100 pb-2 text-sm font-extrabold uppercase tracking-wider text-rock-900">
                  {t("d.features")}
                </h3>
                <ul className="mt-3 space-y-2.5">
                  {features.map((f, i) => (
                    <li key={i} className="flex gap-2.5 text-sm leading-6 text-rock-700">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                      {f}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {/* 产品简介 */}
            {intro && (
              <>
                <h3 className="mt-7 border-b border-rock-100 pb-2 text-sm font-extrabold uppercase tracking-wider text-rock-900">
                  {t("d.intro")}
                </h3>
                <p className="mt-3 text-sm leading-7 text-rock-600">{intro}</p>
              </>
            )}
          </div>
        </div>

        {/* 底部 CTA */}
        {cta && <div className="border-t border-rock-100 p-5">{cta}</div>}
      </aside>
    </>
  );
}
