import { getAllPosts } from "@/posts";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://mensing.dev";

  const getUrl = (path = "") => `${baseUrl}${path}`;

  const posts = await getAllPosts();

  return [
    {
      url: getUrl(),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: getUrl("/about"),
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    ...posts.map<MetadataRoute.Sitemap[number]>((post) => ({
      url: getUrl(`/posts/${post.slug}`),
      lastModified: new Date(post.frontmatter.modified || post.frontmatter.date),
      changeFrequency: "yearly",
      priority: 0.8,
    })),
  ];
}
