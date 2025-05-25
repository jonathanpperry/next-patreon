import PricingTitle from "@/components/PricingTitle";
import SchematicWrapper from "@/components/Schematic/SchematicWrapper";

function PricingPage() {
  const customerPortalComponentId =
    process.env.NEXT_PUBLIC_CUSTOMER_PORTAL_COMPONENT_ID;

  if (!customerPortalComponentId) {
    throw new Error("Customer portal component ID is not set");
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-t from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Pricing title */}
        <PricingTitle />

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <SchematicWrapper componentId={customerPortalComponentId} />
        </div>
      </div>
    </div>
  );
}

export default PricingPage;
