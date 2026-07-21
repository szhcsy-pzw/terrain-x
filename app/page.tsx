"use client";

import Link from "next/link";
import BikeCard from "@/components/BikeCard";
import OutdoorCard from "@/components/OutdoorCard";
import MediaImage from "@/components/MediaImage";
import { useCatalog } from "@/lib/store";
import { useI18n } from "@/lib/i18n";
import { settingsEnFallback } from "@/lib/site-config";

export default function HomePage() {
  const { bikes, hiking, camping, settings } = useCatalog();
  const { t, lang } = useI18n();
  const isEn = lang === "en";
  // 户外精选：h1 徒步鞋 / h4 冲锋衣 / c1 隧道帐 / c4 营地灯
  const featured = ["h1", "h4", "c1", "c4"]
    .map((id) => [...hiking, ...camping].find((p) => p.id === id && !p.hidden))
    .filter(Boolean) as typeof hiking;
  const heroTitle1 = isEn ? settingsEnFallback.heroTitle1 : settings.heroTitle1;
  const heroTitle2 = isEn ? settingsEnFallback.heroTitle2 : settings.heroTitle2;
  const heroSubtitle = isEn ? settingsEnFallback.heroSubtitle : settings.heroSubtitle;
  const manualNote = isEn ? settingsEnFallback.manualNote : settings.manualNote;
  const communityNote = isEn ? settingsEnFallback.communityNote : settings.communityNote;
  const diffs = isEn ? settingsEnFallback.differentiators : settings.differentiators;

  const productLines = [
    {
      no: "01",
      brand: "SANDO",
      title: t("home.line1Title"),
      desc: t("home.line1Desc"),
      meta: [
        [t("home.line1M1"), "X1/T1/F1"],
        [t("home.line1M2"), "山度几何™"],
        [t("home.line1M3"), "SANDO"],
      ],
      href: "/bikes/",
    },
    {
      no: "02",
      brand: "SANDO",
      title: t("home.line2Title"),
      desc: t("home.line2Desc"),
      meta: [
        [t("home.line2M1"), "38"],
        [t("home.line2M2"), "7"],
        [t("home.line2M3"), "SANDO"],
      ],
      href: "/parts/",
    },
    {
      no: "03",
      brand: "terrain-x",
      title: t("home.line3Title"),
      desc: t("home.line3Desc"),
      meta: [
        [t("home.line3M1"), t("home.line3M1V")],
        [t("home.line3M2"), "12"],
        [t("home.line3M3"), "terrain-x"],
      ],
      href: "/outdoor/",
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-rock-950 text-white">
        <MediaImage path={settings.heroBg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-rock-950/90 via-rock-950/60 to-transparent" />
        <div className="container-x relative py-28 sm:py-36">
          <p className="kicker !text-orange-500">Outdoor Equipment · Dual Brand</p>
          <h1 className="h-display mt-6 text-6xl sm:text-8xl">
            {heroTitle1}
            <span className="mx-3 text-orange-500">·</span>
            {heroTitle2}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-rock-300 sm:text-lg">
            {heroSubtitle}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/bikes/" className="btn-primary">{t("home.ctaBikes")}</Link>
            <Link href="/outdoor/" className="btn-ghost !border-rock-500 !text-rock-200 hover:!border-orange-500 hover:!text-orange-400">
              {t("home.ctaOutdoor")}
            </Link>
          </div>
          <dl className="mt-16 grid max-w-2xl grid-cols-3 gap-6 border-t border-white/10 pt-8">
            {[["3", t("home.stat1")], ["3", t("home.stat2")], ["100%", t("home.stat3")]].map(([v, l]) => (
              <div key={l}>
                <dd className="font-display text-4xl font-semibold">{v}</dd>
                <dt className="mt-1 font-mono text-[11px] tracking-wider text-rock-400">{l}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 使用手册横幅 */}
      <section className="container-x mt-14">
        <Link href="/manual/" className="card flex flex-col items-start gap-4 !bg-rock-900 p-7 text-white sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="kicker !text-orange-400">Owner&apos;s Manual</p>
            <h2 className="mt-2 text-2xl font-extrabold">{t("home.manualTitle")}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-rock-300">{manualNote}</p>
          </div>
          <span className="shrink-0 rounded-full bg-white/10 px-5 py-2.5 font-mono text-xs tracking-wider text-rock-200 ring-1 ring-white/20">
            {t("home.manualChip")}
          </span>
        </Link>
      </section>

      {/* 三条产品线 */}
      <section className="container-x mt-20">
        <p className="kicker">Three Product Lines</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <h2 className="h-display max-w-xl text-4xl sm:text-5xl">{t("home.linesTitle")}</h2>
          <p className="max-w-md text-sm leading-6 text-rock-500">{t("home.linesSub")}</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {productLines.map((line) => (
            <Link key={line.no} href={line.href} className="card group relative overflow-hidden p-7">
              <span className="absolute -right-3 -top-8 font-display text-[110px] font-semibold leading-none text-rock-100 transition group-hover:text-orange-100">
                {line.no}
              </span>
              <p className="kicker relative">{line.brand}</p>
              <h3 className="relative mt-3 text-2xl font-extrabold text-rock-950">{line.title}</h3>
              <p className="relative mt-3 text-sm leading-6 text-rock-500">{line.desc}</p>
              <dl className="relative mt-6 space-y-2 border-t border-dashed border-rock-200 pt-4 text-sm">
                {line.meta.map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <dt className="text-rock-400">{k}</dt>
                    <dd className="font-semibold text-rock-800">{v}</dd>
                  </div>
                ))}
              </dl>
              <span className="relative mt-6 inline-block text-sm font-bold text-orange-600 underline-offset-4 group-hover:underline">
                {t("home.enter")}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 三款车型 */}
      <section className="container-x mt-24">
        <p className="kicker">SANDO Bikes</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <h2 className="h-display text-4xl sm:text-5xl">{t("home.bikesTitle")}</h2>
          <p className="max-w-md text-sm leading-6 text-rock-500">{t("home.bikesSub")}</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {bikes.filter((b) => !b.hidden).map((bike) => (
            <BikeCard key={bike.id} bike={bike} />
          ))}
        </div>
      </section>

      {/* 差异化 */}
      <section className="container-x mt-24">
        <p className="kicker">Differentiators</p>
        <h2 className="h-display mt-3 text-4xl sm:text-5xl">{t("home.diffTitle")}</h2>
        <p className="mt-3 text-sm text-rock-500">{t("home.diffSub")}</p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {diffs.map((d, i) => (
            <div key={i} className="card p-6">
              <span className="font-mono text-sm font-bold text-orange-500">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-lg font-extrabold text-rock-950">{d.title}</h3>
              <p className="mt-2 text-sm leading-6 text-rock-500">{d.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 rounded-2xl border border-dashed border-orange-300 bg-orange-50 p-6 text-center text-sm text-rock-700">
          {communityNote}
        </div>
      </section>

      {/* 户外精选 */}
      <section className="container-x mt-24">
        <p className="kicker !text-teal-600">terrain-x Outdoor</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <h2 className="h-display text-4xl sm:text-5xl">{t("home.outdoorTitle")}</h2>
          <Link href="/outdoor/" className="btn-ghost">{t("common.viewAll")} →</Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <OutdoorCard key={p.id} item={p} />
          ))}
        </div>
      </section>
    </>
  );
}
