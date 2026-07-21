"use client";

import Link from "next/link";
import PageTitle from "@/components/PageTitle";
import { faqs, faqsEn } from "@/lib/site-config";
import { useCatalog } from "@/lib/store";
import { useI18n } from "@/lib/i18n";
import { useState } from "react";

export default function SupportPage() {
  const { settings } = useCatalog();
  const { t, lang } = useI18n();
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const faqList = lang === "en" ? faqsEn : faqs;

  return (
    <>
      <PageTitle title={t("page.support.title")} />
      <section className="bg-rock-950 py-20 text-white">
        <div className="container-x">
          <p className="kicker !text-orange-500">Support</p>
          <h1 className="h-display mt-4 text-5xl sm:text-6xl">{t("page.support.title")}</h1>
          <p className="mt-4 max-w-2xl text-rock-300">{t("page.support.sub")}</p>
        </div>
      </section>

      {/* 三张服务卡 */}
      <section className="container-x mt-12 grid gap-5 md:grid-cols-3">
        <Link href="/manual/" className="card group p-7">
          <p className="text-3xl">📖</p>
          <h2 className="mt-4 text-lg font-extrabold text-rock-950 group-hover:text-orange-600">{t("support.manual")}</h2>
          <p className="mt-2 text-sm leading-6 text-rock-500">{t("support.manualDesc")}</p>
          <span className="mt-4 inline-block text-sm font-bold text-orange-600">{t("common.learnMore")} →</span>
        </Link>
        <Link href="/bike-parts/" className="card group p-7">
          <p className="text-3xl">🪪</p>
          <h2 className="mt-4 text-lg font-extrabold text-rock-950 group-hover:text-orange-600">{t("support.passport")}</h2>
          <p className="mt-2 text-sm leading-6 text-rock-500">{t("support.passportDesc")}</p>
          <span className="mt-4 inline-block text-sm font-bold text-orange-600">{t("common.learnMore")} →</span>
        </Link>
        <Link href="/dealers/" className="card group p-7">
          <p className="text-3xl">📍</p>
          <h2 className="mt-4 text-lg font-extrabold text-rock-950 group-hover:text-orange-600">{t("support.dealers")}</h2>
          <p className="mt-2 text-sm leading-6 text-rock-500">{t("support.dealersDesc")}</p>
          <span className="mt-4 inline-block text-sm font-bold text-orange-600">{t("common.learnMore")} →</span>
        </Link>
      </section>

      {/* FAQ */}
      <section className="container-x mt-20">
        <p className="kicker">FAQ</p>
        <h2 className="h-display mt-3 text-4xl">{t("support.faq")}</h2>
        <div className="mt-8 divide-y divide-rock-100 rounded-2xl bg-white shadow-card ring-1 ring-rock-950/5">
          {faqList.map((f, i) => (
            <div key={i}>
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="flex w-full items-start justify-between px-6 py-5 text-left"
              >
                <span className="font-bold text-rock-900">{f.q}</span>
                <span className={`ml-4 mt-0.5 shrink-0 text-orange-500 transition-transform ${openIdx === i ? "rotate-45" : ""}`}>
                  ＋
                </span>
              </button>
              {openIdx === i && (
                <p className="px-6 pb-5 text-sm leading-6 text-rock-600">{f.a}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 联系方式 */}
      <section className="container-x mt-20 grid gap-5 md:grid-cols-3">
        <div className="card p-6">
          <p className="label">{t("support.email")}</p>
          <a href="mailto:support@sando.bike" className="font-mono font-bold text-orange-600 hover:underline">
            support@sando.bike
          </a>
        </div>
        <div className="card p-6">
          <p className="label">{t("support.website")}</p>
          <a href="https://terrainx.cn" className="font-mono font-bold text-orange-600 hover:underline">
            terrainx.cn
          </a>
        </div>
        <div className="card p-6">
          <p className="label">{t("support.phone")}</p>
          <a href={`tel:${settings.hq.phone}`} className="font-mono font-bold text-orange-600 hover:underline">
            {settings.hq.phone}
          </a>
        </div>
      </section>
    </>
  );
}
