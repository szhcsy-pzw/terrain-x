import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BuildDrawer from "@/components/BuildDrawer";
import ProductDrawer from "@/components/ProductDrawer";
import { I18nProvider } from "@/lib/i18n";
import { BuildProvider } from "@/lib/build";
import { DrawerProvider } from "@/lib/drawer";

export const metadata: Metadata = {
  title: {
    default: "SANDO × terrain-x | 自行车 · 户外徒步 · 露营",
    template: "%s | SANDO × terrain-x",
  },
  description:
    "SANDO 山地车 X1/T1/F1 阶梯进阶，零件护照全透明；terrain-x 户外覆盖徒步与露营。国产顶级配套，专业而诚实。",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>
        <I18nProvider>
          <BuildProvider>
            <DrawerProvider>
              <SiteHeader />
              <main>{children}</main>
              <SiteFooter />
              <BuildDrawer />
              <ProductDrawer />
            </DrawerProvider>
          </BuildProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
