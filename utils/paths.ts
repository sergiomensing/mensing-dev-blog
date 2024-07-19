export type Path = `/blog/${string}`;

export const getPostPath = (slug: string) => `/blog/${slug}` satisfies Path;
