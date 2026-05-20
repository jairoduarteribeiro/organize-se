import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://organize-se.vercel.app";

const displayFont = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Workshop ORGANIZE-$E",
  description:
    "Workshop ORGANIZE-$E ao vivo para mulheres organizarem as finanças com Rafaela Ribeiro e um plano prático de 30 dias.",
  openGraph: {
    title: "Workshop ORGANIZE-$E",
    description:
      "Workshop ORGANIZE-$E ao vivo para mulheres organizarem as finanças com Rafaela Ribeiro e um plano prático de 30 dias.",
    type: "website",
    images: [
      {
        url: "/images/hero1.png",
        width: 1080,
        height: 1080,
        alt: "Workshop ORGANIZE-$E",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
