import { MessageSquareIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "comment",
  title: "Comments",
  type: "document",
  icon: MessageSquareIcon,
  description: "User comments on posts",
  preview: {
    select: {
      name: "name",
      comment: "comment",
      post: "post.title",
    },
    prepare({ name, comment, post }) {
      return {
        title: post,
        subtitle: `${name}: ${comment}`,
      };
    },
  },
  fields: [
    defineField({
      name: "post",
      title: "Post",
      type: "reference",
      to: [{ type: "post" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "userImageUrl",
      title: "User Image (URL)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "comment",
      title: "Comment",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
