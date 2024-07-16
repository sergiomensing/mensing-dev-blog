import Link from "next/link";
import type { ComponentProps } from "react";

export const NavLink = (props: ComponentProps<typeof Link>) => {
  const { className, children, ...rest } = props;

  return (
    <Link className={`hover:text-orange-600 ${className}`.trim()} {...rest}>
      {children}
    </Link>
  );
};
