import { type Metadata } from "next";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import { SanityLive } from "@/sanity/lib/live";
import SchematicProvider from "@/components/Schematic/SchematicProvider";

export const metadata: Metadata = {
  title: "Patreon AI Clone",
  description: "Patreon AI Clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <SchematicProvider>
          <body>
            <Header />
            {children}
          </body>
          <SanityLive />
        </SchematicProvider>
      </html>
    </ClerkProvider>
  );
}
