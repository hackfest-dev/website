import { api } from "~/utils/api";
import TeamDetails from "~/components/forms/teamInfo";
import CreateTeam from "~/components/forms/createTeam";
import { Profile } from "~/components/profile";
import NotLoggedIn from "~/components/notLoggedIn";
import RootLayout from "~/components/layout";
import { Car, Loader2Icon } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import Confetti from "react-dom-confetti";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Tracks } from "@prisma/client";
import Spinner from "~/components/spinner";
import NotFound from "../404";

export default function Results() {
    const topTeams = api.team.getTop60.useQuery().data;

    const config = {
        angle: 290,
        spread: 300,
        startVelocity: 40,
        elementCount: 50,
        dragFriction: 0.11,
        duration: 4020,
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

   

    const [show, setShow] = useState(false);
   

    const ConfettiExplosion = () => {
        setShow(true);
        setTimeout(() => setShow(false), 1000);
    };

    useEffect(() => {
        if(topTeams)
        ConfettiExplosion();
    }, [topTeams]);
    
    return(
        <NotFound />
    )

    return (
        <RootLayout>
            <div className="text-center text-5xl min-h-screen bg-gradient-to-b from-[#060e3c] via-[#052d4f] to-[#001933] py-20">
               {topTeams && <div className="flex flex-col gap-4 pt-12 pb-12">
                <div className=" font-semibold px-4 text-3xl md:text-5xl">Congratulations!</div>
               <div className="text-base md:text-lg px-4">Here are the top teams selected for Hackfest 2024, See y&apos;all at NMAMIT!</div>
               </div>}
                <div className="flex justify-center items-center w-full"><Confetti active={show} config={config} /></div>
                {!topTeams ? (<div className="flex items-center gap-2 text-xl top-1/2 left-1/2 absolute translate-x-[-50%] translate-y-[-50%]">
                    <div>Loading...</div>
                    <Spinner/>
                    </div>) :(
                    <div className="px-10 flex flex-row flex-wrap justify-center items-center gap-10">
                        
                                {topTeams?.map((team) => (
                                    <Card key={team.id} className="w-80 h-60 text-center py-4 items-center justify-center">
                                        <div className="flex flex-col justify-center items-center gap-2">
                                            <div className="text-2xl font-semibold">{team.name}</div>
                                            <div className="text-sm opacity-60">{team.members[0]?.college?.name}</div>
                                        </div> 
                                    </Card>
                                ))}
                            
                    </div>)
                }
                {topTeams && <div className="text-sm mx-8 mt-20 opacity-60">It was hard for us to shortlist the top ideas, because of all the quality ideas we received. It was based on multiple criterias like innovation, creativite features, relevance to track, market fit, feasibility, existing solution comparision etc. If your team didn&apos;t make it to top, don&apos;t worry, bounce back stronger at Hackfest 2025! See you there.</div>}
            </div>
        </RootLayout>
    )
            }