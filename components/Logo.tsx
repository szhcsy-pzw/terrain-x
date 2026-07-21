export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      {/* 山峰图形标 */}
      <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden>
        <path
          d="M3 26 L13 8 L19 18 L23 12 L29 26 Z"
          className={light ? "fill-sand-100" : "fill-pine-800"}
        />
        <path d="M13 8 L16 13.5 L19 18 L23 12" stroke="#f96d3a" strokeWidth="2" strokeLinejoin="round" fill="none" />
      </svg>
      <span className="leading-none">
        <span className={`block text-[15px] font-extrabold tracking-wide ${light ? "text-white" : "text-pine-900"}`}>
          SANDO <span className="text-ember-500">×</span> terrain-x
        </span>
        <span className={`mt-1 block font-mono text-[10px] tracking-[0.2em] ${light ? "text-pine-200" : "text-pine-500"}`}>
          OUTDOOR EQUIPMENT
        </span>
      </span>
    </span>
  );
}
