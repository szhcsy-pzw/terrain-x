"use client";

// client component 无法导出 metadata，用此组件在挂载时设置 document.title
import { useEffect } from "react";

export default function PageTitle({ title }: { title: string }) {
  useEffect(() => {
    const prev = document.title;
    document.title = `${title} | SANDO × terrain-x`;
    return () => {
      document.title = prev;
    };
  }, [title]);
  return null;
}
