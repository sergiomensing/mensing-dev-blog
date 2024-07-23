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
      <img
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
    <div className="container">
      <div className={styles.introduction}>
        <h1>
          👋<br />
          Hi, I'm Sergio
        </h1>
        <p>
          Currently working at{" "}
          <IconLink
            name="Arcady"
            icon="arcady.svg"
            href="https://www.arcady.nl/"
          />{" "}
          helping clients like{" "}
          <IconLink name="Univé" icon="univé.svg" href="https://unive.nl/" />,{" "}
          <IconLink
            name="Shell Recharge"
            icon="shell-recharge.svg"
            href="https://www.shell.nl/"
          />{" "}
          and{" "}
          <IconLink
            name="The Learning Network"
            icon="tln.jpg"
            href="https://www.learningnetwork.nl/"
          />{" "}
          make the most out of their frontends.
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
