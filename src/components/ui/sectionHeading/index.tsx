import FadeIn from "../../fadeInAnimation";

export const SectionHeading: React.FC<{
  title: string;
  classname?: string;
}> = ({ title, classname }) => {
  return (
    <FadeIn>
      <h2
        className={
          "text-4xl md:text-6xl font-bold bg-gradient-to-r from-base-300 to-supporting-500 bg-clip-text text-transparent w-fit font-obscura text-center md:text-left " +
          classname
        }
      >
        {title}
      </h2>
    </FadeIn>
  );
};
