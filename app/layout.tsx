import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClientProviders } from "./client-providers";
import { ActiveLink } from "./components/active-link";
import { Link } from "./components/link";

import styles from "./layout.module.css";
import "./styles/style.css";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Sergio Mensing",
  description: "Personal Blog of Sergio Mensing | Mensing.dev",
  metadataBase: new URL("https://www.mensing.dev/"),
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
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: This is a safe use of dangerouslySetInnerHTML
          dangerouslySetInnerHTML={{
            __html: `
if (window.matchMedia) {
  const colorScheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

  document.documentElement.setAttribute("data-theme", colorScheme);

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (event) => {
      const newColorScheme = event.matches ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", newColorScheme);
    });
}`,
          }}
        />
      </head>
      <body>
        <ClientProviders>
          <header className={`${styles.header} container`}>
            <Link href="/" className={styles.logo}>
              <Image
                src="/images/me.jpeg"
                width={36}
                height={36}
                priority
                alt=""
                role="presentation"
              />
              Mensing.dev
            </Link>
            <nav className={styles.nav}>
              <ActiveLink className={styles["nav-link"]} href="/">
                Home
              </ActiveLink>
              <ActiveLink className={styles["nav-link"]} href="/work">
                Work
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
