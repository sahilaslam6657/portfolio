import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sahil Jr Business Development Executive",
  description:
    "I help IT companies generate leads, close international deals, and build scalable sales pipelines. 4+ years driving revenue across US, Europe, and the Middle East.",
  keywords: [
    "Business Development Executive",
    "Lead Generation",
    "Sales Strategy",
    "Client Acquisition",
    "IT Services",
    "Sahil Jr",
  ],
  openGraph: {
    title: "Sahil Jr Business Development Executive",
    description:
      "Helping IT companies grow globally through strategic partnerships and high-converting sales pipelines.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
