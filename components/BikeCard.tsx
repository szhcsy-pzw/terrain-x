"use client";

import { Bike } from "@/lib/types";
import { useI18n } from "@/lib/i18n";
import { useDrawer } from "@/lib/drawer";
import MediaImage from "./MediaImage";
import BuildButton from "./BuildButton";

export default function BikeCard({ bike }: { bike: Bike }) {
  const { t, specKey, pick, pickSpecs } = useI18n();
  const drawer = useDrawer();
  const specs = pickSpecs(bike).slice(0, 4);

  return (
    <article
      onClick={() => drawer.openDrawer({ kind: "bike", data: bike })}
      className="card group cursor-pointer overflow-hidden"
    >
      <div className="relative bg-rock-100">
        <MediaImage path={`bike:${bike.id}`} fallback={bike.image} alt={bike.name} className="h-52 w-full object-cover" />
        <span className="absolute left-4 top-4 rounded-full bg-rock-950/85 px-3 py-1 font-mono text-[11px] tracking-[0.18em] text-white">
          {bike.level}
        </span>
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-extrabold text-rock-950">{pick(bike, "name")}</h3>
            <p className="mt-1 text-sm text-rock-500">{pick(bike, "sub")}</p>
          </div>
          <p className="shrink-0 text-right">
            <span className="text-2xl font-extrabold text-orange-600">{bike.price}</span>
            <span className="block text-xs text-rock-400">{t("common.from")}</span>
          </p>
        </div>
        <dl className="mt-5 space-y-2 border-t border-dashed border-rock-200 pt-4 text-sm">
          {specs.map((s, i) => (
            <div key={i} className="flex justify-between gap-4">
              <dt className="shrink-0 text-rock-400">{specKey(s.k)}</dt>
              <dd className="text-right font-medium text-rock-800">{s.v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-6 flex items-center justify-between gap-3">
          <div onClick={(e) => e.stopPropagation()} className="flex-1">
            <BuildButton kind="bike" id={bike.id} />
          </div>
          <span className="shrink-0 text-sm font-bold text-rock-800 underline-offset-4 transition group-hover:text-orange-600 group-hover:underline">
            {t("common.learnMore")} →
          </span>
        </div>
      </div>
    </article>
  );
}
