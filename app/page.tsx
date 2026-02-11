import Image from "next/image";
import { getPostPath } from "@/paths";
import { draftFilter, getAllPosts } from "@/posts";
import { Link } from "./components/link";

import styles from "./page.module.css";

const IconLink = (props: { name: string; icon: string; href: string }) => {
  return (
    <Link
      target="_blank"
      rel="noopener noreferrer"
      href={props.href}
      className={styles["icon-link"]}
    >
      <Image
        src={`/icons/${props.icon}`}
        role="presentation"
        width={20}
        height={20}
        alt={`${props.name} icon`}
      />
      {props.name}
    </Link>
  );
};

export default async function Home() {
  const allPosts = await getAllPosts();

  return (
    <div className={styles.container}>
      <div className={styles.introduction}>
        <h1>Sergio Mensing</h1>
        <p>
          Software developer focusing on web technologies. Created user-friendly
          software at{" "}
          <IconLink
            name="Arcady"
            icon="arcady.svg"
            href="https://www.arcady.nl/"
          />
          , now{" "}
          <span className={styles.tag}>
            <span aria-hidden="true">🌎</span> traveling
          </span>{" "}
          Latin America.
        </p>
      </div>
      <hr />
      <div className={styles.writing}>
        <h2>Writing</h2>
        <ul className={styles.posts}>
          {allPosts
            .filter(draftFilter)
            .map(({ slug, frontmatter: { title, description } }) => (
              <li key={slug}>
                <Link href={getPostPath(slug)} className={styles.post}>
                  <h3>{title}</h3>
                  {description && <p>{description}</p>}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
