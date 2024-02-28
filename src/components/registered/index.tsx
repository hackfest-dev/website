import { useEffect, useState } from "react";
import Confetti from "react-dom-confetti";

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

const Registered = () => {
  const [show, setShow] = useState(false);

  const ConfettiExplosion = () => {
    setShow(true);
    setTimeout(() => setShow(false), 1000);
  };

  useEffect(() => {
    ConfettiExplosion();
  }, []);

  return (
    <div className="flex flex-col justify-center text-center">
      <h1 className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-7xl font-black text-transparent md:text-9xl">
        Done!
      </h1>
      <Confetti active={show} config={config} />
      <p className="text-md mb-5 mt-4 text-gray-300 md:text-lg">
        Successfully Registered! We hope to see you on Top 60 soon.
      </p>
      <p className="md:text-md mb-5 mt-2 text-sm text-gray-300">
        Keep an eye on your mail for further updates.{" "}
      </p>
    </div>
  );
};

export default Registered;
