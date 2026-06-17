import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Nav } from "@/components/ui/Nav";
import { PersonJsonLd } from "@/components/ui/JsonLd";
import { SITE_URL } from "@/content/site";
import { STORAGE_KEY, THEME_IDS } from "@/content/themes";
import "./globals.css";

// Pre-paint theme init (no FOUC): applies the persisted theme to <html> before
// React hydrates, so the page never flashes the default indigo first. Inlined
// from the single THEME_IDS source so it can't drift from the registry.
const themeInit = `(function(){try{var t=localStorage.getItem(${JSON.stringify(
  STORAGE_KEY,
)});if(t&&${JSON.stringify(
  THEME_IDS,
)}.indexOf(t)>-1){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`;

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  weight: ["500", "700"],
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  weight: ["400"],
  subsets: ["latin"],
});

const description =
  "Production FastAPI/Go services, RAG pipelines that survive free-tier rate limits, and long-horizon agent infrastructure. Bengaluru.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ishan Kumar — Backend & AI Engineer",
    template: "%s · Ishan Kumar",
  },
  description,
  authors: [{ name: "Ishan Kumar" }],
  openGraph: {
    type: "website",
    title: "Ishan Kumar — Backend & AI Engineer",
    description,
    url: SITE_URL,
    siteName: "Ishan Kumar",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@kuma10296",
    title: "Ishan Kumar — Backend & AI Engineer",
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: the themeInit script sets data-theme on <html>
    // before React hydrates, so the attribute intentionally differs from SSR.
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <PersonJsonLd />
        <a href="#main" className="skip-link">
          skip to content
        </a>
        <ThemeProvider>
          <Nav />
          <SmoothScroll>{children}</SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
