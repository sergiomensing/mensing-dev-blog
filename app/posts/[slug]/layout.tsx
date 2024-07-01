export type PostPageLayoutProps = { children: React.ReactNode };

export default async function PostPageLayout({ children }: PostPageLayoutProps) {
  return <article className="py-12">{children}</article>;
}
