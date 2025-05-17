import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Patreon AI Clone - Admin",
  description: "Patreon AI Clone - Admin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
