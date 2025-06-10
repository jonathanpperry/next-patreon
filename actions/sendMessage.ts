"use server";

import { currentUser } from "@clerk/nextjs/server";
import { client } from "@/lib/schematic";
import { adminClient } from "@/sanity/lib/adminClient";

export async function sendMessage(message: string) {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  try {
    const entitlements = await client.entitlements.getFeatureUsageByCompany({
      keys: {
        id: user.id,
      },
    });

    const feature = entitlements.data.features.find(
      (entitlement) => entitlement.feature?.eventSubtype === "send-dm"
    );

    const dmUsage = feature?.usage || 0;
    const dmAllocation = feature?.allocation || 0;

    if (dmUsage >= dmAllocation) {
      throw new Error(
        "You have reached your Direct Message limit for this month!"
      );
    }

    if (!feature) {
      throw new Error("User is not a VIP");
    }

    const newMessage = await adminClient.create({
      _type: "message",
      senderName: user.fullName || user.emailAddresses[0].emailAddress,
      senderEmail: user.emailAddresses[0].emailAddress,
      messageBody: message,
    });

    await client.track({
      event: "send-dm",
      company: {
        id: user.id,
      },
      user: {
        id: user.id,
      },
    });

    const updatedDmUsage = dmUsage + 1;
    console.log(`Updated DM usage: ${updatedDmUsage}/${dmAllocation}`);

    return {
      success: true,
      message: newMessage,
      usage: updatedDmUsage,
      allocation: dmAllocation,
    };
  } catch (error) {
    console.error("Error sending message:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
