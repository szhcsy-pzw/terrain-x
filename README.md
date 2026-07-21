# SANDO × terrain-x 官网 v2.0

旧站（terrainx.cn，纯静态 HTML + 原生 JS，GitHub Pages）升级为
**Next.js 14 + TypeScript + Tailwind CSS** 现代架构，完整迁移全部内容与功能。

## 技术栈

| 层 | 旧站 | 新站 |
| --- | --- | --- |
| 框架 | 纯 HTML + 原生 JS | Next.js 14 (App Router, `output: export`) |
| 数据 | `data/products.js` (`SANDO_DATA`) | `lib/catalog.ts`（自动迁移，结构一致 + TS 类型） |
| 双语 | `js/i18n.js` (SandoT) | `lib/i18n.tsx`（React Context，localStorage key 兼容） |
| 选配清单 | `js/build.js` | `lib/build.tsx` + `BuildDrawer`（同 key: sando_build_v1） |
| 后台 | `admin.html` + `admin.js` | `app/admin/page.tsx`（可视化 CMS） |
| 样式 | `css/main.css` | Tailwind（沿用品牌变量：橙 #ff6b35 / 青 #1fa98f / 岩灰 / Barlow Condensed + Inter） |

## 本地开发

```bash
npm install
npm run dev        # http://localhost:3000
```

## 构建部署

```bash
npm run build      # 产物在 out/，纯静态，可直接部署 GitHub Pages / OSS / COS / Nginx
```

## 页面（13 个）

```
/           首页（Hero 背景图、三条产品线、车型、六大差异化、户外精选）
/bikes/     整车（详情 + features、山度几何™、完整尺码表 9 列）
/bike-parts/ 零件护照（车型+尺码切换、BOM 成本表、可加入选配清单）
/parts/     配件目录（7 大系统筛选、按车型适配筛选、加入选配清单）
/outdoor/   户外总览
/hiking/    徒步系列（6 单品 + features）
/camping/   露营系列
/dealers/   经销网络（总部卡 + 37 城市搜索）
/support/   支持（服务卡 + FAQ 手风琴 + 联系方式）
/manual/    使用手册在线阅读（内嵌 PDF + 下载）
/about/     关于（双品牌、差异化、供应商品牌墙、山度几何、社区共创）
/admin/     后台管理（密码 sando2026，部署前修改）
```

## 后台功能

- 📊 数据看板：条目统计
- 🚲 整车 / 🔧 配件 / 🥾🗻 户外：改价、改文案、隐藏/上架、新增、删除
- 🎨 站点设置：Hero 标题/背景、总部信息、差异化卖点、社区/手册文案、淘宝店链接
- 📦 数据导出：JSON 下载/复制/导入、恢复默认
- 数据存 localStorage (`sando_admin_v2`)，正式部署可导出 JSON 合并回 `lib/catalog.ts`

## 数据迁移

`scripts/migrate-i18n.cjs` 一次性把旧站 `data/products.js` + `i18n-data.js` + `dealers.js`
编译为 `lib/catalog.ts`（3 车型 / 6+6 户外 / 38 配件 / 3×19 行 BOM / 37 城市，53 项英文补丁）。

## 安全提示

旧仓库 `scripts/api_push.ps1` 中硬编码过一个真实 GitHub PAT，**必须吊销轮换**：
GitHub → Settings → Developer settings → Personal access tokens → Revoke。
新架构后台不再依赖浏览器持有 Token；如需"后台改完直接上线"，建议用服务端
Route Handler + Octokit（Token 放服务器环境变量）。
