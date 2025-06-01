import HeroBanner from "@/components/HeroBanner";
import InformationPanel from "@/components/InformationPanel";

export default function Home() {
  return (
    <div>
      <HeroBanner />

      <div className="-mt-20">
        <InformationPanel />
      </div>

      <hr />

      {/* Post List */}
    </div>
  );
}
