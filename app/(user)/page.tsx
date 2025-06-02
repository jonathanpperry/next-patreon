import HeroBanner from "@/components/HeroBanner";
import InformationPanel from "@/components/InformationPanel";
import PostsList from "@/components/PostsList";
import { getPosts } from "@/sanity/lib/post/getPosts";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ tier: string }>;
}) {
  const { tier } = await searchParams;
  const posts = await getPosts(tier);

  return (
    <div>
      <HeroBanner />

      <div className="-mt-20">
        <InformationPanel />
      </div>

      <hr />

      <PostsList posts={posts} />
    </div>
  );
}
