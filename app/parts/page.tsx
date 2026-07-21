"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import PageTitle from "@/components/PageTitle";
import MediaImage from "@/components/MediaImage";
import { useCatalog } from "@/lib/store";
import { componentGroups, hidePartsPrices } from "@/lib/catalog";
import { useI18n } from "@/lib/i18n";
import { useDrawer } from "@/lib/drawer";
import BuildButton from "@/components/BuildButton";

function PartsInner() {
  const { components } = useCatalog();
  const params = useSearchParams();
  const model = params.get("model");
  const [group, setGroup] = useState<string>("all");
  const { t, pick } = useI18n();
  const drawer = useDrawer();

  const filtered = useMemo(() => {
    let list = components.filter((p) => !p.hidden);
    if (group !== "all") list = list.filter((p) => p.g === group);
    if (model) {
      const m = model.toUpperCase();
      list = list.filter((p) => p.fit.toUpperCase().includes(m) || p.fit.includes("全系"));
    }
    return list;
  }, [components, group, model]);

  return (
    <>
      <PageTitle title={t("page.parts.title")} />
      <section className="bg-rock-950 py-20 text-white">
        <div className="container-x">
          <p className="kicker !text-orange-500">SANDO · Components</p>
          <h1 className="h-display mt-4 text-5xl sm:text-6xl">{t("page.parts.title")}</h1>
          <p className="mt-4 max-w-2xl text-rock-300">
            {t("page.parts.sub")}
            {model && (
              <span className="ml-2 rounded-full bg-orange-500/20 px-3 py-1 text-sm font-semibold text-orange-400 ring-1 ring-orange-500/40">
                {t("parts.filterModel")} {model.toUpperCase()} · <a href="/parts/" className="underline">{t("parts.clearFilter")}</a>
              </span>
            )}
          </p>
        </div>
      </section>

      <section className="container-x mt-12">
        {/* 系统分组筛选 */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setGroup("all")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              group === "all" ? "bg-rock-900 text-white" : "bg-white text-rock-600 ring-1 ring-rock-200 hover:ring-orange-400"
            }`}
          >
            {t("parts.allGroups")}
          </button>
          {componentGroups.map((g) => (
            <button
              key={g.id}
              onClick={() => setGroup(g.id)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                group === g.id ? "bg-rock-900 text-white" : "bg-white text-rock-600 ring-1 ring-rock-200 hover:ring-orange-400"
              }`}
            >
              {g.name}
            </button>
          ))}
        </div>

        <p className="mt-8 font-mono text-xs tracking-wider text-rock-400">
          // {filtered.length} {t("parts.countNote")}
        </p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((part) => {
            return (
              <article
                key={part.id}
                onClick={() => drawer.openDrawer({ kind: "component", data: part })}
                className="card group flex cursor-pointer flex-col overflow-hidden"
              >
                <MediaImage path={`part:${part.id}`} fallback={`assets/parts/${part.g}.svg`} alt={part.name} className="h-32 w-full object-cover" />
                <div className="flex flex-1 flex-col p-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-rock-400">{part.brand}</p>
                  <h3 className="mt-1.5 font-extrabold text-rock-950 group-hover:text-orange-600">{pick(part, "name")}</h3>
                  <p className="mt-1.5 text-xs leading-5 text-rock-500">{part.spec}</p>
                  <div className="mt-auto flex items-center justify-between border-t border-dashed border-rock-100 pt-3">
                    <span className="text-xs text-rock-400">
                      {t("common.fit")}: <b className="text-rock-700">{part.fit}</b>
                    </span>
                    {!hidePartsPrices && part.price !== "—" && (
                      <span className="text-xs font-bold text-rock-700">{part.price}</span>
                    )}
                  </div>
                  <div onClick={(e) => e.stopPropagation()} className="mt-3">
                    <BuildButton kind="part" id={part.id} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default function PartsPage() {
  return (
    <Suspense>
      <PartsInner />
    </Suspense>
  );
}
