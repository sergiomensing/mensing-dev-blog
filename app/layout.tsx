import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClientProviders } from "./client-providers";
import { ActiveLink } from "./components/active-link";
import { Link } from "./components/link";

import styles from "./layout.module.css";
import "./styles/style.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

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
    <html lang="en" className={inter.variable}>
      <body>
        <ClientProviders>
          <header className={`${styles.header} container`}>
            <Link href="/" className={styles.logo}>
              Mensing.dev
            </Link>
            <nav className={styles.nav}>
              <ActiveLink className={styles["nav-link"]} href="/">
                Home
              </ActiveLink>
              <ActiveLink className={styles["nav-link"]} href="/about">
                About
              </ActiveLink>
            </nav>
          </header>
          <main>{children}</main>
        </ClientProviders>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
