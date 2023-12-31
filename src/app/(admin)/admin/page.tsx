import DownloadDataButton from '@/src/components/downloadData';
import ParticipantsTable from '@/src/components/participantsTable';
import { prisma } from '@/src/lib/db';

export default async function Admin() {
  const res = await prisma.team.findMany({
    include: {
      members: {
        include: { college: true },
      },
    },
  });

  return (
    <>
      <div className="w-full border-b">
        <h1 className="text-4xl font-bold text-center my-10">Admin</h1>
      </div>
      <DownloadDataButton data={res} />
      <div className="overflow-x-scroll my-4 m-auto md:max-w-[70%]">
        <h1 className="text-2xl font-bold text-center my-10">Participants</h1>
        <ParticipantsTable data={res} />
      </div>
    </>
  );
}
