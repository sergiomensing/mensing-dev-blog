import path from "node:path";
import z from "zod";
import { getAllMDXData } from "./mdx";

export const contentDir = path.join(process.cwd(), "content");

export const postFrontmatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string().date(),
  modified: z.string().date().optional(),
  draft: z.boolean().default(false),
  tags: z.array(z.string()).optional(),
  readTime: z.number().optional(),
  sources: z
    .array(z.object({ title: z.string(), url: z.string().url() }))
    .optional(),
});

export const getAllPosts = async () => {
  const data = await getAllMDXData(contentDir);
  return data.map(({ frontmatter, content, slug }) => {
    const parsedFrontmatter = postFrontmatterSchema.parse(frontmatter);
    return { frontmatter: parsedFrontmatter, content, slug };
  });
};

export const draftFilter = (post: { frontmatter: { draft: boolean } }) => {
  if (process.env.NODE_ENV === "production") {
    return !post.frontmatter.draft;
  }

  return true;
};
