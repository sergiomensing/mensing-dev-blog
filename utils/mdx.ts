import path from "node:path";
import fs from "node:fs/promises";

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
  const frontMatterBlock = match![1];
  const content = fileContent.replace(frontmatterRegex, "").trim();
  const frontMatterLines = frontMatterBlock.trim().split("\n");
  const frontmatter: { [x: string]: any } = {};

  frontMatterLines.forEach((line) => {
    const [key, ...valueArr] = line.split(": ");
    let value = valueArr.join(": ").trim();
    value = value.replace(/^['"](.*)['"]$/, "$1"); // Remove quotes
    frontmatter[key.trim()] = value;
  });

  return { frontmatter, content };
}

export function getMDXData(dir: string) {
  return async function (filePath: string) {
    const { frontmatter, content } = await readMDXFile(
      path.join(dir, filePath)
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
