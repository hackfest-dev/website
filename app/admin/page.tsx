'use client';
import ParticipantsTable from '@/components/participantsTable';
import { getTeamsList } from '../_actions';
import { useEffect, useState } from 'react';
import { downloadList } from '../_actions';
import { Team, User, College } from '@prisma/client';

export default function Admin() {
  type members = User & { college: College | null };
  type data = Team & { members: members[] };
  const [data, setData] = useState<data[]>([]);
  const [downloadData, setdownloadData] = useState<string>('');
  useEffect(() => {
    (async () => {
      const res = await getTeamsList();
      setData(res);
    })();
  }, []);
  useEffect(() => {
    if (!downloadData) return;
    const url = window.URL.createObjectURL(new Blob([downloadData]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'teams.csv');
    document.body.appendChild(link);
    link.click();
    link.remove();
  }, [downloadData]);
  return (
    <>
      <div className="w-full border-b">
        <h1 className="text-4xl font-bold text-center my-10">Admin</h1>
      </div>

      <div className="overflow-x-scroll my-4 m-auto md:max-w-[70%]">
        <div className="">
          <h1 className="text-2xl font-bold text-center my-10">Participants</h1>
          <button
            onClick={async () => {
              const res = await downloadList();
              if (res.message == 'success' && res.csv) setdownloadData(res.csv);
              else alert('Something went wrong');
            }}
            className="text-black p-3 mb-2 rounded float-right bg-white font-bold text-center "
          >
            Download
          </button>
        </div>
        <ParticipantsTable data={data} />
      </div>
    </>
  );
}
