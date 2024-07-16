import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://mensing.dev";

  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
