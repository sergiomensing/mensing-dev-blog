import Link from "next/link";
import { ComponentProps } from "react";

export const NavLink = ({
  className,
  children,
  ...rest
}: ComponentProps<typeof Link>) => {
  return (
    <Link className={`hover:text-orange-600 ${className}`.trim()} {...rest}>
      {children}
    </Link>
  );
};
