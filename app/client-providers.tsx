"use client";

import { useRouter } from "next/navigation";
import { RouterProvider } from "react-aria-components";

// See: https://react-spectrum.adobe.com/react-aria/routing.html#app-router

declare module "react-aria-components" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

export function ClientProviders({ children }) {
  const router = useRouter();
  return <RouterProvider navigate={router.push}>{children}</RouterProvider>;
}
