import { getPostPath } from "@/paths";
import { draftFilter, getAllPosts } from "@/posts";
import Link from "next/link";
import { DraftTag } from "./components/draft-tag";

export default async function Home() {
  const allPosts = await getAllPosts();

  return (
    <div className="text-slate-900 dark:text-slate-50 py-10 space-y-4">
      <ul className="space-y-10">
        {allPosts.filter(draftFilter).map(({ slug, frontmatter: { title, description, draft } }) => (
          <article key={slug} role="listitem">
            <Link
              href={getPostPath(slug)}
              className="hover:text-orange-600 transition-colors hover:duration-75 duration-300"
            >
              <h2 className="font-semibold text-lg">
                {title}
                <DraftTag draft={draft} className="ml-2" />
              </h2>
            </Link>
            <p className="text-slate-600 dark:text-slate-400">{description}</p>
          </article>
        ))}
      </ul>
    </div>
  );
}
