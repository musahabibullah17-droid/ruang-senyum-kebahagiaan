import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import "@/styles/main.scss";
import { APP_NAME, APP_DESCRIPTION } from "@/lib/constants";
import BottomNav from "@/components/layout/BottomNav";
import NextTopLoader from "nextjs-toploader";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: `${APP_NAME} - Platform Donasi Sosial`,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  keywords: ["donasi", "crowdfunding", "sosial", "bantuan", "campaign", "Indonesia"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`h-full antialiased ${plusJakartaSans.variable}`}>
      <body className="min-h-full flex flex-col font-sans pb-16 md:pb-0">
        <NextTopLoader color="#0ea5e9" height={3} showSpinner={false} />
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
