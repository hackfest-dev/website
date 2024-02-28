import { type TeamsData } from "../../types";

const DownloadDataButton = ({ data }: { data: TeamsData[] }) => {
  const Participants = (teamsData: TeamsData[]): string => {
    let csv = "Team Name,College,Team Leader,Member Count,Members\n";

    teamsData.forEach((team) => {
      const { name, members } = team;

      const leader = members.find((member) => member.isLeader === true)?.name;
      const college = members[0]?.college?.name;
      const memberCount = members.length;

      const membersInfo = members
        .map((member) => `${member.name}, ${member.email}, ${member.phone}`)
        .join("\n");

      csv += `${name},${college},${leader},${memberCount},"${membersInfo}"\n`;
    });

    return csv;
  };
  const IdeaSubmissions = (teamsData: TeamsData[]): string => {
    let csv = "Team Name,Track,Problem Statement,PPT URL\n";

    teamsData.forEach((team) => {
      const { name, ideaSubmission } = team;

      csv += `${name},${ideaSubmission?.track},${ideaSubmission?.problemStatement},${ideaSubmission?.pptUrl}"\n`;
    });

    return csv;
  };
  const Referrals = (teamsData: TeamsData[]): string => {
    let csv = "Team Name,Referrer,Code\n";

    teamsData.forEach((team) => {
      const { name, referral } = team;
      if (referral?.code)
        csv += `${name},${referral?.referrer},${referral?.code}"\n`;
    });

    return csv;
  };

  return (
    <>
      <button
        onClick={async () => {
          const csvData = Participants(data);
          const url = window.URL.createObjectURL(new Blob([csvData]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "teams.csv");
          document.body.appendChild(link);
          link.click();
          link.remove();
        }}
        className="float-right mb-2 rounded bg-white p-3 text-center font-bold text-black "
      >
        Download Participants Data
      </button>
      <button
        onClick={async () => {
          const csvData = IdeaSubmissions(data);
          const url = window.URL.createObjectURL(new Blob([csvData]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "teams.csv");
          document.body.appendChild(link);
          link.click();
          link.remove();
        }}
        className="float-right mb-2 rounded bg-white p-3 text-center font-bold text-black "
      >
        Download Idea Submissions
      </button>
      <button
        onClick={async () => {
          const csvData = Referrals(data);
          const url = window.URL.createObjectURL(new Blob([csvData]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "teams.csv");
          document.body.appendChild(link);
          link.click();
          link.remove();
        }}
        className="float-right mb-2 rounded bg-white p-3 text-center font-bold text-black "
      >
        Download Referrals Data
      </button>
    </>
  );
};

export default DownloadDataButton;
