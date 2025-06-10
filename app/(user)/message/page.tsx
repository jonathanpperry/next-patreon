"use client";

import { useUser } from "@clerk/nextjs";
import {
  useSchematicEntitlement,
  useSchematicIsPending,
} from "@schematichq/schematic-react";
import { Loader2, MessageCircleIcon, SendIcon } from "lucide-react";
import React, { useState, useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import useMembershipTier from "@/hooks/useMembershipTier";
import { getTierFromLevel } from "@/types/types";
import { sendMessage } from "@/actions/sendMessage";

function MessagePage() {
  const { user, isLoaded } = useUser();
  const membershipTier = useMembershipTier();
  const [message, setMessage] = useState("");
  const [isSending, startTransition] = useTransition();
  const schematicIsPending = useSchematicIsPending();
  const { featureUsageExceeded } = useSchematicEntitlement("send-message");

  // Check if user is VIP
  // const tier = membershipTier ? getTierFromLevel(membershipTier) : null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        const toastId = toast.loading("Sending message...");
        const result = await sendMessage(message);

        if (result.success) {
          setMessage("");
          const { usage, allocation } = result;

          toast.success(
            `Message sent successfully, ${usage}/${allocation} used`,
            { id: toastId }
          );
        } else {
          toast.error(result.error, { id: toastId });
        }
      } catch (error) {
        console.error("Error sending message: ", error);
      }
    });
  };

  if (!isLoaded || !membershipTier) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-t from-gray-50 to-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-t from-gray-50 to-white flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-2xl font-bold mb-2">Please Sign In</h1>
          <p className="text-gray-600 mb-4">
            You need to be signed in to access this feature
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-t from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-indigo-500 to-purple-600">
            <div className="flex items-center gap-3 text-white mb-2">
              <MessageCircleIcon className="w-6 h-6" />
              <h1 className="text-2xl font-bold">Direct Message to Creator</h1>
            </div>
            <p className="text-indigo-100">
              As a VIP member, you can send direct messages to the creator. The
              creator may choose to respond via your email address.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <Textarea
                id="message"
                value={message}
                disabled={isSending || featureUsageExceeded}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    !e.shiftKey &&
                    !e.ctrlKey &&
                    !e.altKey &&
                    !e.metaKey
                  ) {
                    if (featureUsageExceeded) {
                      toast.error(
                        "You have reached your Direct Message limit for this month!"
                      );
                      return;
                    }
                    e.preventDefault();
                    handleSubmit(
                      e as unknown as React.FormEvent<HTMLFormElement>
                    );
                  }
                }}
                placeholder="Write your message here..."
                required
                className="w-full min-h-[150px]"
              />
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                disabled={
                  isSending || featureUsageExceeded || schematicIsPending
                }
                className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
              >
                {isSending ? (
                  <>Sending...</>
                ) : featureUsageExceeded ? (
                  <>
                    You have reached your Direct Message limit for this month!
                  </>
                ) : (
                  <>
                    Send Message
                    <SendIcon className="ms-2 w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MessagePage;
