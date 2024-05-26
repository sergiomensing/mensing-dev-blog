export type Path = `/posts/${string}`;

export const getPostPath = (slug: string) => `/posts/${slug}` satisfies Path;
