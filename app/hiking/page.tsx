import OutdoorSeriesPage from "@/components/OutdoorSeriesPage";

export const metadata = { title: "户外徒步" };

export default function HikingPage() {
  return (
    <OutdoorSeriesPage
      series="hiking"
      kicker="terrain-x · Hiking"
      titleKey="page.hiking.title"
      subKey="page.hiking.sub"
    />
  );
}
