export type PostHeaderProps = {
  title: string;
  description?: string;
};

export const PostHeader = ({ title, description }: PostHeaderProps) => {
  return (
    <>
      <h1 className="mb-2 font-bold text-3xl">{title}</h1>
      {description && <p className="text-xl mt-0 text-slate-700 dark:text-slate-200">{description}</p>}
      <hr className="my-4" />
    </>
  );
};
