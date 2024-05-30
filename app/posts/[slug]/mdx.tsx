import { evaluate } from "@mdx-js/mdx";
import { Code } from "bright";
import Image from "next/image";
import Link from "next/link";
import { ComponentProps, createElement } from "react";
import * as runtime from "react/jsx-runtime";

Code.theme = "github-dark";
Code.lineNumbers = true;

function CustomLink(props: ComponentProps<"a">) {
  const href = String(props.href);

  if (href.startsWith("/")) {
    return (
      <Link {...props} href={href}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a {...props} href={href} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} href={href} />;
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

function createHeading(level: number) {
  return ({ children }) => {
    let slug = slugify(children);
    return createElement(
      `h${level}`,
      { id: slug },
      [
        createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        }),
      ],
      children
    );
  };
}

let components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: Image,
  pre: Code,
  a: CustomLink,
};

export async function CustomMDX(props: { source: string }) {
  const { default: MDXContent } = await evaluate(props.source, runtime);
  return (
    <>
      {/* @ts-ignore */}
      <MDXContent components={components} />
    </>
  );
}
