"use client";

// 统一的「加入选配清单」按钮：整车 / 配件 / 户外 三类产品共用

import { useBuild, BuildKind } from "@/lib/build";
import { useI18n } from "@/lib/i18n";

export default function BuildButton({
  kind,
  id,
  block = true,
}: {
  kind: BuildKind;
  id: string;
  block?: boolean;
}) {
  const build = useBuild();
  const { t } = useI18n();
  const inBuild = build.has(kind, id);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        build.toggleItem(kind, id);
      }}
      className={`${block ? "w-full" : ""} rounded-full py-3 text-sm font-bold transition ${
        inBuild
          ? "bg-teal-50 text-teal-700 ring-1 ring-teal-300"
          : "bg-orange-500 text-white hover:bg-orange-400"
      }`}
    >
      {inBuild ? t("common.inBuild") : t("common.addToBuild")}
    </button>
  );
}
