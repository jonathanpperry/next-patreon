import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

const getPostQuery = defineQuery(`*[_type == "post" && _id == $id][0] {
    ...,
    "comments": *[_type == "comment" && post._ref == ^._id] | order(createdAt desc)
    }`);

export async function getPost(id?: string) {
  const { data } = await sanityFetch({
    query: getPostQuery,
    params: { id },
  });

  return data;
}
