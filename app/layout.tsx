import Link, { LinkProps } from "next/link";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ModeToggle } from "@/components/mode-toggle";
import { ComponentProps } from "react";
import { Metadata } from "next";

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

interface RootLayoutProps {
  children: React.ReactNode;
}

const NavLink = ({
  className,
  children,
  ...rest
}: ComponentProps<typeof Link>) => {
  return (
    <Link className={`hover:text-orange-600 ${className}`.trim()} {...rest}>
      {children}
    </Link>
  );
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`antialiased min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 ${inter.className}`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="max-w-2xl mx-auto py-10 px-4">
            <header className="text-sm">
              <div className="flex items-center gap-8">
                <Link href="/" className="underline">
                  mensing.dev
                </Link>
                <nav className="ml-auto font-medium flex items-center gap-6">
                  <NavLink href="/">Home</NavLink>
                  <NavLink href="/about">About</NavLink>
                </nav>
                <ModeToggle />
              </div>
            </header>
            <main>{children}</main>
          </div>
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
