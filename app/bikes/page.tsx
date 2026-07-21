"use client";

import Link from "next/link";
import PageTitle from "@/components/PageTitle";
import MediaImage from "@/components/MediaImage";
import { geometryPoints, geometryPointsEn } from "@/lib/site-config";
import { useCatalog } from "@/lib/store";
import { useI18n } from "@/lib/i18n";
import { useDrawer } from "@/lib/drawer";

export default function BikesPage() {
  const { bikes } = useCatalog();
  const { t, lang, specKey, pick, pickArr, pickSpecs } = useI18n();
  const drawer = useDrawer();
  const visible = bikes.filter((b) => !b.hidden);
  const geoPoints = lang === "en" ? geometryPointsEn : geometryPoints;

  return (
    <>
      <PageTitle title={t("page.bikes.title")} />
      <section className="bg-rock-950 py-20 text-white">
        <div className="container-x">
          <p className="kicker !text-orange-500">SANDO · Mountain Bikes</p>
          <h1 className="h-display mt-4 text-5xl sm:text-6xl">{t("page.bikes.title")}</h1>
          <p className="mt-4 max-w-2xl text-rock-300">{t("page.bikes.sub")}</p>
        </div>
      </section>

      {/* 车型详情 */}
      <section className="container-x mt-16 space-y-10">
        {visible.map((bike) => (
          <article key={bike.id} id={bike.id} className="card scroll-mt-24 overflow-hidden lg:grid lg:grid-cols-5">
            <div
              className="relative cursor-pointer bg-rock-100 lg:col-span-2"
              onClick={() => drawer.openDrawer({ kind: "bike", data: bike })}
            >
              <MediaImage path={`bike:${bike.id}`} fallback={bike.image} alt={bike.name} className="h-64 w-full object-cover lg:h-full" />
              <span className="absolute left-5 top-5 rounded-full bg-rock-950/85 px-3 py-1 font-mono text-[11px] tracking-[0.18em] text-white">
                {bike.level}
              </span>
            </div>
            <div className="p-7 lg:col-span-3 lg:p-9">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-xs tracking-[0.2em] text-rock-400">{bike.code}</p>
                  <h2 className="mt-1 text-2xl font-extrabold text-rock-950">{pick(bike, "name")}</h2>
                  <p className="mt-1 text-sm text-rock-500">{pick(bike, "sub")}</p>
                </div>
                <p className="text-right">
                  <span className="text-3xl font-black text-orange-600">{bike.price}</span>
                  <span className="block text-xs text-rock-400">{t("common.from")}</span>
                </p>
              </div>
              <p className="mt-4 text-sm leading-6 text-rock-600">{pick(bike, "intro")}</p>
              <ul className="mt-4 grid gap-2 text-sm text-rock-700 sm:grid-cols-2">
                {pickArr(bike, "features").map((f, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                    {f}
                  </li>
                ))}
              </ul>
              <dl className="mt-6 grid gap-x-8 gap-y-3 border-t border-dashed border-rock-200 pt-5 text-sm sm:grid-cols-2">
                {pickSpecs(bike).map((s, i) => (
                  <div key={i} className="flex justify-between gap-4">
                    <dt className="shrink-0 text-rock-400">{specKey(s.k)}</dt>
                    <dd className="text-right font-medium text-rock-800">{s.v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link href={`/bike-parts/?model=${bike.id}`} className="btn-primary">
                  {t("bikes.passportBtn")}
                </Link>
                <Link href={`/parts/?model=${bike.id}`} className="btn-ghost">
                  {t("bikes.partsBtn")}
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* 山度几何 */}
      <section className="mt-24 bg-rock-950 py-20 text-white">
        <div className="container-x">
          <p className="kicker !text-orange-500">SANDO Geometry™</p>
          <h2 className="h-display mt-4 text-4xl sm:text-5xl">{t("bikes.geometryTitle")}</h2>
          <p className="mt-4 max-w-2xl text-rock-300">{t("bikes.geometrySub")}</p>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {geoPoints.map((g) => (
              <div key={g.title} className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 transition hover:bg-white/10">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-rock-400">Geometry</p>
                <h3 className="mt-2 text-lg font-extrabold">{g.title}</h3>
                <p className="mt-1 font-mono text-sm font-bold text-orange-400">{g.value}</p>
                <p className="mt-3 text-sm leading-6 text-rock-300">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 尺码表 */}
      <section id="sizes" className="container-x mt-24 scroll-mt-24">
        <p className="kicker">Size × Part No.</p>
        <h2 className="h-display mt-3 text-4xl sm:text-5xl">{t("bikes.sizesTitle")}</h2>
        <div className="mt-10 space-y-12">
          {visible.map((bike) => (
            <div key={bike.id}>
              <h3 className="mb-4 flex items-baseline gap-3 text-xl font-extrabold text-rock-900">
                <span className="font-mono text-sm font-bold text-orange-600">{bike.code}</span>
                {pick(bike, "name")}
              </h3>
              <div className="overflow-x-auto rounded-2xl bg-white shadow-card ring-1 ring-rock-950/5">
                <table className="w-full min-w-[880px] text-sm">
                  <thead>
                    <tr className="border-b border-rock-100 bg-rock-50 text-left text-xs uppercase tracking-wider text-rock-500">
                      <th className="px-4 py-3.5">Size</th>
                      <th className="px-4 py-3.5">{t("passport.height")}</th>
                      <th className="px-4 py-3.5">{t("passport.inseam")}</th>
                      <th className="px-4 py-3.5">{t("passport.frameNo")}</th>
                      <th className="px-4 py-3.5">Crank</th>
                      <th className="px-4 py-3.5">Dropper</th>
                      <th className="px-4 py-3.5">Stem</th>
                      <th className="px-4 py-3.5">Bar</th>
                      <th className="px-4 py-3.5">Rotor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bike.sizes.map((row) => (
                      <tr key={row.code} className="border-b border-rock-50 last:border-0 hover:bg-rock-50/60">
                        <td className="px-4 py-3.5 font-extrabold text-rock-900">{row.code}</td>
                        <td className="px-4 py-3.5 text-rock-600">{row.h}</td>
                        <td className="px-4 py-3.5 text-rock-600">{row.inseam}</td>
                        <td className="px-4 py-3.5 font-mono text-xs font-semibold text-rock-800">{row.frameSku}</td>
                        <td className="px-4 py-3.5 text-rock-600">{row.crank} mm</td>
                        <td className="px-4 py-3.5 text-rock-600">{row.dropper ? `${row.dropper}mm` : "—"}</td>
                        <td className="px-4 py-3.5 text-rock-600">{row.stem} mm</td>
                        <td className="px-4 py-3.5 text-rock-600">{row.bar} mm</td>
                        <td className="px-4 py-3.5 text-rock-600">{row.rotor} mm</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
