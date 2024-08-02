"use client";

import { Hash } from "lucide-react";
import { type PropsWithChildren, isValidElement } from "react";
import { useHover } from "react-aria";
import { Link } from "react-aria-components";

import styles from "./heading.module.css";

function getTextContentFromReactNode(
  node: React.ReactNode,
): string | undefined {
  if (typeof node === "string") {
    return node;
  }

  if (Array.isArray(node)) {
    return node.map(getTextContentFromReactNode).join("");
  }

  if (isValidElement(node) && node.props?.children) {
    return getTextContentFromReactNode(node.props.children);
  }

  return undefined;
}

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

  const textContent = getTextContentFromReactNode(children);
  if (!textContent) throw new Error("Heading must have text content");

  const { hoverProps, isHovered } = useHover({});

  const slug = slugify(textContent);

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
