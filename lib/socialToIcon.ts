import { Link } from "lucide-react";
import {
  SiDiscord,
  SiFacebook,
  SiGithub,
  SiInstagram,
  SiPinterest,
  SiTiktok,
  SiTwitch,
  SiX,
  SiYoutube,
} from "@icons-pack/react-simple-icons";

// Map social platform values to their corresponding icons
const socialToIcon = {
  instagram: SiInstagram,
  youtube: SiYoutube,
  facebook: SiFacebook,
  twitter: SiX,
  tiktok: SiTiktok,
  pinterest: SiPinterest,
  github: SiGithub,
  discord: SiDiscord,
  twitch: SiTwitch,
  other: Link,
} as const;

// Define a type for the platform keys
export type SocialPlatform = keyof typeof socialToIcon;

export function getSocialIcon(platform: SocialPlatform) {
  return socialToIcon[platform] || Link;
}

export default socialToIcon;
