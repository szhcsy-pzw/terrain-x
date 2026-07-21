import OutdoorSeriesPage from "@/components/OutdoorSeriesPage";

export const metadata = { title: "露营装备" };

export default function CampingPage() {
  return (
    <OutdoorSeriesPage
      series="camping"
      kicker="terrain-x · Camping"
      titleKey="page.camping.title"
      subKey="page.camping.sub"
    />
  );
}
