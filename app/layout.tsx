import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Crystal Drain & Plumbing | Book Online | Toronto",
  description:
    "Licensed plumbing & drain services in Toronto. Book appointments online. 4.9★ rated. 24/7 emergency service. (289) 949-8248",
  keywords: ["plumbing", "drain", "Toronto", "emergency plumber", "sewer backup"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
