import { cn } from "@/app/_lib/utils";

interface SectionTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  title: string;
}
const SectionTitle = ({ title, className }: SectionTitleProps) => {
  return (
    <h2
      className={cn(
        "mb-2 text-xs font-bold uppercase text-gray-500 xl:text-sm",
        className,
      )}
    >
      {title}
    </h2>
  );
};

export default SectionTitle;
