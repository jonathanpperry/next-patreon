"use server";

import { adminClient } from "@/sanity/lib/adminClient";
import { currentUser } from "@clerk/nextjs/server";

async function addComment(postId: string, comment: string) {
  const user = await currentUser();
  if (!user) {
    throw new Error("User not found");
  }

  try {
    // Add comment to sanity
    await adminClient.create({
      _type: "comment",
      post: { _type: "reference", _ref: postId },
      name: user.firstName,
      userImageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
      comment,
    });

    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "An unknown error occurred" };
  }
}

export default addComment;
