"use client"
import Image from "next/image";
import Tilt from "react-parallax-tilt";

export const SponsorsTile: React.FC<{
    src: string,
    backcolor?:"gold"|"silver"|"bronze"|"platinum"|"diamond",
    alt?: string,
}> = ({ src, backcolor="bronze", alt = "" }) => {
    return (
        <Tilt
            tiltReverse={true}
            perspective={1000}
            scale={1.1}
            glareEnable={true}
            glareBorderRadius="1.5rem"
            glareMaxOpacity={0.3}
            glarePosition="all"
            style={{ transformStyle: "preserve-3d" }}
            className={backcolor==="diamond"?"[&>.glare-wrapper]:rotate-45":""}
        >
            <div
                className={`group bg-black p-5 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f] border-2 rounded-3xl
                ${backcolor==="gold"?"shadow-[#ffdf00] border-[#ffdf00]":""}
                ${backcolor==="silver"?"shadow-[#c0c0c0] border-[#c0c0c0]":""}
                ${backcolor==="bronze"?"shadow-[#CD7F32] border-[#CD7F32]":""}
                ${backcolor==="platinum"?"shadow-[#E5E4E2] border-[#E5E4E2]":""}
                ${backcolor==="diamond"?"shadow-[#B9F2FF] border-[#B9F2FF] rotate-45 transition-transform":""}
                `}
                style={{ transformStyle: "preserve-3d" }}
            >
                <div className={`opacity-0 select-none group-hover:opacity-100 transition-opacity duration-700 uppercase absolute -mx-5 m-auto text-center w-full h-full text-[28px]
                        ${backcolor==="platinum"?"text-[#E5E4E2]":""}
                        ${backcolor==="gold"?"text-[#ffdf00]":""}
                        ${backcolor==="silver"?"text-[#c0c0c0]":""}
                        ${backcolor==="bronze"?"text-[#CD7F32]":""}
                        ${backcolor==="diamond"?"text-[#B9F2FF] text-shadow-[0_4px_4px_rgb(0,69,71)] duration-700 -rotate-45 -translate-y-10 -translate-x-5":""}`}>
                            {
                                backcolor==="diamond"?"DIAMOND"
                                :backcolor==="platinum"?"PLATIUM"
                                :backcolor==="gold"?"GOLD"
                                :backcolor==="silver"?"SILVER"
                                :backcolor==="bronze"?"BRONZE"
                                :<></>
                            }
                            {/* <br></br>
                            TIER */}
                </div>
                <Image
                    src={src}
                    alt={alt}
                    width={96}
                    height={96}
                    className={`w-[80px] select-none h-[80px] rounded-lg group-hover:translate-z-20 group-hover:translate-y-10 transition-transform duration-1000 ${backcolor==="diamond"?"-rotate-45 translate-y-[0px_!important]":""}`}
                ></Image>
            </div>
        </Tilt>
    );
};
