interface SectionTitleProps {
  title: string;
}
const SectionTitle = ({ title }: SectionTitleProps) => {
  return (
    <h2 className="mb-2 mt-6 text-xs font-bold uppercase text-gray-500">
      {title}
    </h2>
  );
};

export default SectionTitle;
