import { prisma } from '@/src/lib/db';

export default async function Organiser() {
  const pCount = await prisma.user.count({
    where: {
      role: 'PARTICIPANT',
    },
  });

  const tCount = await prisma.team.count({
    where: {
      members: {
        some: {
          role: 'PARTICIPANT',
        },
      },
    },
  });

  const iCount = await prisma.ideaSubmission.count();

  return (
    <section>
      <div className="w-full border-b">
        <h1 className="text-4xl font-bold text-center my-10">
          Hello Organiser
        </h1>
      </div>
      <div className="overflow-x-scroll my-4 m-auto md:max-w-[70%] border rounded-xl p-5 flex flex-col justify-center items-center w-fit text-3xl gap-5">
        <p className="border-b w-full">Total Participants: {pCount}</p>
        <p className="border-b w-full">Total Teams: {tCount} </p>
        <p className="border-b w-full">Total Idea Submissions: {iCount}</p>
      </div>
      <div></div>
    </section>
  );
}
