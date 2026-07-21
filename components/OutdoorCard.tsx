"use client";

import { OutdoorItem } from "@/lib/types";
import { useI18n } from "@/lib/i18n";
import { useDrawer } from "@/lib/drawer";
import MediaImage from "./MediaImage";
import BuildButton from "./BuildButton";

export default function OutdoorCard({ item }: { item: OutdoorItem }) {
  const { t, pick, pickArr } = useI18n();
  const drawer = useDrawer();
  const features = pickArr(item, "features");

  return (
    <article
      onClick={() =>
        drawer.openDrawer({ kind: "outdoor", data: item, series: item.id.startsWith("h") ? "hiking" : "camping" })
      }
      className="card group flex cursor-pointer flex-col overflow-hidden"
    >
      <div className="relative">
        <MediaImage path={`out:${item.id}`} fallback={item.image} alt={item.name} className="h-44 w-full object-cover" />
        <span className="absolute left-4 top-4 rounded-full bg-rock-950/85 px-3 py-1 text-[11px] font-semibold text-white">
          {pick(item, "tag")}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-extrabold text-rock-950 group-hover:text-teal-600">
          {item.icon} {pick(item, "name")}
        </h3>
        <p className="mt-1.5 text-xs leading-5 text-rock-500">{pick(item, "desc")}</p>
        {features.length > 0 && (
          <ul className="mt-3 space-y-1.5">
            {features.slice(0, 3).map((f, i) => (
              <li key={i} className="flex gap-2 text-xs text-rock-600">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-teal-500" />
                {f}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-auto flex items-center justify-between border-t border-dashed border-rock-100 pt-3">
          <span className="text-lg font-black text-orange-600">{item.price}</span>
          <span className="text-xs text-rock-400">{t("common.fit")} {item.fit}</span>
        </div>
        <div onClick={(e) => e.stopPropagation()} className="mt-3">
          <BuildButton kind="out" id={item.id} />
        </div>
      </div>
    </article>
  );
}
