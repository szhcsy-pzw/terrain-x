"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import MediaImage from "./MediaImage";

const nav = [
  { href: "/", key: "nav.home" as const },
  { href: "/bikes/", key: "nav.bikes" as const },
  { href: "/parts/", key: "nav.parts" as const },
  { href: "/outdoor/", key: "nav.outdoor" as const },
  { href: "/dealers/", key: "nav.dealers" as const },
  { href: "/support/", key: "nav.support" as const },
  { href: "/about/", key: "nav.about" as const },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { lang, toggle, t } = useI18n();

  return (
    <header className="sticky top-0 z-50 border-b border-rock-100 bg-white/90 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <MediaImage path="assets/logo/sando-logo.png" alt="SANDO × terrain-x" className="h-10 w-auto object-contain" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  active ? "bg-rock-900 text-white" : "text-rock-600 hover:bg-rock-100 hover:text-rock-900"
                }`}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            className="rounded-full border border-rock-200 px-3.5 py-1.5 font-mono text-xs font-semibold text-rock-700 transition hover:border-orange-500 hover:text-orange-600"
            aria-label="切换语言 / Switch language"
          >
            {lang === "cn" ? "EN" : "中"}
          </button>
          <Link href="/admin/" className="hidden rounded-full border border-rock-200 px-4 py-2 text-sm font-semibold text-rock-700 transition hover:border-orange-500 hover:text-orange-600 sm:block">
            {t("nav.admin")}
          </Link>
          <button
            className="rounded-lg p-2 text-rock-700 hover:bg-rock-100 lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label="菜单"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-rock-100 bg-white px-5 py-3 lg:hidden">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-rock-700 hover:bg-rock-100"
            >
              {t(item.key)}
            </Link>
          ))}
          <Link href="/admin/" onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-orange-600">
            {t("nav.admin")}
          </Link>
        </nav>
      )}
    </header>
  );
}
