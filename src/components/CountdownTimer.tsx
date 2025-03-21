
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

interface CountdownTimerProps {
  targetDate: Date;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const isMobile = useIsMobile();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex justify-center items-center w-full px-2 sm:px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-10 text-center w-full"
      >
        <div className="flex flex-col items-center">
          <div className={`text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] xl:text-[12rem] font-serif mb-1 sm:mb-3 text-white font-light leading-none`}>
            {timeLeft.days.toString().padStart(2, '0')}
          </div>
          <div className="uppercase text-xs sm:text-sm md:text-lg tracking-widest text-white">Days</div>
        </div>
        
        <div className="flex flex-col items-center">
          <div className={`text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] xl:text-[12rem] font-serif mb-1 sm:mb-3 text-white font-light leading-none`}>
            {timeLeft.hours.toString().padStart(2, '0')}
          </div>
          <div className="uppercase text-xs sm:text-sm md:text-lg tracking-widest text-white">Hours</div>
        </div>
        
        <div className="flex flex-col items-center">
          <div className={`text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] xl:text-[12rem] font-serif mb-1 sm:mb-3 text-white font-light leading-none`}>
            {timeLeft.minutes.toString().padStart(2, '0')}
          </div>
          <div className="uppercase text-xs sm:text-sm md:text-lg tracking-widest text-white">Minutes</div>
        </div>
        
        <div className="flex flex-col items-center">
          <div className={`text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] xl:text-[12rem] font-serif mb-1 sm:mb-3 text-white font-light leading-none`}>
            {timeLeft.seconds.toString().padStart(2, '0')}
          </div>
          <div className="uppercase text-xs sm:text-sm md:text-lg tracking-widest text-white">Seconds</div>
        </div>
      </motion.div>
    </div>
  );
}
