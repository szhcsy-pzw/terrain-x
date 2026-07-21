"use client";

import Link from "next/link";
import PageTitle from "@/components/PageTitle";
import { geometryPoints, geometryPointsEn, settingsEnFallback } from "@/lib/site-config";
import { useCatalog } from "@/lib/store";
import { useI18n } from "@/lib/i18n";

const supplierWall = [
  "SR SUNTOUR", "L-TWOO", "KMC", "TEKTRO", "NOVATEC",
  "SUNSHINE", "MAXXIS", "CST", "KS", "PROWHEEL",
  "UNO", "VELO", "WELLGO", "NECO", "ODI",
];

export default function AboutPage() {
  const { settings } = useCatalog();
  const { t, lang } = useI18n();
  const isEn = lang === "en";
  const diffs = isEn ? settingsEnFallback.differentiators : settings.differentiators;
  const geoPoints = isEn ? geometryPointsEn : geometryPoints;
  const communityNote = isEn ? settingsEnFallback.communityNote : settings.communityNote;

  return (
    <>
      <PageTitle title={t("page.about.title")} />
      <section className="bg-rock-950 py-20 text-white">
        <div className="container-x">
          <p className="kicker !text-orange-500">About · Dual Brand</p>
          <h1 className="h-display mt-4 text-5xl sm:text-6xl">{t("page.about.title")}</h1>
          <p className="mt-4 max-w-2xl text-rock-300">{t("page.about.sub")}</p>
        </div>
      </section>

      <section className="container-x mt-16 grid gap-6 lg:grid-cols-2">
        <div className="card p-8">
          <p className="kicker">SANDO</p>
          <h2 className="mt-3 text-2xl font-extrabold text-rock-950">{t("about.sandoTitle")}</h2>
          <p className="mt-4 text-sm leading-7 text-rock-600">{t("about.sandoBody")}</p>
          <Link href="/bikes/" className="btn-primary mt-6">{t("about.sandoBtn")}</Link>
        </div>
        <div className="card p-8">
          <p className="kicker !text-teal-600">terrain-x</p>
          <h2 className="mt-3 text-2xl font-extrabold text-rock-950">{t("about.terraTitle")}</h2>
          <p className="mt-4 text-sm leading-7 text-rock-600">{t("about.terraBody")}</p>
          <Link href="/outdoor/" className="btn-primary mt-6">{t("about.terraBtn")}</Link>
        </div>
      </section>

      {/* 六大差异化 */}
      <section className="container-x mt-20">
        <p className="kicker">Differentiators</p>
        <h2 className="h-display mt-3 text-4xl">{t("about.diffTitle")}</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {diffs.map((d, i) => (
            <div key={i} className="card p-6">
              <span className="font-mono text-sm font-bold text-orange-500">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 font-extrabold text-rock-950">{d.title}</h3>
              <p className="mt-2 text-sm leading-6 text-rock-500">{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 合作品牌墙 */}
      <section className="container-x mt-20">
        <p className="kicker">Supplier Wall</p>
        <h2 className="h-display mt-3 text-4xl">{t("about.wallTitle")}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-rock-500">{t("about.wallSub")}</p>
        <div className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-5">
          {supplierWall.map((name) => (
            <div
              key={name}
              className="flex h-20 items-center justify-center rounded-xl bg-rock-900 px-3 text-center font-display text-sm font-semibold uppercase tracking-wider text-rock-200 transition hover:bg-rock-800 hover:text-orange-400"
            >
              {name}
            </div>
          ))}
        </div>
      </section>

      {/* 山度几何 */}
      <section className="container-x mt-20">
        <p className="kicker">SANDO Geometry™</p>
        <h2 className="h-display mt-3 text-4xl">{t("about.geoTitle")}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-rock-500">{t("about.geoSub")}</p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {geoPoints.map((g) => (
            <div key={g.title} className="card p-6">
              <h3 className="font-extrabold text-rock-950">{g.title}</h3>
              <p className="mt-1 font-mono text-sm font-bold text-orange-600">{g.value}</p>
              <p className="mt-3 text-sm leading-6 text-rock-500">{g.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x mt-20">
        <div className="rounded-2xl border border-dashed border-orange-300 bg-orange-50 p-8 text-center">
          <h2 className="text-xl font-extrabold text-rock-950">{t("about.communityTitle")}</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-rock-600">
            {communityNote}
          </p>
        </div>
      </section>
    </>
  );
}
