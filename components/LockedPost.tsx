import { GetPostsQueryResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import TierBadge from "./Badge/TierBadge";

function LockedPost({ post }: { post: GetPostsQueryResult[number] }) {
  return (
    <Link href="/pricing">
      <article className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 group cursor-pointer relative">
        {post.coverImage?.asset && (
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-lg rel">
            <div className="absolute inset-0 bg-black/50 z-10 flex items-center justify-center">
              <Lock className="w-12 h-12 text-white" />
            </div>
            <Image
              src={urlFor(post.coverImage).url()}
              alt={post.coverImage.alt || post.title || "Post cover image"}
              fill
              className="object-contain blur-sm"
            />
          </div>
        )}

        {post.tierAccess && (
          <div className="absolute top-4 right-4 z-20">
            <TierBadge tierAccess={post.tierAccess} />
          </div>
        )}

        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {post.title}
          </h2>
        </div>
      </article>
    </Link>
  );
}

export default LockedPost;
