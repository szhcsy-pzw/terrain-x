"use client";

import OutdoorCard from "@/components/OutdoorCard";
import PageTitle from "@/components/PageTitle";
import { useCatalog } from "@/lib/store";
import { useI18n } from "@/lib/i18n";

export default function OutdoorSeriesPage({
  series,
  kicker,
  titleKey,
  subKey,
}: {
  series: "hiking" | "camping";
  kicker: string;
  titleKey: "page.hiking.title" | "page.camping.title";
  subKey: "page.hiking.sub" | "page.camping.sub";
}) {
  const data = useCatalog();
  const { t } = useI18n();
  const list = data[series].filter((p) => !p.hidden);

  return (
    <>
      <PageTitle title={t(titleKey)} />
      <section className="bg-rock-950 py-20 text-white">
        <div className="container-x">
          <p className="kicker !text-teal-400">{kicker}</p>
          <h1 className="h-display mt-4 text-5xl sm:text-6xl">{t(titleKey)}</h1>
          <p className="mt-4 max-w-2xl text-rock-300">{t(subKey)}</p>
        </div>
      </section>

      <section className="container-x mt-12">
        <p className="font-mono text-xs tracking-wider text-rock-400">
          // {list.length} {t("outdoor.items")}
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <OutdoorCard key={p.id} item={p} />
          ))}
        </div>
      </section>
    </>
  );
}
