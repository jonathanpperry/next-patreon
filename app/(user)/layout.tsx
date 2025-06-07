import { type Metadata } from "next";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import { SanityLive } from "@/sanity/lib/live";
import SchematicProvider from "@/components/Schematic/SchematicProvider";
import { Toaster } from "sonner";
import DMButton from "@/components/DMButton";

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

            <div className="fixed bottom-4 right-4">
              <DMButton />
            </div>

            <Toaster position="bottom-center" />
          </body>
          <SanityLive />
        </SchematicProvider>
      </html>
    </ClerkProvider>
  );
}
