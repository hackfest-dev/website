'use client';
import { useEffect, useState } from 'react';
import Confetti from 'react-dom-confetti';

const config = {
  angle: 290,
  spread: 300,
  startVelocity: 40,
  elementCount: 50,
  dragFriction: 0.11,
  duration: 3020,
  stagger: 3,
  width: '8px',
  height: '14px',
  perspective: '503px',
  colors: ['#f00', '#0f0', '#00f', '#FFC700', '#FF0000', '#2E3191', '#41BBC7'],
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
    <div className="text-center flex justify-center flex-col">
      <h1 className="text-7xl md:text-9xl font-black text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
        Done!
      </h1>
      <Confetti active={show} config={config} />
      <p className="mt-4 text-gray-300 mb-5 text-md md:text-lg">
        Successfully Registered! We hope to see you on Top 60 soon.
      </p>
      <p className="mt-2 text-gray-300 mb-5 text-sm md:text-md">
        Keep an eye on your mail for further updates.{' '}
      </p>
    </div>
  );
};

export default Registered;
