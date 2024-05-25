import { PostHeader, PostHeaderProps } from "./post-header";
import { PostContent } from "./post-content";
import { notFound } from "next/navigation";

export type PostLayoutProps = PostHeaderProps & {
  draft?: boolean;
};

export const PostLayout =
  ({ draft, ...rest }: PostLayoutProps) =>
  ({ children }: { children: React.ReactNode }) => {
    if (draft && process.env.NODE_ENV === "production") {
      return notFound();
    }

    return (
      <article className="py-12">
        {draft && (
          <span className="bg-blue-100 text-blue-800 px-1 py-0.5 mb-4 inline-flex rounded font-medium text-sm">
            DRAFT
          </span>
        )}
        <PostHeader {...rest} />
        <PostContent>{children}</PostContent>
      </article>
    );
  };
