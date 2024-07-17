"use client";

import { Hash } from "lucide-react";
import type { PropsWithChildren } from "react";
import { useHover } from "react-aria";
import { Link } from "react-aria-components";

import styles from "./heading.module.css";

function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

export const Heading = ({
  children,
  level,
}: PropsWithChildren<{ level: number }>) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  const { hoverProps, isHovered } = useHover({});

  if (typeof children !== "string") {
    return <Tag>{children}</Tag>;
  }

  const slug = slugify(children);

  return (
    <Tag id={slug} {...hoverProps} className={styles.heading}>
      {children}
      <div className={styles.anchor}>
        <Link
          href={`#${slug}`}
          className={`${styles.link} ${isHovered ? "" : "sr-only"}`.trim()}
          aria-label="Link to this heading"
        >
          <Hash />
        </Link>
      </div>
    </Tag>
  );
};
