"use client";

// 零件护照：车型 + 尺码切换，BOM 全透明（对应旧站 bike-parts.html）
// 行可点击 → 侧滑抽屉查看零件详情

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import PageTitle from "@/components/PageTitle";
import { useCatalog } from "@/lib/store";
import { bikeBOM, hidePartsPrices } from "@/lib/catalog";
import { useI18n } from "@/lib/i18n";
import { useDrawer } from "@/lib/drawer";

function PassportInner() {
  const { bikes, components } = useCatalog();
  const params = useSearchParams();
  const { t, pick, lang } = useI18n();
  const drawer = useDrawer();

  const visible = bikes.filter((b) => !b.hidden);
  const initialModel = params.get("model") ?? visible[0]?.id ?? "x1";
  const [model, setModel] = useState(initialModel);
  const [size, setSize] = useState<string>("");

  const bike = visible.find((b) => b.id === model) ?? visible[0];
  const bom = useMemo(() => bikeBOM[bike?.id ?? ""] ?? [], [bike]);
  const sizeRow = bike?.sizes.find((s) => s.code === size);

  const totalCost = useMemo(() => {
    return bom.reduce((sum, row) => {
      const n = Number(row.cost.replace(/[¥,]/g, ""));
      return sum + (Number.isFinite(n) ? n : 0);
    }, 0);
  }, [bom]);

  if (!bike) return null;

  return (
    <>
      <PageTitle title={t("page.passport.title")} />
      <section className="bg-rock-950 py-20 text-white">
        <div className="container-x">
          <p className="kicker !text-orange-500">Parts Passport · 透明 BOM</p>
          <h1 className="h-display mt-4 text-5xl sm:text-6xl">{t("page.passport.title")}</h1>
          <p className="mt-4 max-w-2xl text-rock-300">{t("page.passport.sub")}</p>
        </div>
      </section>

      <section className="container-x mt-12">
        {/* 车型切换 */}
        <div className="flex flex-wrap gap-2">
          {visible.map((b) => (
            <button
              key={b.id}
              onClick={() => { setModel(b.id); setSize(""); }}
              className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${
                model === b.id ? "bg-orange-500 text-white" : "bg-white text-rock-700 ring-1 ring-rock-200 hover:ring-orange-400"
              }`}
            >
              {b.code}
            </button>
          ))}
        </div>

        {/* 尺码选择 */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-rock-500">{t("passport.size")}</span>
          {bike.sizes.map((s) => (
            <button
              key={s.code}
              onClick={() => setSize(size === s.code ? "" : s.code)}
              className={`rounded-lg px-4 py-2 font-mono text-sm font-bold transition ${
                size === s.code ? "bg-rock-900 text-white" : "bg-white text-rock-600 ring-1 ring-rock-200 hover:ring-rock-400"
              }`}
            >
              {s.code}
            </button>
          ))}
          {sizeRow && (
            <span className="ml-2 text-sm text-rock-500">
              {t("passport.height")} {sizeRow.h} · {t("passport.inseam")} {sizeRow.inseam} · {t("passport.frameNo")}{" "}
              <code className="rounded bg-rock-100 px-1.5 py-0.5 font-mono text-xs">{sizeRow.frameSku}</code>
            </span>
          )}
        </div>

        {/* 汇总卡 */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="card p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-rock-400">{pick(bike, "name")}</p>
            <p className="mt-1.5 text-xl font-extrabold text-rock-950">{pick(bike, "sub")}</p>
          </div>
          <div className="card p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-rock-400">{t("passport.bikePrice")}</p>
            <p className="mt-1.5 text-xl font-extrabold text-orange-600">{bike.price} <span className="text-sm font-normal text-rock-400">{t("common.from")}</span></p>
          </div>
          <div className="card p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-rock-400">{t("passport.bomTotal")}</p>
            <p className="mt-1.5 text-xl font-extrabold text-rock-950">¥{totalCost.toLocaleString()}</p>
            <p className="text-xs text-rock-400">{bom.length} {t("passport.bomNote")}</p>
          </div>
        </div>

        {/* BOM 表格 */}
        <div className="mt-8 overflow-x-auto rounded-2xl bg-white shadow-card ring-1 ring-rock-950/5">
          <table className="w-full min-w-[900px] text-sm">
            <thead>
              <tr className="border-b border-rock-100 bg-rock-50 text-left text-xs uppercase tracking-wider text-rock-500">
                <th className="px-4 py-3.5">{t("passport.colNo")}</th>
                <th className="px-4 py-3.5">{t("passport.colPart")}</th>
                <th className="px-4 py-3.5">{t("passport.colSpec")}</th>
                <th className="px-4 py-3.5">{t("passport.colBrand")}</th>
                <th className="px-4 py-3.5">{t("passport.colCraft")}</th>
                <th className="px-4 py-3.5">{t("passport.colSupplier")}</th>
                {!hidePartsPrices && <th className="px-4 py-3.5">{t("passport.colCost")}</th>}
              </tr>
            </thead>
            <tbody>
              {bom.map((row) => {
                const linked = row.cid ? components.find((c) => c.id === row.cid) : null;
                const rowEn = lang === "en" && row.en;
                return (
                  <tr
                    key={row.no}
                    onClick={() => linked && drawer.openDrawer({ kind: "component", data: linked })}
                    className={`border-b border-rock-50 last:border-0 hover:bg-orange-50/60 ${linked ? "cursor-pointer" : ""}`}
                  >
                    <td className="px-4 py-3 font-mono text-xs text-rock-400">{row.no}</td>
                    <td className="px-4 py-3 font-bold text-rock-900">
                      {rowEn && row.en?.part ? row.en.part : row.part}
                      {linked && <span className="ml-1.5 text-xs font-normal text-orange-500">→</span>}
                    </td>
                    <td className="px-4 py-3 text-rock-600">{rowEn && row.en?.spec ? row.en.spec : row.spec}</td>
                    <td className="px-4 py-3 text-rock-600">{rowEn && row.en?.brand ? row.en.brand : row.brand}</td>
                    <td className="px-4 py-3 text-xs text-rock-500">{rowEn && row.en?.craft ? row.en.craft : row.craft}</td>
                    <td className="px-4 py-3 text-xs text-rock-500">{rowEn && row.en?.supplier ? row.en.supplier : row.supplier}</td>
                    {!hidePartsPrices && (
                      <td className="px-4 py-3 font-mono text-xs font-bold text-rock-800">{row.cost}</td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-xs leading-5 text-rock-400">{t("passport.costDisclaimer")}</p>
      </section>
    </>
  );
}

export default function BikePartsPage() {
  return (
    <Suspense>
      <PassportInner />
    </Suspense>
  );
}
