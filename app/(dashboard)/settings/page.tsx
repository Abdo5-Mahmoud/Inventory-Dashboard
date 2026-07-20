import { MatricCards } from "@/components/MatricCards";
import { SettingsForm } from "@/features/settings/components/SettingsForm";
import { SettingsCardContainer } from "@/features/settings/components/SettingsCardContainer";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Settings",
  description:
    "Manage enterprise settings, preferences, and security configurations.",
};
export default function page() {
  return (
    <section className="p-6">
      <div className="flex flex-col gap-8">
        <div>
          <h3 className="text-2xl font-semibold tracking-[-0.32px] leading-10 text-muted-foreground">
            General Settings
          </h3>
          <p className="leading-6 text-foreground">
            Manage your enterprise store preferences, branding, and security
            configurations.{" "}
          </p>
        </div>
        <div className="flex flex-col gap-6">
          <SettingsCardContainer>
            <h3 className="text-2xl font-semibold leading-8 text-muted-foreground">
              Store Information
            </h3>
            <SettingsForm />
          </SettingsCardContainer>
          <SettingsCardContainer>
            <h3 className="text-2xl font-semibold leading-8 text-muted-foreground">
              Store Stats OverLay
            </h3>
            <MatricCards
              totalProducts={true}
              InventoryValue={true}
              orders={true}
              ordersValue={true}
              showCategories={true}
              avgOrderValue={true}
              noOfProducts={true}
            />
          </SettingsCardContainer>
        </div>
      </div>
    </section>
  );
}
