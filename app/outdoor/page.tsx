"use client";

import Link from "next/link";
import PageTitle from "@/components/PageTitle";
import MediaImage from "@/components/MediaImage";
import OutdoorCard from "@/components/OutdoorCard";
import { useCatalog } from "@/lib/store";
import { useI18n } from "@/lib/i18n";

export default function OutdoorPage() {
  const { hiking, camping } = useCatalog();
  const { t } = useI18n();
  const hikingList = hiking.filter((p) => !p.hidden);
  const campingList = camping.filter((p) => !p.hidden);

  return (
    <>
      <PageTitle title={t("nav.outdoor")} />
      <section className="relative overflow-hidden bg-rock-950 py-20 text-white">
        <MediaImage path="assets/hero/outdoor.svg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-r from-rock-950/90 to-rock-950/40" />
        <div className="container-x relative">
          <p className="kicker !text-teal-400">terrain-x · Outdoor</p>
          <h1 className="h-display mt-4 text-5xl sm:text-6xl">{t("nav.outdoor")}</h1>
          <p className="mt-4 max-w-2xl text-rock-300">{t("page.outdoor.sub")}</p>
        </div>
      </section>

      {/* 两个系列入口 */}
      <section className="container-x mt-14 grid gap-6 md:grid-cols-2">
        {[
          { href: "/hiking/", no: "01", title: t("page.hiking.title"), desc: t("page.hiking.sub"), meta: `${hikingList.length} ${t("outdoor.items")}` },
          { href: "/camping/", no: "02", title: t("page.camping.title"), desc: t("page.camping.sub"), meta: `${campingList.length} ${t("outdoor.items")}` },
        ].map((s) => (
          <Link key={s.no} href={s.href} className="card group relative overflow-hidden p-8">
            <span className="absolute -right-3 -top-8 font-display text-[110px] font-semibold leading-none text-teal-50 transition group-hover:text-teal-100">
              {s.no}
            </span>
            <p className="kicker relative !text-teal-600">terrain-x</p>
            <h2 className="relative mt-3 text-2xl font-extrabold text-rock-950">{s.title}</h2>
            <p className="relative mt-3 max-w-sm text-sm leading-6 text-rock-500">{s.desc}</p>
            <p className="relative mt-5 font-mono text-xs tracking-wider text-rock-400">{s.meta}</p>
            <span className="relative mt-4 inline-block text-sm font-bold text-teal-600 underline-offset-4 group-hover:underline">
              {t("outdoor.all")}
            </span>
          </Link>
        ))}
      </section>

      {[
        { title: t("outdoor.hikingSeries"), sub: t("outdoor.hikingSub"), list: hikingList, href: "/hiking/" },
        { title: t("outdoor.campingSeries"), sub: t("outdoor.campingSub"), list: campingList, href: "/camping/" },
      ].map((sec) => (
        <section key={sec.title} className="container-x mt-20">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-extrabold text-rock-950">{sec.title}</h2>
              <p className="mt-1 text-sm text-rock-500">{sec.sub}</p>
            </div>
            <Link href={sec.href} className="btn-ghost">{t("outdoor.all")}</Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sec.list.map((p) => (
              <OutdoorCard key={p.id} item={p} />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
