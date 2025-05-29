import { membershipMap, TierAccess, tierMap } from "@/types/types";
import { getBadgeColor, getBadgeIcon } from "./lib/utils";

interface BadgeProps {
  variant?: "simple" | "interactive";
  tier: TierAccess;
  className?: string;
  link?: string;
}

function Badge({ variant = "simple", tier, link, className }: BadgeProps) {
  const baseStyles = "px-3 py-1 rounded-full text-sm font-medium";
  const level = tierMap[tier];
  const label = membershipMap[level];
  const badgeColor = getBadgeColor(level);

  return (
    <p
      className={`
        ${baseStyles}
        ${badgeColor}
        ${className}
    `}
    >
      {getBadgeIcon(level)}
      {label}
    </p>
  );
}

export default Badge;
