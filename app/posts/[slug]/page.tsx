import { getAllPosts } from "@/posts";
import { notFound } from "next/navigation";
import { PostHeader } from "./post-header";
import { CustomMDX } from "./mdx";

export type PostPageProps = {
  params: {
    slug: string;
  };
};

export default async function PostPage({ params: { slug } }: PostPageProps) {
  const post = (await getAllPosts()).find((post) => post.slug === slug);
  if (!post) {
    return notFound();
  }

  const { title, description, draft } = post.frontmatter;

  return (
    <>
      {draft && (
        <span className="bg-blue-100 text-blue-800 px-1 py-0.5 mb-4 inline-flex rounded font-medium text-sm">
          DRAFT
        </span>
      )}
      <PostHeader title={title} description={description} />
      <div className="prose dark:prose-invert">
        {/* @ts-expect-error awaitable component */}
        <CustomMDX source={post.content} />
      </div>
    </>
  );
}
