export const DraftTag = ({
  draft,
  className = "",
}: {
  draft: boolean;
  className?: string;
}) => {
  if (!draft) return null;

  return (
    <span
      className={`bg-blue-100 text-blue-800 px-1 py-0.5 inline-flex rounded font-medium text-xs align-middle ${className}`}
    >
      DRAFT
    </span>
  );
};
