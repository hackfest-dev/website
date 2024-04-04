import { type NextPage } from "next";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "~/components/ui/button";

const StartTimer: NextPage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<HTMLDivElement>(null);

  const startTimer = async () => {
    if (!videoRef.current) return;
    if (!divRef.current) return;

    videoRef.current.style.display = "block";
    divRef.current.style.display = "none";
    await videoRef.current.play();

    videoRef.current.onended = () => {
      if (!videoRef.current) return;
      if (!divRef.current) return;
      if (!timerRef.current) {
        console.log("here");
        return;
      }

      videoRef.current.style.display = "none";
      timerRef.current.style.display = "flex";
    };
  };

  const [time, setTime] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
    miliseconds: number;
  }>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    miliseconds: 0,
  });

  function getRemaingTime() {
    const eventDate = new Date("2024-04-05T17:00:00").getTime();
    const currentDate = new Date().getTime();
    const remainingTime = eventDate - currentDate;

    const hours = Math.floor(
      (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );

    const minutes = Math.floor(
      (remainingTime % (1000 * 60 * 60)) / (1000 * 60),
    );

    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    const miliseconds = Math.floor(remainingTime % 1000);

    setTime({ hours, minutes, seconds, miliseconds });
  }

  useEffect(() => {
    getRemaingTime();
    const interval = setInterval(() => {
      getRemaingTime();
    }, 1);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="flex h-screen w-screen flex-col items-center justify-center"
      style={{
        background:
          "url('/images/noise.svg') repeat,linear-gradient(180deg, #060e3c 0%, #052d4f 30%, #001933 100%)",
      }}
    >
      <div ref={divRef} className="flex flex-col items-center justify-center">
        <h1 className="font-obscura text-9xl text-white">HACKFEST</h1>
        <Button
          variant="secondary"
          className="h-fit w-fit text-5xl"
          onClick={async () => {
            await startTimer();
          }}
        >
          START
        </Button>
      </div>

      <video
        ref={videoRef}
        src="./videos/hfLab.mp4"
        className="hidden h-full w-full object-cover"
      />

      <div className="flex flex-col items-center justify-center gap-5">
        <div className="text-center font-obscura text-9xl font-bold tracking-widest">
          Gotta run??
        </div>
        <div
          ref={timerRef}
          className="justify-even flex items-center gap-4 text-center"
        >
          <div className="flex min-w-52 flex-col items-center justify-center gap-0">
            <span className="items-center justify-center text-9xl font-bold">
              {time.hours.toString().padStart(2, "0")}
            </span>
            <span className="text-5xl font-semibold">H</span>
          </div>
          <div className="flex min-w-52 flex-col items-center justify-center gap-0">
            <span className="items-center justify-center text-9xl font-bold">
              {time.minutes.toString().padStart(2, "0")}
            </span>
            <span className="text-5xl font-semibold">M</span>
          </div>
          <div className="flex min-w-52 flex-col items-center justify-center gap-0">
            <span className="items-center justify-center text-9xl font-bold">
              {time.seconds.toString().padStart(2, "0")}
            </span>
            <span className="text-5xl font-semibold">S</span>
          </div>
          <div className="flex min-w-52 flex-col items-center justify-center gap-0">
            <span className="items-center justify-center text-9xl font-bold">
              {time.miliseconds.toString().substring(0, 2).padStart(2, "0")}
            </span>
            <span className="text-5xl font-semibold">M</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartTimer;
