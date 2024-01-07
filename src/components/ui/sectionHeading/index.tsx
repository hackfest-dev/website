export const SectionHeading: React.FC<{
  title: string;
  classname?: string;
}> = ({ title, classname }) => {
  return (
    <h2
      className={
        "text-6xl font-bold bg-gradient-to-r from-primary-300 to-secondary-500 bg-clip-text text-transparent w-fit font-jumper " +
        classname
      }
    >
      {title}
    </h2>
  );
};
