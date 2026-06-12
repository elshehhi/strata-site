import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { LOCALES, dirFor, getDict, isLocale, type Locale } from "@/lib/i18n";
import "../globals.css";

/* The three voices (DESIGN_SPEC.md §E) — bundled SIL-OFL variable faces,
   the same files the application itself ships. Never fetched at runtime.
   Like the app: the Latin display faces apply in LTR only (globals.css);
   Arabic text renders in the system Arabic stack, JetBrains numerals in
   both directions. */
const fraunces = localFont({
  src: "../fonts/fraunces-var.woff2",
  variable: "--font-fraunces",
  weight: "100 900",
  display: "swap",
});
const interTight = localFont({
  src: "../fonts/inter-tight-var.woff2",
  variable: "--font-inter-tight",
  weight: "100 900",
  display: "swap",
});
const jetbrains = localFont({
  src: "../fonts/jetbrains-mono-var.woff2",
  variable: "--font-jetbrains",
  weight: "100 800",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://strata.photography";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang: Locale = isLocale(params.lang) ? params.lang : "ar";
  const t = getDict(lang);
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t.meta.title, template: "%s · STRATA" },
    description: t.meta.description,
    keywords: [
      "focus stacking",
      "landscape photography",
      "depth of field",
      "RAW processing",
      "macro photography",
      "photography software",
      "تكديس البؤرة",
      "تصوير المناظر الطبيعية",
    ],
    authors: [{ name: "Ahmed Alshehhi" }],
    alternates: {
      languages: { ar: "/ar", en: "/en" },
    },
    openGraph: {
      type: "website",
      siteName: "STRATA",
      title: t.meta.title,
      description: t.meta.description,
      images: [{ url: "/screens/en_00_strata_hero.png", width: 1920, height: 888 }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
    },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: "#0B0A08",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  if (!isLocale(params.lang)) notFound();
  const lang: Locale = params.lang;

  return (
    <html lang={lang} dir={dirFor(lang)}>
      <body
        className={`${fraunces.variable} ${interTight.variable} ${jetbrains.variable} font-sans grain vignette`}
      >
        {children}
      </body>
    </html>
  );
}
