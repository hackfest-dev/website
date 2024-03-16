import { api } from "~/utils/api";
import TeamDetails from "~/components/forms/teamInfo";
import CreateTeam from "~/components/forms/createTeam";
import { Profile } from "~/components/profile";
import NotLoggedIn from "~/components/notLoggedIn";
import RootLayout from "~/components/layout";
import { Car, Loader2Icon } from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";
import Confetti from "react-dom-confetti";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Results() {
const topTeams = api.superValidator.getTop60.useQuery().data;

    const config = {
        angle: 290,
        spread: 300,
        startVelocity: 40,
        elementCount: 50,
        dragFriction: 0.11,
        duration: 3020,
        stagger: 3,
        width: "8px",
        height: "14px",
        perspective: "503px",
        colors: ["#f00", "#0f0", "#00f", "#FFC700", "#FF0000", "#2E3191", "#41BBC7"],
      };
      
    
        const ref = useRef(null);
        // useEffect(() => {
        //   if (isInView) {
        //     ConfettiExplosion();
        //   }
        // }, [isInView]);
      
        useGSAP(() => {
          gsap.to(ref.current, {
            scrollTrigger: {
              trigger: ref.current,
              start: "top 75%",
              onEnter: () => ConfettiExplosion(),
            },
          });
        });
      
        const [show, setShow] = useState(false);
      
        const ConfettiExplosion = () => {
          setShow(true);
          setTimeout(() => setShow(false), 1000);
        };

  return (
    <RootLayout>
        <div
            className="bg-gradient-to-b from-[#060e3c] via-[#052d4f] to-[#001933]"
            style={{
                    background:
                    "url('/images/noise.svg') repeat,linear-gradient(180deg, #060e3c 0%, #052d4f 30%, #001933 100%)",
            }}
        >
            <Confetti active={true} config={config} />
            <div className="md:px-auto mx-auto flex min-h-screen w-full max-w-4xl flex-col justify-center gap-2 p-3 pb-10 pt-28 md:pb-20">
                    {topTeams ? (
                            
                            <div>{topTeams.map((team)=>{
                                return <>
                            <div className="flex h-96 items-center justify-center">
                                <div>
                                    <div className="flex flex-col md:flex-row justify-center items-center  border-gray-700 rounded-2xl p-4 max-w-6xl mx-auto bg-gradient-to-tl from-slate-800 to-slate-950 shadow-xl shadow-gray-950">
                                        
                                        <div className="flex flex-col justify-center w-full gap-4">
                                            <p className="xl:text-3xl md:text-2xl text-xl font-medium text-center">
                                                {team.name}
                                            </p>
                                            <div className="flex flex-col md:flex-row justify-between md:justify-evenly items-center gap-4">
                                                <h2 className=" w-full md:w-1/3 rounded-lg text-lg font-medium p-1 text-center">
                                                    {team.members.map((member)=>member.college).join(", ")}
                                                </h2>
                                                <h2 className=" w-full md:w-1/3  rounded-lg text-lg font-medium p-1">
                                                    {team.members.map((member)=>member.isLeader).join(", ")}
                                                </h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                </>
                            })}</div>
                    ) : (
                            
                            <div>Loading...</div>
                    )}
            </div>
        </div>
    </RootLayout>
  );
}
