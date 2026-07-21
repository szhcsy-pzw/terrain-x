"use client";

import { useState } from "react";
import PageTitle from "@/components/PageTitle";
import { useCatalog, dealers } from "@/lib/store";
import { Dealer } from "@/lib/types";
import { useI18n } from "@/lib/i18n";

export default function DealersPage() {
  const { settings } = useCatalog();
  const { t, lang } = useI18n();
  const [active, setActive] = useState<Dealer | null>(null);
  const [keyword, setKeyword] = useState("");

  const list = dealers.filter(
    (d) => !keyword || d.name.includes(keyword) || d.en.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <>
      <PageTitle title={t("page.dealers.title")} />
      <section className="bg-rock-950 py-20 text-white">
        <div className="container-x">
          <p className="kicker !text-orange-500">Dealer Network</p>
          <h1 className="h-display mt-4 text-5xl sm:text-6xl">{t("page.dealers.title")}</h1>
          <p className="mt-4 max-w-2xl text-rock-300">
            {lang === "en"
              ? `Rolling out across ${dealers.length} cities — Shenzhen HQ is open. Store addresses coming soon; call us for service.`
              : `全国 ${dealers.length} 个城市布局中，深圳总部已开放服务。门店地址陆续上线，欢迎来电咨询。`}
          </p>
        </div>
      </section>

      <section className="container-x mt-12 grid gap-8 lg:grid-cols-3">
        {/* 总部卡片 */}
        <div className="lg:col-span-1">
          <div className="card sticky top-24 !bg-rock-900 p-7 text-white">
            <p className="kicker !text-orange-400">Headquarters</p>
            <h2 className="mt-3 text-xl font-extrabold">{settings.hq.name}</h2>
            <address className="mt-5 space-y-3 text-sm not-italic leading-6 text-rock-300">
              <p>{settings.hq.addr}</p>
              <p>
                <a href={`tel:${settings.hq.phone}`} className="font-mono text-lg font-bold text-orange-400 hover:text-orange-300">
                  {settings.hq.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${settings.hq.email}`} className="hover:text-white">{settings.hq.email}</a>
              </p>
            </address>
            <div className="mt-6 rounded-xl bg-white/5 p-4 text-xs leading-5 text-rock-400 ring-1 ring-white/10">
              {lang === "en"
                ? "Test rides, first check and Parts Passport lookup by appointment. For dealership inquiries, call or email us."
                : "整车试驾、首检保养、零件护照查询均可预约。经销合作请电话或邮件联系。"}
            </div>
          </div>
        </div>

        {/* 城市列表 */}
        <div className="lg:col-span-2">
          <input
            className="field !w-64"
            placeholder={t("dealers.search")}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {list.map((d) => (
              <button
                key={d.name}
                onClick={() => setActive(active?.name === d.name ? null : d)}
                className={`rounded-xl border p-4 text-left transition ${
                  active?.name === d.name
                    ? "border-orange-500 bg-orange-50"
                    : "border-rock-100 bg-white hover:border-orange-300"
                }`}
              >
                <p className="font-bold text-rock-900">{lang === "en" ? d.en : d.name}</p>
                <p className="font-mono text-xs text-rock-400">{lang === "en" ? d.name : d.en}</p>
                {active?.name === d.name && (
                  <p className="mt-2 border-t border-orange-200 pt-2 text-xs text-rock-500">{d.addr}</p>
                )}
              </button>
            ))}
          </div>
          <p className="mt-6 text-xs text-rock-400">{t("dealers.note")}</p>
        </div>
      </section>
    </>
  );
}
