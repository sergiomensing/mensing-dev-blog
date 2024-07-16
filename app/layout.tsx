import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

import { NavLink } from "@/nav-link";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mensing.dev",
  description: "Mensing.dev | Personal Blog",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    noarchive: true,
    notranslate: true,
    nosnippet: true,
  },
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`antialiased min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 ${inter.className}`}
      >
        <div className="max-w-2xl mx-auto py-10 px-4">
          <header>
            <div className="flex items-center gap-8">
              <Link href="/" className="underline">
                Mensing.dev
              </Link>
              <nav className="ml-auto font-medium flex items-center gap-6">
                <NavLink href="/">Home</NavLink>
                <NavLink href="/about">About</NavLink>
              </nav>
            </div>
          </header>
          <main>{children}</main>
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
