import { LinkIcon } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Link } from "@/components/link";
import { draftFilter, getAllPosts } from "@/posts";
import { CustomMDX } from "./mdx";
import styles from "./page.module.css";

export const dynamic = "error";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const post = (await getAllPosts()).find((post) => post.slug === slug);

  if (!post) {
    return notFound();
  }

  const { title, date: publishedTime, description } = post.frontmatter;
  const ogImage = `https://www.mensing.dev/og?title=${title}`;

  return {
    title: `${post.frontmatter.title} | Sergio Mensing`,
    description: post.frontmatter.description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `https://www.mensing.dev/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  } satisfies Metadata;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export type PostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = (await getAllPosts()).find((post) => post.slug === slug);

  if (!post || !draftFilter(post)) {
    return notFound();
  }

  const { title, description, sources } = post.frontmatter;

  return (
    <div className={`${styles.page} container`}>
      <div className="prose">
        <h1 className={styles.title}>{title}</h1>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      <article className={`${styles.layout} prose`}>
        {/* @ts-ignore */}
        <CustomMDX source={post.content} />
      </article>
      {sources && (
        <div className={styles.sources}>
          <h2>Sources</h2>
          <ol>
            {sources.map((source, index) => (
              <li key={source.url} id={`sources-${index + 1}`}>
                <sup>{index + 1}.</sup>
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href={source.url}
                >
                  {source.icon ? (
                    <Image
                      src={`/icons/${source.icon}`}
                      width={20}
                      height={20}
                      alt=""
                      role="presentation"
                    />
                  ) : (
                    <LinkIcon size={16} role="presentation" />
                  )}

                  {source.name && <strong>{source.name}</strong>}
                  <span>{source.title}</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
