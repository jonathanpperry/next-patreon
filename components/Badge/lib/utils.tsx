import { MembershipLevel } from "@/types/types";
import { Crown, Star, User } from "lucide-react";

export const getBadgeColor = (tier: MembershipLevel) => {
  switch (tier) {
    case 3:
      return "bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-amber-200";

    case 2:
      return "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-blue-200";

    default:
      return "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-purple-200";
  }
};

export const getBadgeIcon = (tier: MembershipLevel) => {
  switch (tier) {
    case 3:
      return <Crown className="w-4 h-4" />;
    case 2:
      return <Star className="w-4 h-4" />;
    default:
      return <User className="w-4 h-4" />;
  }
};
