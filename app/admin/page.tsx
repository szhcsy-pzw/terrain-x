"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import PageTitle from "@/components/PageTitle";
import { CatalogData, defaultCatalog, loadCatalog, resetCatalog, saveCatalog } from "@/lib/store";
import { componentGroups } from "@/lib/catalog";
import { Bike, ComponentItem, OutdoorItem } from "@/lib/types";
import { generalGroups, productGroups } from "@/lib/media-spec";
import { loadMediaMap, saveMediaMap, fileToCompressedDataUrl, MediaMap } from "@/lib/media";

type Tab = "dashboard" | "bikes" | "parts" | "outdoor" | "media" | "settings" | "data";

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: "dashboard", label: "数据看板", icon: "📊" },
  { id: "bikes", label: "整车车型", icon: "🚲" },
  { id: "parts", label: "自行车配件", icon: "🔧" },
  { id: "outdoor", label: "户外产品", icon: "🥾" },
  { id: "media", label: "媒体中心", icon: "🖼️" },
  { id: "settings", label: "站点设置", icon: "🎨" },
  { id: "data", label: "数据导出", icon: "📦" },
];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="label">{label}</label>
      {children}
    </div>
  );
}

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 transition ${
        checked ? "bg-teal-50 text-teal-700 ring-teal-300" : "bg-red-50 text-red-600 ring-red-200"
      }`}
    >
      <span className={`h-2 w-2 rounded-full ${checked ? "bg-teal-500" : "bg-red-400"}`} />
      {label}
    </button>
  );
}

export default function AdminPage() {
  const [data, setData] = useState<CatalogData>(() => defaultCatalog());
  const [mediaMap, setMediaMap] = useState<MediaMap>({});
  const [tab, setTab] = useState<Tab>("dashboard");
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [pwd, setPwd] = useState("");
  const [pwdError, setPwdError] = useState(false);

  useEffect(() => {
    setData(loadCatalog());
    setMediaMap(loadMediaMap());
    setAuthed(sessionStorage.getItem("sando_admin_session") === "1");
  }, []);

  const update = (fn: (d: CatalogData) => CatalogData) => {
    setData((prev) => fn(structuredClone(prev)));
    setDirty(true);
  };

  const save = () => {
    saveCatalog(data);
    saveMediaMap(mediaMap);
    setDirty(false);
    setSavedAt(new Date().toLocaleTimeString());
  };

  const login = () => {
    // 本地预览版默认密码；部署前请修改
    if (pwd === "sando2026") {
      sessionStorage.setItem("sando_admin_session", "1");
      setAuthed(true);
    } else {
      setPwdError(true);
    }
  };

  const stats = useMemo(
    () => [
      { label: "整车车型", value: data.bikes.length, sub: `${data.bikes.filter((b) => b.hidden).length} 款已隐藏` },
      { label: "自行车配件", value: data.components.length, sub: `${new Set(data.components.map((p) => p.brand)).size} 个品牌` },
      { label: "户外单品", value: data.hiking.length + data.camping.length, sub: `徒步 ${data.hiking.length} / 露营 ${data.camping.length}` },
      { label: "整车起售价", value: data.bikes[0]?.price ?? "—", sub: `最高 ${data.bikes[data.bikes.length - 1]?.price ?? "—"}` },
    ],
    [data]
  );

  if (!authed) {
    return (
      <section className="container-x flex min-h-[70vh] items-center justify-center">
        <div className="card w-full max-w-sm p-8">
          <p className="kicker">SANDO Admin</p>
          <h1 className="mt-2 text-2xl font-extrabold text-rock-950">后台管理登录</h1>
          <p className="mt-2 text-xs leading-5 text-rock-400">
            本地预览版默认密码 <code className="rounded bg-rock-100 px-1.5 py-0.5 font-mono text-rock-800">sando2026</code>
            （部署前在 app/admin/page.tsx 中修改）
          </p>
          <input
            type="password"
            className="field mt-6"
            placeholder="输入管理密码"
            value={pwd}
            onChange={(e) => { setPwd(e.target.value); setPwdError(false); }}
            onKeyDown={(e) => e.key === "Enter" && login()}
          />
          {pwdError && <p className="mt-2 text-xs font-semibold text-red-500">密码不正确，请重试</p>}
          <button onClick={login} className="btn-primary mt-5 w-full justify-center">进入后台</button>
        </div>
      </section>
    );
  }

  return (
    <section className="container-x py-10">
      <PageTitle title="后台管理" />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="kicker">SANDO × terrain-x CMS</p>
          <h1 className="h-display mt-1 text-4xl">后台管理</h1>
        </div>
        <div className="flex items-center gap-3">
          {savedAt && !dirty && <span className="text-xs text-rock-400">已保存 · {savedAt}</span>}
          {dirty && <span className="text-xs font-semibold text-orange-600">有未保存的修改</span>}
          <button
            onClick={save}
            disabled={!dirty}
            className={`rounded-full px-6 py-2.5 text-sm font-bold transition ${
              dirty ? "bg-orange-500 text-white hover:bg-orange-400" : "cursor-not-allowed bg-rock-100 text-rock-400"
            }`}
          >
            保存并发布
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-2 border-b border-rock-100 pb-4">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              tab === t.id ? "bg-rock-900 text-white" : "bg-white text-rock-600 ring-1 ring-rock-200 hover:ring-orange-400"
            }`}
          >
            <span className="mr-1.5">{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {tab === "dashboard" && (
          <div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="card p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-rock-400">{s.label}</p>
                  <p className="mt-2 text-3xl font-black text-rock-950">{s.value}</p>
                  <p className="mt-1 text-xs text-rock-400">{s.sub}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              <div className="card p-6">
                <h3 className="font-extrabold text-rock-950">快速上手</h3>
                <ol className="mt-4 space-y-3 text-sm leading-6 text-rock-600">
                  <li><b className="text-rock-900">1.</b> 在各模块中直接改价格、描述，或隐藏某个产品。</li>
                  <li><b className="text-rock-900">2.</b> 改完点右上角「保存并发布」，前台页面立即生效。</li>
                  <li><b className="text-rock-900">3.</b> 「数据导出」可下载 JSON 备份，部署时合并进代码仓库。</li>
                </ol>
              </div>
              <div className="card p-6">
                <h3 className="font-extrabold text-rock-950">架构说明</h3>
                <p className="mt-4 text-sm leading-6 text-rock-600">
                  本地预览版的修改保存在浏览器 localStorage（key: sando_admin_v2），<b>不会</b>改动源码。
                  正式上线时，建议把「数据导出」的 JSON 合并回 <code className="rounded bg-rock-100 px-1.5 py-0.5 font-mono text-xs">lib/catalog.ts</code>，
                  或接入 GitHub Contents API / 自有后端（数据层已预留替换点）。
                </p>
              </div>
            </div>
          </div>
        )}

        {tab === "bikes" && <BikesAdmin data={data} update={update} />}
        {tab === "parts" && <PartsAdmin data={data} update={update} />}
        {tab === "outdoor" && <OutdoorAdmin data={data} update={update} />}
        {tab === "media" && (
          <MediaAdmin
            data={data}
            mediaMap={mediaMap}
            onMediaChange={(m) => {
              setMediaMap(m);
              setDirty(true);
            }}
          />
        )}
        {tab === "settings" && <SettingsAdmin data={data} update={update} />}
        {tab === "data" && <DataAdmin data={data} onImport={(d) => { setData(d); setDirty(true); }} />}
      </div>
    </section>
  );
}

// ================= 整车管理 =================
function BikesAdmin({ data, update }: { data: CatalogData; update: (fn: (d: CatalogData) => CatalogData) => void }) {
  return (
    <div className="space-y-6">
      {data.bikes.map((bike, bi) => (
        <div key={bike.id} className="card p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-extrabold text-rock-950">
              <span className="mr-2 font-mono text-sm text-orange-600">{bike.code}</span>
              {bike.name}
            </h3>
            <Toggle
              checked={!bike.hidden}
              onChange={(v) => update((d) => { d.bikes[bi].hidden = !v; return d; })}
              label={bike.hidden ? "前台已隐藏" : "前台展示中"}
            />
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Field label="车型名称">
              <input className="field" value={bike.name}
                onChange={(e) => update((d) => { d.bikes[bi].name = e.target.value; return d; })} />
            </Field>
            <Field label="定位描述">
              <input className="field" value={bike.sub}
                onChange={(e) => update((d) => { d.bikes[bi].sub = e.target.value; return d; })} />
            </Field>
            <Field label="价格 (含¥)">
              <input className="field" value={bike.price}
                onChange={(e) => update((d) => { d.bikes[bi].price = e.target.value; return d; })} />
            </Field>
            <Field label="级别标签 (英文)">
              <input className="field" value={bike.level}
                onChange={(e) => update((d) => { d.bikes[bi].level = e.target.value; return d; })} />
            </Field>
          </div>
          <div className="mt-4">
            <Field label="车型介绍">
              <textarea className="field" rows={2} value={bike.intro}
                onChange={(e) => update((d) => { d.bikes[bi].intro = e.target.value; return d; })} />
            </Field>
          </div>
          <div className="mt-4">
            <p className="label">规格配置（{bike.specs.length} 项）</p>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {bike.specs.map((s, si) => (
                <div key={si} className="flex items-center gap-2 rounded-lg bg-rock-50 px-3 py-2">
                  <span className="shrink-0 text-xs font-semibold text-rock-500">{s.k}</span>
                  <input
                    className="w-full bg-transparent text-sm text-rock-800 outline-none"
                    value={s.v}
                    onChange={(e) => update((d) => { d.bikes[bi].specs[si].v = e.target.value; return d; })}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ================= 配件管理 =================
function PartsAdmin({ data, update }: { data: CatalogData; update: (fn: (d: CatalogData) => CatalogData) => void }) {
  const [filter, setFilter] = useState("all");
  const [keyword, setKeyword] = useState("");

  const list = data.components
    .map((p, idx) => ({ p, idx }))
    .filter(({ p }) => filter === "all" || p.g === filter)
    .filter(({ p }) => !keyword || p.name.includes(keyword) || p.brand.includes(keyword));

  const addPart = () => {
    update((d) => {
      d.components.unshift({
        id: `new-${Date.now()}`,
        g: "acc",
        icon: "🔧",
        name: "新配件（点击编辑）",
        brand: "SANDO",
        spec: "规格描述",
        price: "—",
        fit: "全系",
      });
      return d;
    });
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <input className="field !w-56" placeholder="搜索名称 / 品牌…" value={keyword}
          onChange={(e) => setKeyword(e.target.value)} />
        <select className="field !w-48" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">全部系统</option>
          {componentGroups.map((g) => <option key={g.id} value={g.id}>{g.name}</option>)}
        </select>
        <button onClick={addPart} className="btn-primary !py-2">+ 新增配件</button>
        <span className="text-xs text-rock-400">{list.length} / {data.components.length} 件</span>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl bg-white shadow-card ring-1 ring-rock-950/5">
        <table className="w-full min-w-[880px] text-sm">
          <thead>
            <tr className="border-b border-rock-100 bg-rock-50 text-left text-xs uppercase tracking-wider text-rock-500">
              <th className="px-4 py-3">品牌</th>
              <th className="px-4 py-3">名称</th>
              <th className="px-4 py-3">规格</th>
              <th className="px-4 py-3">适配</th>
              <th className="px-4 py-3">系统</th>
              <th className="px-4 py-3">参考价</th>
              <th className="px-4 py-3">状态</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {list.map(({ p, idx }) => (
              <tr key={p.id} className={`border-b border-rock-50 last:border-0 ${p.hidden ? "opacity-45" : ""}`}>
                <td className="px-4 py-2.5">
                  <input className="w-28 bg-transparent font-mono text-xs font-semibold outline-none" value={p.brand}
                    onChange={(e) => update((d) => { d.components[idx].brand = e.target.value; return d; })} />
                </td>
                <td className="px-4 py-2.5">
                  <input className="w-44 bg-transparent font-semibold outline-none" value={p.name}
                    onChange={(e) => update((d) => { d.components[idx].name = e.target.value; return d; })} />
                </td>
                <td className="px-4 py-2.5">
                  <input className="w-44 bg-transparent text-xs outline-none" value={p.spec}
                    onChange={(e) => update((d) => { d.components[idx].spec = e.target.value; return d; })} />
                </td>
                <td className="px-4 py-2.5">
                  <input className="w-20 bg-transparent text-xs outline-none" value={p.fit}
                    onChange={(e) => update((d) => { d.components[idx].fit = e.target.value; return d; })} />
                </td>
                <td className="px-4 py-2.5">
                  <select className="rounded bg-rock-50 px-2 py-1 text-xs outline-none" value={p.g}
                    onChange={(e) => update((d) => { d.components[idx].g = e.target.value; return d; })}>
                    {componentGroups.map((g) => <option key={g.id} value={g.id}>{g.name}</option>)}
                  </select>
                </td>
                <td className="px-4 py-2.5">
                  <input className="w-20 bg-transparent text-xs outline-none" value={p.price}
                    onChange={(e) => update((d) => { d.components[idx].price = e.target.value; return d; })} />
                </td>
                <td className="px-4 py-2.5">
                  <Toggle checked={!p.hidden}
                    onChange={(v) => update((d) => { d.components[idx].hidden = !v; return d; })}
                    label={p.hidden ? "已隐藏" : "展示中"} />
                </td>
                <td className="px-4 py-2.5">
                  <button className="text-xs font-semibold text-red-400 hover:text-red-600"
                    onClick={() => {
                      if (confirm(`确定删除「${p.name}」？删除后需点保存才生效。`))
                        update((d) => { d.components.splice(idx, 1); return d; });
                    }}>
                    删除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ================= 户外产品管理 =================
function OutdoorAdmin({ data, update }: { data: CatalogData; update: (fn: (d: CatalogData) => CatalogData) => void }) {
  const sections = [
    { key: "hiking" as const, label: "🥾 户外徒步", icon: "🥾" },
    { key: "camping" as const, label: "⛺ 露营装备", icon: "⛺" },
  ];

  const addProduct = (series: "hiking" | "camping") => {
    update((d) => {
      d[series].unshift({
        id: `${series[0]}-new-${Date.now()}`,
        name: "新产品（点击编辑）",
        icon: "🏕️",
        price: "¥0",
        image: `assets/outdoor/${series === "hiking" ? "h1" : "c1"}.svg`,
        tag: "新品",
        desc: "一句话卖点",
        fit: "—",
        intro: "产品介绍",
        features: [],
      });
      return d;
    });
  };

  return (
    <div className="space-y-10">
      {sections.map((sec) => (
        <div key={sec.key}>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-extrabold text-rock-950">
              {sec.label}
              <span className="ml-2 text-sm font-normal text-rock-400">{data[sec.key].length} 件</span>
            </h3>
            <button onClick={() => addProduct(sec.key)} className="btn-primary !py-2">+ 新增</button>
          </div>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {data[sec.key].map((p, idx) => (
              <div key={p.id} className={`card p-5 ${p.hidden ? "opacity-50" : ""}`}>
                <div className="flex items-start justify-between gap-3">
                  <input className="w-full bg-transparent font-extrabold text-rock-950 outline-none" value={p.name}
                    onChange={(e) => update((d) => { d[sec.key][idx].name = e.target.value; return d; })} />
                  <button className="shrink-0 text-xs font-semibold text-red-400 hover:text-red-600"
                    onClick={() => {
                      if (confirm(`确定删除「${p.name}」？`))
                        update((d) => { d[sec.key].splice(idx, 1); return d; });
                    }}>
                    删除
                  </button>
                </div>
                <textarea className="mt-2 w-full bg-transparent text-sm leading-6 text-rock-600 outline-none" rows={2}
                  value={p.desc}
                  onChange={(e) => update((d) => { d[sec.key][idx].desc = e.target.value; return d; })} />
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <input className="field !w-24 !py-1.5 !text-xs" value={p.tag} placeholder="标签"
                    onChange={(e) => update((d) => { d[sec.key][idx].tag = e.target.value; return d; })} />
                  <input className="field !w-24 !py-1.5 !text-xs" value={p.price} placeholder="¥价格"
                    onChange={(e) => update((d) => { d[sec.key][idx].price = e.target.value; return d; })} />
                  <input className="field !w-28 !py-1.5 !text-xs" value={p.fit} placeholder="适配"
                    onChange={(e) => update((d) => { d[sec.key][idx].fit = e.target.value; return d; })} />
                  <Toggle checked={!p.hidden}
                    onChange={(v) => update((d) => { d[sec.key][idx].hidden = !v; return d; })}
                    label={p.hidden ? "已隐藏" : "展示中"} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ================= 站点设置 =================
function SettingsAdmin({ data, update }: { data: CatalogData; update: (fn: (d: CatalogData) => CatalogData) => void }) {
  const s = data.settings;
  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h3 className="font-extrabold text-rock-950">首页 Hero</h3>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field label="主标题 左">
            <input className="field" value={s.heroTitle1}
              onChange={(e) => update((d) => { d.settings.heroTitle1 = e.target.value; return d; })} />
          </Field>
          <Field label="主标题 右">
            <input className="field" value={s.heroTitle2}
              onChange={(e) => update((d) => { d.settings.heroTitle2 = e.target.value; return d; })} />
          </Field>
        </div>
        <div className="mt-4">
          <Field label="副标题">
            <textarea className="field" rows={3} value={s.heroSubtitle}
              onChange={(e) => update((d) => { d.settings.heroSubtitle = e.target.value; return d; })} />
          </Field>
        </div>
        <div className="mt-4">
          <Field label="Hero 背景图路径">
            <input className="field font-mono text-xs" value={s.heroBg}
              onChange={(e) => update((d) => { d.settings.heroBg = e.target.value; return d; })} />
          </Field>
          <p className="mt-1 text-xs text-rock-400">可用 assets/hero/home.svg 或 assets/hero/outdoor.svg</p>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="font-extrabold text-rock-950">总部信息（页脚 / 经销网络页）</h3>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field label="名称">
            <input className="field" value={s.hq.name}
              onChange={(e) => update((d) => { d.settings.hq.name = e.target.value; return d; })} />
          </Field>
          <Field label="电话">
            <input className="field" value={s.hq.phone}
              onChange={(e) => update((d) => { d.settings.hq.phone = e.target.value; return d; })} />
          </Field>
          <Field label="邮箱">
            <input className="field" value={s.hq.email}
              onChange={(e) => update((d) => { d.settings.hq.email = e.target.value; return d; })} />
          </Field>
          <Field label="地址">
            <input className="field" value={s.hq.addr}
              onChange={(e) => update((d) => { d.settings.hq.addr = e.target.value; return d; })} />
          </Field>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="font-extrabold text-rock-950">六大差异化壁垒</h3>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {s.differentiators.map((diff, i) => (
            <div key={i} className="rounded-xl bg-rock-50 p-4">
              <input className="w-full bg-transparent font-bold text-rock-900 outline-none" value={diff.title}
                onChange={(e) => update((d) => { d.settings.differentiators[i].title = e.target.value; return d; })} />
              <textarea className="mt-2 w-full bg-transparent text-sm leading-6 text-rock-600 outline-none" rows={2}
                value={diff.desc}
                onChange={(e) => update((d) => { d.settings.differentiators[i].desc = e.target.value; return d; })} />
            </div>
          ))}
        </div>
      </div>

      <div className="card p-6">
        <h3 className="font-extrabold text-rock-950">其他文案</h3>
        <div className="mt-5 space-y-4">
          <Field label="社区共创说明">
            <textarea className="field" rows={2} value={s.communityNote}
              onChange={(e) => update((d) => { d.settings.communityNote = e.target.value; return d; })} />
          </Field>
          <Field label="使用手册说明">
            <textarea className="field" rows={2} value={s.manualNote}
              onChange={(e) => update((d) => { d.settings.manualNote = e.target.value; return d; })} />
          </Field>
          <Field label="淘宝店链接">
            <input className="field font-mono text-xs" value={s.storeUrl}
              onChange={(e) => update((d) => { d.settings.storeUrl = e.target.value; return d; })} />
          </Field>
        </div>
      </div>
    </div>
  );
}

// ================= 数据导出 =================
function DataAdmin({ data, onImport }: { data: CatalogData; onImport: (d: CatalogData) => void }) {
  // 导出时把上传的图片（base64）一起打包
  const exportJson = () => {
    const payload = { ...data, media: loadMediaMap() };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sando-site-data-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyJson = async () => {
    await navigator.clipboard.writeText(JSON.stringify({ ...data, media: loadMediaMap() }));
    alert("已复制到剪贴板");
  };

  const importJson = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as CatalogData & { media?: MediaMap };
        // 媒体数据单独落库
        if (parsed.media) {
          saveMediaMap(parsed.media);
          delete (parsed as any).media;
        }
        onImport(parsed);
        alert("导入成功（含图片）！请检查内容后点击「保存并发布」。");
      } catch {
        alert("导入失败：不是有效的 JSON 数据文件。");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="grid gap-5 lg:grid-cols-3">
      <div className="card p-6">
        <h3 className="font-extrabold text-rock-950">导出数据</h3>
        <p className="mt-3 text-sm leading-6 text-rock-500">
          把当前全部站点数据（含未保存的修改）导出为 JSON，用于备份或合并进代码仓库。
        </p>
        <div className="mt-5 flex gap-3">
          <button onClick={exportJson} className="btn-primary">⬇ 下载</button>
          <button onClick={copyJson} className="btn-ghost">复制</button>
        </div>
      </div>
      <div className="card p-6">
        <h3 className="font-extrabold text-rock-950">导入数据</h3>
        <p className="mt-3 text-sm leading-6 text-rock-500">
          从之前导出的 JSON 文件恢复数据。导入后记得点「保存并发布」。
        </p>
        <label className="btn-ghost mt-5 cursor-pointer">
          ⬆ 选择 JSON 文件
          <input type="file" accept=".json" className="hidden"
            onChange={(e) => e.target.files?.[0] && importJson(e.target.files[0])} />
        </label>
      </div>
      <div className="card border-2 border-red-100 p-6">
        <h3 className="font-extrabold text-red-600">恢复出厂数据</h3>
        <p className="mt-3 text-sm leading-6 text-rock-500">
          清除浏览器中保存的全部修改，恢复到代码内置的默认内容。建议先导出备份。
        </p>
        <button
          className="mt-5 rounded-full bg-red-500 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-red-400"
          onClick={() => {
            if (confirm("确定要清除所有修改、恢复默认数据吗？")) {
              resetCatalog();
              location.reload();
            }
          }}
        >
          恢复默认
        </button>
      </div>
    </div>
  );
}

// ================= 媒体中心 =================
function MediaAdmin({
  data,
  mediaMap,
  onMediaChange,
}: {
  data: CatalogData;
  mediaMap: MediaMap;
  onMediaChange: (m: MediaMap) => void;
}) {
  const [activeGroup, setActiveGroup] = useState("logo");
  const [toast, setToast] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [uploadTarget, setUploadTarget] = useState<string | null>(null);
  const [subFilter, setSubFilter] = useState<string>("all");

  // 通用图 + 产品图（按当前 catalog 动态生成，精准到单个产品）
  const groups = useMemo(
    () => [...generalGroups, ...productGroups(data)],
    [data]
  );
  const allSlotsFlat = useMemo(() => groups.flatMap((g) => g.slots), [groups]);
  const group = groups.find((g) => g.id === activeGroup) ?? groups[0];

  // 子分组（配件按系统、户外按系列）
  const subs = useMemo(() => {
    const set = new Set<string>();
    group.slots.forEach((s) => s.sub && set.add(s.sub));
    return Array.from(set);
  }, [group]);

  const visibleSlots = useMemo(
    () => (subFilter === "all" ? group.slots : group.slots.filter((s) => s.sub === subFilter)),
    [group, subFilter]
  );

  const pickFile = (key: string) => {
    setUploadTarget(key);
    fileRef.current?.click();
  };

  const onFile = async (file: File) => {
    if (!uploadTarget) return;
    const slot = allSlotsFlat.find((s) => s.key === uploadTarget);
    try {
      const dataUrl = await fileToCompressedDataUrl(file, slot?.maxWidth ?? 1200);
      const next = { ...mediaMap, [uploadTarget]: dataUrl };
      onMediaChange(next);
      showToast(`已上传「${slot?.label ?? uploadTarget}」，点右上角「保存并发布」生效`);
    } catch {
      showToast("上传失败，请换一张图片重试");
    }
    setUploadTarget(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const restore = (key: string) => {
    const next = { ...mediaMap };
    delete next[key];
    onMediaChange(next);
    showToast("已恢复默认图（点保存并发布生效）");
  };

  const restoreAll = () => {
    if (!confirm("确定要恢复全部图片为默认吗？此操作会清除所有已上传的图片。")) return;
    onMediaChange({});
    showToast("已全部恢复默认（点保存并发布生效）");
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const customCount = Object.keys(mediaMap).length;
  const totalCount = allSlotsFlat.length;

  return (
    <div>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
      />

      {/* 说明 + 总览 */}
      <div className="grid gap-5 lg:grid-cols-3">
        <div className="card p-6 lg:col-span-2">
          <h3 className="font-extrabold text-rock-950">全站图片管理</h3>
          <p className="mt-3 text-sm leading-6 text-rock-500">
            管理 Logo、背景图，以及<b>每一个</b>整车、自行车配件、户外产品的图片。
            点「上传替换」选择本地图片，系统按建议尺寸自动压缩并<b>精准绑定到该产品</b>，
            上传后点右上角「保存并发布」即可发布到前台。
            配件不上传时会显示所属系统的通用图；上传后只影响这一个配件。
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
            <span className="rounded-full bg-orange-50 px-3 py-1.5 font-semibold text-orange-600 ring-1 ring-orange-200">
              已自定义 {customCount} / {totalCount} 张
            </span>
            {customCount > 0 && (
              <button onClick={restoreAll} className="rounded-full bg-red-50 px-3 py-1.5 font-semibold text-red-600 ring-1 ring-red-200 hover:bg-red-100">
                全部恢复默认
              </button>
            )}
          </div>
        </div>
        <div className="card p-6">
          <h3 className="font-extrabold text-rock-950">通用上传建议</h3>
          <ul className="mt-3 space-y-2 text-xs leading-5 text-rock-500">
            <li>· Logo 用 <b>SVG 或透明底 PNG</b>，横向</li>
            <li>· 背景大图用 <b>JPG / WebP</b>，16:9</li>
            <li>· 产品/配件图用 <b>PNG / WebP</b>，4:3，主体居中</li>
            <li>· 上传会自动压缩到建议宽度，无需手动裁剪</li>
            <li>· 单张建议 ≤ 提示体积，太大会拖慢首屏</li>
          </ul>
        </div>
      </div>

      {/* 大分组切换 */}
      <div className="mt-8 flex flex-wrap gap-2">
        {groups.map((g) => (
          <button
            key={g.id}
            onClick={() => { setActiveGroup(g.id); setSubFilter("all"); }}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              activeGroup === g.id
                ? "bg-rock-900 text-white"
                : "bg-white text-rock-600 ring-1 ring-rock-200 hover:ring-orange-400"
            }`}
          >
            {g.icon} {g.title}
            <span className="ml-1.5 text-xs opacity-60">{g.slots.length}</span>
          </button>
        ))}
      </div>

      {/* 子分组筛选（配件按系统 / 户外按系列） */}
      {subs.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => setSubFilter("all")}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
              subFilter === "all" ? "bg-orange-500 text-white" : "bg-white text-rock-600 ring-1 ring-rock-200"
            }`}
          >
            全部
          </button>
          {subs.map((s) => (
            <button
              key={s}
              onClick={() => setSubFilter(s)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                subFilter === s ? "bg-orange-500 text-white" : "bg-white text-rock-600 ring-1 ring-rock-200"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* 图片网格 */}
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visibleSlots.map((slot) => {
          const custom = mediaMap[slot.key];
          const src = custom ?? `/${slot.path}`;
          return (
            <div key={slot.key} className="card overflow-hidden">
              <div className="relative bg-rock-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={slot.label} className="h-40 w-full object-cover" />
                {custom && (
                  <span className="absolute right-2 top-2 rounded-full bg-teal-500 px-2 py-0.5 text-[10px] font-bold text-white">
                    已自定义
                  </span>
                )}
                {slot.sub && (
                  <span className="absolute left-2 top-2 rounded-full bg-rock-950/80 px-2 py-0.5 text-[10px] font-semibold text-white">
                    {slot.sub}
                  </span>
                )}
              </div>
              <div className="p-4">
                <p className="text-sm font-extrabold text-rock-950">{slot.label}</p>
                <p className="mt-1 text-xs leading-5 text-rock-400">{slot.usage}</p>

                {/* 规格指引 */}
                <dl className="mt-3 space-y-1 rounded-lg bg-rock-50 p-2.5 text-[11px]">
                  <div className="flex justify-between">
                    <dt className="text-rock-400">建议尺寸</dt>
                    <dd className="font-semibold text-rock-700">{slot.size}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-rock-400">比例</dt>
                    <dd className="font-semibold text-rock-700">{slot.ratio}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-rock-400">格式</dt>
                    <dd className="font-semibold text-rock-700">{slot.format}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-rock-400">体积</dt>
                    <dd className="font-semibold text-rock-700">{slot.maxSizeHint}</dd>
                  </div>
                </dl>

                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => pickFile(slot.key)}
                    className="flex-1 rounded-full bg-rock-900 py-2 text-xs font-bold text-white transition hover:bg-orange-500"
                  >
                    ⬆ 上传替换
                  </button>
                  {custom && (
                    <button
                      onClick={() => restore(slot.key)}
                      className="rounded-full bg-rock-100 px-3 py-2 text-xs font-semibold text-rock-600 transition hover:bg-red-50 hover:text-red-500"
                      title="恢复默认"
                    >
                      ↺
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-rock-900 px-5 py-2.5 text-sm font-semibold text-white shadow-lift">
          {toast}
        </div>
      )}
    </div>
  );
}
