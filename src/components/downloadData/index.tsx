'use client';
import { TeamsData } from '@/src/types';

const DownloadDataButton = ({ data }: { data: TeamsData[] }) => {
  const convertToCSV = (teamsData: TeamsData[]): string => {
    let csv = 'Team Name,College,Team Leader,Member Count,Members\n';

    teamsData.forEach((team) => {
      const { name, members } = team;

      const leader = members.find((member) => member.isLeader === true)?.name;
      const college = members[0].college?.name;
      const memberCount = members.length;

      const membersInfo = members
        .map((member) => `${member.name}, ${member.email}, ${member.phone}`)
        .join('\n');

      csv += `${name},${college},${leader},${memberCount},"${membersInfo}"\n`;
    });

    return csv;
  };

  return (
    <button
      onClick={async () => {
        const csvData = convertToCSV(data);
        const url = window.URL.createObjectURL(new Blob([csvData]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'teams.csv');
        document.body.appendChild(link);
        link.click();
        link.remove();
      }}
      className="text-black p-3 mb-2 rounded float-right bg-white font-bold text-center "
    >
      Download
    </button>
  );
};

export default DownloadDataButton;
