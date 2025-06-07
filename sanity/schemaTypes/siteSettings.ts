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
      description:
        "Add your social media profiles for visitors to connect with you",
      of: [
        defineArrayMember({
          type: "object",
          name: "socialLink",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              description:
                "The social media platform (e.g., Twitter, Instagram, YouTube",
              options: {
                list: [
                  { title: "Instagram", value: "instagram" },
                  { title: "YouTube", value: "youtube" },
                  { title: "Facebook", value: "facebook" },
                  { title: "X", value: "twitter" },
                  { title: "TikTok", value: "tikTok" },
                  { title: "Pinterest", value: "pinterest" },
                  { title: "GitHub", value: "github" },
                  { title: "Discord", value: "discord" },
                  { title: "Twitch", value: "twitch" },
                  { title: "Other", value: "other" },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              description: "The full URL to your profile on this platform",
              validation: (Rule) => Rule.required(),
            }),
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
