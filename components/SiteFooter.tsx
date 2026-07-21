"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { useCatalog } from "@/lib/store";
import MediaImage from "./MediaImage";

export default function SiteFooter() {
  const { t, lang } = useI18n();
  const { settings } = useCatalog();
  // 总部信息：英文模式用翻译，中文模式显示后台可编辑的内容
  const hqName = lang === "en" ? t("footer.hqName") : settings.hq.name;
  const hqAddr = lang === "en" ? t("footer.hqAddr") : settings.hq.addr;

  return (
    <footer className="mt-24 bg-rock-950 text-rock-300">
      <div className="container-x grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <MediaImage path="assets/logo/sando-logo.png" alt="SANDO × terrain-x" className="h-11 w-auto" />
          <address className="mt-5 text-sm not-italic leading-6 text-rock-400">
            <b className="text-rock-200">{hqName}</b>
            <br />
            {hqAddr}
            <br />
            <a href={`tel:${settings.hq.phone}`} className="hover:text-white">{settings.hq.phone}</a>
            {" · "}
            <a href={`mailto:${settings.hq.email}`} className="hover:text-white">{settings.hq.email}</a>
          </address>
        </div>
        <div>
          <h3 className="text-sm font-bold text-white">{t("footer.products")}</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link className="hover:text-white" href="/bikes/">SANDO {t("nav.bikes")}</Link></li>
            <li><Link className="hover:text-white" href="/parts/">SANDO {t("nav.parts")}</Link></li>
            <li><Link className="hover:text-white" href="/hiking/">terrain-x {t("nav.hiking")}</Link></li>
            <li><Link className="hover:text-white" href="/camping/">terrain-x {t("nav.camping")}</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-bold text-white">{t("footer.support")}</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link className="hover:text-white" href="/bike-parts/">{t("footer.passport")}</Link></li>
            <li><Link className="hover:text-white" href="/manual/">{t("footer.manual")}</Link></li>
            <li><Link className="hover:text-white" href="/dealers/">{t("nav.dealers")}</Link></li>
            <li><Link className="hover:text-white" href="/support/">{t("nav.support")}</Link></li>
            <li><Link className="hover:text-white" href="/admin/">{t("nav.admin")}</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center font-mono text-xs tracking-wider text-rock-500">
        {t("footer.tagline")}
      </div>
    </footer>
  );
}
