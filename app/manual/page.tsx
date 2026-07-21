"use client";

import { useI18n } from "@/lib/i18n";

export default function ManualPage() {
  const { t, lang } = useI18n();

  return (
    <>
      <section className="bg-rock-950 py-16 text-white">
        <div className="container-x flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="kicker !text-orange-500">Owner&apos;s Manual · V1.0</p>
            <h1 className="h-display mt-4 text-5xl">{t("support.manual")}</h1>
            <p className="mt-3 max-w-2xl text-rock-300">
              {lang === "en"
                ? "Compliant with EN 14764 / 14766 / 14781 — pre-ride checks, safe riding, sizing, maintenance intervals and torque specs."
                : "符合 EN 14764 / 14766 / 14781 标准，涵盖出发前检查、安全骑行、尺寸适配、保养周期与扭矩规格。"}
            </p>
          </div>
          <a href="/sando-bike-manual.pdf" download className="btn-primary">
            {t("manual.download")}
          </a>
        </div>
      </section>

      <section className="container-x mt-8">
        <div className="overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-rock-950/5">
          <iframe
            src="/sando-bike-manual.pdf"
            className="h-[80vh] w-full"
            title="SANDO 自行车使用手册"
          />
        </div>
        <p className="mt-4 text-center text-xs text-rock-400">
          {t("manual.fallback")}
          <a href="/sando-bike-manual.pdf" className="text-orange-600 underline" download>
            {t("manual.downloadLink")}
          </a>
          {t("manual.offline")}
        </p>
      </section>
    </>
  );
}
