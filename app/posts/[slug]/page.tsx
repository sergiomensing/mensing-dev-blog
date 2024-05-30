import { draftFilter, getAllPosts } from "@/posts";
import { notFound } from "next/navigation";
import { PostHeader } from "./post-header";
import { CustomMDX } from "./mdx";
import { DraftTag } from "@/components/draft-tag";

export type PostPageProps = {
  params: {
    slug: string;
  };
};

export default async function PostPage({ params: { slug } }: PostPageProps) {
  const post = (await getAllPosts()).find((post) => post.slug === slug);

  if (!post || !draftFilter(post)) {
    return notFound();
  }

  const { title, description, draft } = post.frontmatter;

  return (
    <>
      <DraftTag draft={draft} className="mb-4" />
      <PostHeader title={title} description={description} />
      <div className="prose dark:prose-invert">
        <CustomMDX source={post.content} />
      </div>
    </>
  );
}
