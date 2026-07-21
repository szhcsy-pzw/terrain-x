"use client";

// 选配清单：右下 FAB + 侧滑面板 + 规格对比 + JSON 导出
// 支持三类产品混合：整车 / 自行车配件 / 户外产品

import { useState } from "react";
import { useBuild, BuildRef } from "@/lib/build";
import { useI18n } from "@/lib/i18n";
import { useCatalog } from "@/lib/store";
import { componentGroups, hidePartsPrices } from "@/lib/catalog";
import MediaImage from "./MediaImage";

interface Row {
  key: string;
  ref: BuildRef;
  image: string;
  category: string; // 系统/系列/级别
  name: string;
  spec: string;
  fit: string;
  price: string;
  brand: string;
}

export default function BuildDrawer() {
  const { refs, remove, clear, open, setOpen } = useBuild();
  const { bikes, hiking, camping, components } = useCatalog();
  const { t, pick, lang } = useI18n();
  const [compareOpen, setCompareOpen] = useState(false);

  const groupName = (gid: string) => {
    const g = componentGroups.find((x) => x.id === gid);
    if (!g) return gid;
    return lang === "en" ? g.en : g.name;
  };

  // 把复合 ref 解析成统一行
  const rows: Row[] = refs
    .map((ref) => {
      if (ref.kind === "bike") {
        const b = bikes.find((x) => x.id === ref.id);
        if (!b) return null;
        return {
          key: `bike:${ref.id}`,
          ref,
          image: b.image,
          category: b.level,
          name: pick(b, "name"),
          spec: pick(b, "sub"),
          fit: b.code,
          price: `${b.price} ${t("common.from")}`,
          brand: "SANDO",
        };
      }
      if (ref.kind === "part") {
        const c = components.find((x) => x.id === ref.id);
        if (!c) return null;
        return {
          key: `part:${ref.id}`,
          ref,
          image: `assets/parts/${c.g}.svg`,
          category: groupName(c.g),
          name: pick(c, "name"),
          spec: lang === "en" && c.en?.spec ? c.en.spec : c.spec,
          fit: c.fit,
          price: hidePartsPrices || c.price === "—" ? t("common.priceAsk") : c.price,
          brand: c.brand,
        };
      }
      // out
      const o = [...hiking, ...camping].find((x) => x.id === ref.id);
      if (!o) return null;
      const seriesName = o.id.startsWith("h") ? t("drawer.hiking") : t("drawer.camping");
      return {
        key: `out:${ref.id}`,
        ref,
        image: o.image,
        category: seriesName,
        name: pick(o, "name"),
        spec: pick(o, "desc"),
        fit: o.fit,
        price: o.price,
        brand: "terrain-x",
      };
    })
    .filter(Boolean) as Row[];

  const exportJson = () => {
    const payload = rows.map((r) => ({
      type: r.ref.kind,
      id: r.ref.id,
      name: r.name,
      brand: r.brand,
      category: r.category,
      spec: r.spec,
      fit: r.fit,
      price: r.price,
    }));
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sando-build.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const compareRows: { key: string; label: string; get: (r: Row) => string }[] = [
    { key: "brand", label: t("cmp.brand"), get: (r) => r.brand },
    { key: "system", label: t("cmp.system"), get: (r) => r.category },
    { key: "spec", label: t("cmp.spec"), get: (r) => r.spec },
    { key: "fit", label: t("cmp.fit"), get: (r) => r.fit },
    { key: "price", label: t("cmp.price"), get: (r) => r.price },
  ];

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-rock-900 px-5 py-3.5 text-sm font-bold text-white shadow-lift transition hover:bg-orange-500"
      >
        🧰 {t("build.title")}
        {rows.length > 0 && (
          <span className="rounded-full bg-orange-500 px-2 py-0.5 text-xs font-black">{rows.length}</span>
        )}
      </button>

      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 bg-rock-950/50" onClick={() => setOpen(false)} />
      )}

      {/* Panel */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-lift transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-rock-100 px-6 py-4">
          <h2 className="font-display text-xl font-semibold uppercase tracking-wide">
            🧰 {t("build.title")}
            <span className="ml-2 text-sm font-normal text-rock-400">
              {rows.length} {t("build.items")}
            </span>
          </h2>
          <button onClick={() => setOpen(false)} className="rounded-lg p-2 hover:bg-rock-100" aria-label={t("common.close")}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {rows.length === 0 ? (
            <p className="py-16 text-center text-sm text-rock-400">{t("build.empty")}</p>
          ) : (
            <ul className="space-y-3">
              {rows.map((r) => (
                <li key={r.key} className="flex items-start gap-3 rounded-xl border border-rock-100 p-4">
                  <div className="h-14 w-16 shrink-0 overflow-hidden rounded-lg bg-rock-100">
                    <MediaImage path={`${r.ref.kind}:${r.ref.id}`} fallback={r.image} alt={r.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-rock-400">
                      {r.category} · {r.brand}
                    </p>
                    <p className="mt-1 text-sm font-bold text-rock-900">{r.name}</p>
                    <p className="mt-0.5 line-clamp-1 text-xs text-rock-500">{r.spec}</p>
                    <p className="mt-1 text-xs font-semibold text-orange-600">{r.price}</p>
                  </div>
                  <button
                    onClick={() => remove(r.ref.kind, r.ref.id)}
                    className="shrink-0 rounded-lg p-1.5 text-rock-400 hover:bg-red-50 hover:text-red-500"
                    aria-label="移除"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 6l12 12M18 6L6 18" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {rows.length > 0 && (
          <div className="space-y-2.5 border-t border-rock-100 px-6 py-4">
            <button
              onClick={() => setCompareOpen(true)}
              disabled={rows.length < 2}
              className={`w-full rounded-full py-2.5 text-sm font-bold transition ${
                rows.length >= 2
                  ? "bg-teal-600 text-white hover:bg-teal-500"
                  : "cursor-not-allowed bg-rock-100 text-rock-400"
              }`}
            >
              {rows.length >= 2 ? `⇄ ${t("build.compare")}` : `⇄ ${t("build.compareNeed")}`}
            </button>
            <div className="flex gap-3">
              <button onClick={exportJson} className="btn-primary flex-1 justify-center !py-2.5">
                {t("build.export")}
              </button>
              <button onClick={clear} className="btn-ghost !py-2.5">
                {t("build.clear")}
              </button>
            </div>
          </div>
        )}
      </aside>

      {/* ========== 规格对比弹窗 ========== */}
      {compareOpen && rows.length >= 2 && (
        <>
          <div className="fixed inset-0 z-[70] bg-rock-950/60" onClick={() => setCompareOpen(false)} />
          <div className="fixed inset-0 z-[71] flex items-center justify-center p-4">
            <div className="flex max-h-[85vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-lift">
              <div className="flex items-center justify-between border-b border-rock-100 px-6 py-4">
                <h3 className="font-display text-xl font-semibold uppercase tracking-wide">
                  ⇄ {t("build.compare")}
                  <span className="ml-2 text-sm font-normal text-rock-400">
                    {rows.length} {t("build.items")}
                  </span>
                </h3>
                <button onClick={() => setCompareOpen(false)} className="rounded-lg p-2 hover:bg-rock-100" aria-label={t("common.close")}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 overflow-auto p-6">
                <table className="w-full min-w-[560px] border-collapse text-sm">
                  <thead>
                    <tr>
                      <th className="w-24 align-bottom pb-4 text-left"></th>
                      {rows.map((r) => (
                        <th key={r.key} className="min-w-[130px] align-bottom pb-4 text-center">
                          <div className="mx-auto h-20 w-full max-w-[120px] overflow-hidden rounded-lg bg-rock-100">
                            <MediaImage path={`${r.ref.kind}:${r.ref.id}`} fallback={r.image} alt={r.name} className="h-full w-full object-cover" />
                          </div>
                          <p className="mt-2 px-1 text-xs font-extrabold leading-4 text-rock-900">{r.name}</p>
                          <p className="px-1 font-mono text-[10px] text-rock-400">{r.category}</p>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {compareRows.map((row, ri) => (
                      <tr key={row.key} className={ri % 2 ? "bg-rock-50/60" : ""}>
                        <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider text-rock-400">
                          {row.label}
                        </th>
                        {rows.map((r) => (
                          <td key={r.key} className="px-3 py-3 text-center text-xs text-rock-700">
                            {row.get(r)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex gap-3 border-t border-rock-100 px-6 py-4">
                <button onClick={exportJson} className="btn-primary flex-1 justify-center !py-2.5">
                  {t("build.export")}
                </button>
                <button onClick={() => setCompareOpen(false)} className="btn-ghost !py-2.5">
                  {t("common.close")}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
