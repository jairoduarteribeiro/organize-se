import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://organize-se.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Workshop Organize-$e",
  description:
    "Workshop ao vivo para mulheres organizarem as finanças com Rafaela Ribeiro e um plano prático de 30 dias.",
  openGraph: {
    title: "Workshop Organize-$e",
    description:
      "Workshop ao vivo para mulheres organizarem as finanças com Rafaela Ribeiro e um plano prático de 30 dias.",
    type: "website",
    images: [
      {
        url: "/images/hero1.png",
        width: 1080,
        height: 1080,
        alt: "Workshop Organize-$e",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
