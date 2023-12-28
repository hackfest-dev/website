import Image from 'next/image'
import Confetti from 'react-dom-confetti'
import { useState } from 'react';

const PrizePool = () => {
  const config = {
    angle: 290,
    spread: 360,
    startVelocity: 40,
    elementCount: 150,
    dragFriction: 0.11,
    duration: 3020,
    stagger: 3,
    width: "8px",
    height: "14px",
    perspective: "503px",
    colors: ['#f00', '#0f0', '#00f','#FFC700',
    '#FF0000',
    '#2E3191',
    '#41BBC7']
  };
  
  const [show, setShow] = useState(false);
  const ConfettiExplosion = () => {
    setShow(true);
    setTimeout(()=>setShow(false),1000)
  };
  
  return (
    <div className='min-h-screen flex flex-col  items-center bg-slate-950 p-12 space-y-16'>
      <div>
      <h1 className='text-5xl font-bold bg-gradient-to-r from-primary-300 to-secondary-500 bg-clip-text text-transparent'>Prize Pool</h1> 
        <Image src='/ufo.png'  width={250} height={200} alt='UFO' className='py-8 fly-up-down ease-in-out drop-shadow-xl overflow-hidden' onClick={()=>ConfettiExplosion()} />
        </div>
        <Confetti active={show} config={config} />
        <div className='flex flex-row justify-center items-center gap-36'>
          <div className='flex flex-col justify-center items-center bg-gradient-to-br from-slate-950  via-slate-700 to-slate-900 h-48 w-72 rounded-3xl'>
            <h1 className='font-bold bg-gradient-to-r from-amber-800 to-pink-500 bg-clip-text text-transparent text-4xl'>Winner</h1>
            <h2 className='text-3xl font-bold bg-gradient-to-r from-primary-300 to-secondary-500 bg-clip-text text-transparent'>$50000</h2>
          </div>
          <div className='flex flex-col justify-center items-center bg-gradient-to-br from-slate-950  via-slate-700 to-slate-900 h-48 w-72 rounded-3xl'><h1 className='font-bold bg-gradient-to-r from-amber-800 to-pink-500 bg-clip-text text-transparent text-4xl'>Winner</h1>
            <h2 className='text-3xl font-bold bg-gradient-to-r from-primary-300 to-secondary-500 bg-clip-text text-transparent'>$30000</h2></div>
          <div className='flex flex-col justify-center items-center bg-gradient-to-br from-slate-950  via-slate-700 to-slate-900 h-48 w-72 rounded-3xl'><h1 className='font-bold bg-gradient-to-r from-amber-800 to-pink-500 bg-clip-text text-transparent text-4xl'>Winner</h1>
            <h2 className='text-3xl font-bold bg-gradient-to-r from-primary-300 to-secondary-500 bg-clip-text text-transparent'>$30000</h2></div>
        </div>
    </div>  
  )
}

export default PrizePool    