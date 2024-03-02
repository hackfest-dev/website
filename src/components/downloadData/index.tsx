import { type inferRouterOutputs } from "@trpc/server";
import { type TeamsData } from "../../types";
import { api } from "~/utils/api";


export default function DownloadDataButtons(){
  const data = api.user.getAllUsers.useQuery().data;
  
  function usersNotInTeam(){
    let csv = '';
    const Headers = 'Name,Email,\n';
    csv+=Headers;

    data?.map((user) => {
      if(!user?.teamId){
        csv+=`${user.name}`+','+`${user.email}`+','+'\n';
      }
    })

    return csv;
  }

  function teamLeadersWithSubmission(){
    let csv = '';
    const Headers = 'Name,Phone,Email,\n';
    csv+=Headers;

    data?.map((user) => {
      if(user?.isLeader && user?.profileProgress === 'COMPLETE'){
        csv+=`${user.name}`+','+`${user.phone}`+','+`${user.email}`+','+'\n';
      }
    })

    return csv;
  }
  function teamLeadersWithoutSubmission(){
    let csv = '';
    const Headers = 'Name,Phone,Email,\n';
    csv+=Headers;

    data?.map((user) => {
      if(user?.isLeader && user?.profileProgress !== 'COMPLETE'){
        csv+=`${user.name}`+','+`${user.phone}`+','+`${user.email}`+','+'\n';
      }
    })

    return csv;
  }
  return(
    <>
      <button
        onClick={async () => {
          const data = usersNotInTeam();
          const url = window.URL.createObjectURL(new Blob([data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "Not_In_Team_Emails.csv");
          document.body.appendChild(link);
          link.click();
          link.remove();
        }}
        className="float-right mb-2 rounded bg-white p-3 text-center font-bold text-black "
      >
        Users Not in Team
      </button>
      <button
        onClick={async () => {
          const data = teamLeadersWithSubmission();
          const url = window.URL.createObjectURL(new Blob([data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "TeamLeaders_With_Submission.csv");
          document.body.appendChild(link);
          link.click();
          link.remove();
        }}
        className="float-right mb-2 rounded bg-white p-3 text-center font-bold text-black "
      >
        Team Leaders with submission
      </button>
      <button
        onClick={async () => {
          const data = teamLeadersWithoutSubmission();
          const url = window.URL.createObjectURL(new Blob([data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "TeamLeaders_Without_Submission.csv");
          document.body.appendChild(link);
          link.click();
          link.remove();
        }}
        className="float-right mb-2 rounded bg-white p-3 text-center font-bold text-black "
      >
        Team Leaders without submission
      </button>
    </>
  )
}