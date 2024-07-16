import fs from "node:fs/promises";
import path from "node:path";
import { parse as parseYaml } from "yaml";

export async function getMDXFilePaths(dir: string) {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  return dirents
    .filter((dirent) => dirent.isFile() && path.extname(dirent.name) === ".mdx")
    .map((dirent) => dirent.name);
}

export async function readMDXFile(filePath: string) {
  const rawContent = await fs.readFile(filePath, "utf-8");
  return parseFrontmatter(rawContent);
}

export function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);
  if (!match) throw new Error("No frontmatter found");
  const frontMatterBlock = match[1];
  const content = fileContent.replace(frontmatterRegex, "").trim();
  const frontmatter = parseYaml(frontMatterBlock);
  return { frontmatter, content };
}

export function getMDXData(dir: string) {
  return async (filePath: string) => {
    const { frontmatter, content } = await readMDXFile(
      path.join(dir, filePath),
    );
    const slug = path.basename(filePath, path.extname(filePath));
    return { frontmatter, content, slug };
  };
}

export async function getAllMDXData(dir: string) {
  const filePaths = await getMDXFilePaths(dir);
  const data = await Promise.all(filePaths.map(getMDXData(dir)));
  return data;
}
