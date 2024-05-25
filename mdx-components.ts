import type { MDXComponents } from "mdx/types";
import { Code } from "bright";

Code.theme = {
  light: "github-dark-dimmed",
  dark: "github-dark",
  lightSelector: "html.light",
};

Code.lineNumbers = true;

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    pre: Code,
  };
}
