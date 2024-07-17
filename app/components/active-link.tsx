"use client";

import { usePathname } from "next/navigation";
import { Link, type LinkProps } from "react-aria-components";

export const ActiveLink = (props: LinkProps) => {
  const pathname = usePathname();

  return (
    <Link
      {...props}
      aria-current={props.href === pathname ? "page" : undefined}
    />
  );
};
