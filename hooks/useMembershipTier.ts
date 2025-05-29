"use client";

import { useSchematicFlag } from "@schematichq/schematic-react";
import { MembershipLevel } from "@/types/types";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

function useMembershipTier(): MembershipLevel | null {
  const hasBackstageContent = useSchematicFlag("backstage-content");
  const hasCrewContent = useSchematicFlag("crew-member-content");
  const hasVipContent = useSchematicFlag("vip-access-content");

  if (hasVipContent) return 3;
  if (hasCrewContent) return 2;
  if (hasBackstageContent) return 1;

  return null;
}

export default useMembershipTier;
