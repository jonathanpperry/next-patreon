import { SettingsIcon } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  description: "Settings for your site",
  icon: SettingsIcon,
  preview: {
    select: {
      title: "siteTitle",
    },
    prepare({ title }) {
      return {
        title,
        media: SettingsIcon,
      };
    },
  },
  fields: [
    {
      name: "siteTitle",
      title: "Site Title",
      type: "string",
      description: "The name of your creator page",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Site Description",
      type: "text",
      description: "A brief description of your creator page and what you do",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "headerLogo",
      title: "Header Logo",
      type: "image",
      description: "Logo displayed in the header of your site",
      //   options: {
      //     hotspot: true,
      //   },
      fields: [
        {
          name: "alt",
          title: "Alternative Text",
          type: "string",
          description: "Important for SEO and accessibility",
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "mainHeroImage",
      title: "Main Hero Image",
      type: "image",
      description: "The main banner image displayed on your home page",
      fields: [
        {
          name: "alt",
          title: "Alternative Text",
          type: "string",
          description: "Important for SEO and accessibility",
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "logo",
      title: "Logo",
      type: "image",
      description: "The logo of your creator page",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          title: "Alternative Text",
          type: "string",
          description: "Important for SEO and accessibility",
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    defineField({
      name: "socials",
      title: "Social Media Links",
      type: "array",
      description: "Links to your social media profiles",
      of: [
        defineArrayMember({
          type: "object",
          name: "socialLink",
          fields: [
            { name: "platform", title: "Platform", type: "string" },
            { name: "url", title: "URL", type: "url" },
          ],
        }),
      ],
    }),
    defineField({
      name: "callToActionText",
      title: "Call To Action Text",
      type: "text",
      rows: 2,
    }),
  ],
});
