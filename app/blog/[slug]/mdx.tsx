import { Sandpack } from "@codesandbox/sandpack-react";
import { evaluate } from "@mdx-js/mdx";
import { Code } from "bright";
import { ChevronDown, ExternalLink } from "lucide-react";
import Image from "next/image";
import * as runtime from "react/jsx-runtime";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@/components/disclosure";
import { Link } from "../../components/link";
import { Heading } from "./heading";
import { Video } from "./video";

Code.theme = "github-from-css";
Code.lineNumbers = true;
Code.style = { borderRadius: 6 };

function CustomLink(props: React.ComponentProps<"a">) {
  if (props.href?.startsWith("/")) {
    return (
      <Link {...props} href={props.href}>
        {props.children}
      </Link>
    );
  }

  if (props.href?.startsWith("#")) {
    return <Link {...props} href={props.href} />;
  }

  return (
    <Link
      target="_blank"
      rel="noopener noreferrer"
      href={props.href}
      {...props}
    >
      {props.children}
      <ExternalLink size="1em" />
    </Link>
  );
}

const components = {
  h1: (props) => <Heading {...props} level={1} />,
  h2: (props) => <Heading {...props} level={2} />,
  h3: (props) => <Heading {...props} level={3} />,
  h4: (props) => <Heading {...props} level={4} />,
  h5: (props) => <Heading {...props} level={5} />,
  h6: (props) => <Heading {...props} level={6} />,
  Image: Image,
  Video: Video,
  pre: (props) => <Code {...props} />,
  a: CustomLink,
  Sandpack: Sandpack,
  Source: ({ children }) => children,
  DisclosureButton: (props) => (
    <DisclosureButton
      className={`${props.className} disclosure-button`.trim()}
      {...props}
    >
      <ChevronDown />
      {props.children}
    </DisclosureButton>
  ),
  DisclosurePanel: (props) => (
    <DisclosurePanel
      className={`${props.className} disclosure-panel`.trim()}
      {...props}
    />
  ),
  Disclosure: (props) => (
    <Disclosure className={`${props.className} disclosure`.trim()} {...props} />
  ),
};

export async function CustomMDX(props: { source: string }) {
  const { default: MDXContent } = await evaluate(props.source, runtime);
  return <MDXContent components={components} />;
}
