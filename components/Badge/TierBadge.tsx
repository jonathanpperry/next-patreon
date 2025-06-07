import { TierAccess } from "@/types/types";
import Badge from "./Badge";

interface TierBadgeProps {
  tierAccess: TierAccess;
}

function TierBadge({ tierAccess }: TierBadgeProps) {
  return <Badge tier={tierAccess} />;
}

export default TierBadge;
