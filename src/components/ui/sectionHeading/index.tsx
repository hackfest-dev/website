export const SectionHeading: React.FC<{
  title: string;
  classname?: string;
}> = ({ title, classname }) => {
  return (
    <h2
      className={
<<<<<<< HEAD
        "text-6xl font-bold bg-gradient-to-r from-primary-300 to-secondary-500 bg-clip-text text-transparent w-fit font-jumper " +
=======
        'text-5xl font-bold bg-gradient-to-r from-base-300 to-supporting-500 bg-clip-text text-transparent w-fit ' +
>>>>>>> ed5e07be9643766c2aaa6db90dc25a9b9b65868e
        classname
      }
    >
      {title}
    </h2>
  );
};
