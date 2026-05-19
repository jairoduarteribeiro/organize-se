import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
