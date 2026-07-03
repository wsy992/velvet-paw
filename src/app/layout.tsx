import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import { BottomNav } from "@/components/ui/bottom-nav";
import { SwRegister } from "@/components/pwa-register";

const nunitoSans = Nunito_Sans({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Velvet Paw - 奶盖的电子伴侣",
  description: "记录奶盖的每一天，AI 陪伴成长",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Velvet Paw",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`${nunitoSans.variable}`}>
      <head>
        <meta name="theme-color" content="#fff8f4" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-180.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/icons/icon-167.png" />
      </head>
      <body className="min-h-dvh bg-background-warm text-text-main font-sans antialiased pb-[calc(88px+env(safe-area-inset-bottom))] md:pb-0">
        <SwRegister />
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
