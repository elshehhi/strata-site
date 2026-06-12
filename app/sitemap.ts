import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://strata.photography";

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number): MetadataRoute.Sitemap[number][] =>
    (["ar", "en"] as const).map((l) => ({
      url: `${SITE_URL}/${l}${path}`,
      changeFrequency: "monthly" as const,
      priority,
      alternates: {
        languages: {
          ar: `${SITE_URL}/ar${path}`,
          en: `${SITE_URL}/en${path}`,
        },
      },
    }));

  return [
    ...page("", 1),
    ...page("/pricing", 0.8),
    ...page("/download", 0.8),
    ...page("/privacy", 0.3),
    ...page("/terms", 0.3),
  ];
}
