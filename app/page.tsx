import { getPostPath } from "@/paths";
import { draftFilter, getAllPosts } from "@/posts";
import { Link } from "./components/link";

import styles from "./page.module.css";

export default async function Home() {
  const allPosts = await getAllPosts();

  return (
    <div className="container">
      <div className={`${styles.introduction} prose`}>
        <h1>Hi, i'm Sergio</h1>
        <p>Bla bla</p>
      </div>
      <hr />
      <div className={styles.writing}>
        <h2>Writing</h2>
        <ul className={styles.posts}>
          {allPosts
            .filter(draftFilter)
            .map(({ slug, frontmatter: { title, description } }) => (
              <article key={slug} role="listitem" className={styles.post}>
                <Link href={getPostPath(slug)}>
                  <h3>{title}</h3>
                </Link>
                {description && <p>{description}</p>}
              </article>
            ))}
        </ul>
      </div>
    </div>
  );
}
