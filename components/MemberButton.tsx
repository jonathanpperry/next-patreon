"use client";

import useMembershipTier from "@/hooks/useMembershipTier";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";
import { Heart, Loader2 } from "lucide-react";

function MemberButton() {
  const { user } = useUser();
  const membershipTier = useMembershipTier();

  if (!user) return null;

  if (!membershipTier)
    return (
      <Link href="/pricing">
        <Button className="bg-gray-500 text-white px-8 py-2 rounded-lg text-base font-semibold hover:bg-gray-700 transition-colors">
          Loading...
          <Loader2 className="w-4 h-4 animate-spin text-white" />
        </Button>
      </Link>
    );

  if (membershipTier === 1) {
    return (
      <Link href="/pricing">
        <Button className="bg-red-500 text-white px-8 py-2 rounded-lg text-base font-semibold hover:bg-red-700 transition-colors">
          Become a Member <Heart className="w-4 h-4 fill-white text-white" />
        </Button>
      </Link>
    );
  }

  if (membershipTier === 2) {
    return (
      <Link href="/pricing">
        <Button className="bg-blue-500 text-white px-8 py-2 rounded-lg text-base font-semibold hover:bg-blue-700 transition-colors">
          Upgrade to VIP <Heart className="w-4 h-4 fill-white text-white" />
        </Button>
      </Link>
    );
  }

  if (membershipTier === 3) {
    return (
      <Link href="/pricing">
        <Button className="bg-green-500 text-white px-8 py-2 rounded-lg text-base font-semibold hover:bg-green-700 transition-colors">
          Thanks for being a VIP!{" "}
          <Heart className="w-4 h-4 fill-white text-white" />
        </Button>
      </Link>
    );
  }
}

export default MemberButton;
