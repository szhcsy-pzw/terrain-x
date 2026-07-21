"use client";

// 统一图片组件：
//   path  = 产品 key（bike:x1 / part:frame-01 / out:h1）或通用路径（assets/...）
//   fallback = 当 key 无上传图时用的默认路径（如配件回退到系统图）
// 优先读后台上传的图（base64），否则用 fallback / 默认路径

import { useMedia } from "@/lib/media";

export default function MediaImage({
  path,
  fallback,
  alt,
  className,
}: {
  path: string;
  fallback?: string;
  alt: string;
  className?: string;
}) {
  const src = useMedia(path, fallback);
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className={className} />;
}
