'use client';

import React, { useState, useEffect } from 'react';
import { Zap, Clock } from 'lucide-react';

export default function RaceAlertBanner() {
  const [timeLeft, setTimeLeft] = useState({ minutes: 14, seconds: 28 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        }
        return { minutes: 15, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatSeconds = (s: number) => (s < 10 ? `0${s}` : `${s}`);

  return (
    <div className="px-screen py-compact">
      {/* Dynamic Discount Callout matching Screen 1 wireframe */}
      <div className="bg-gradient-to-r from-pitstop-brand via-[#c90500] to-pitstop-brand/80 border border-pitstop-brand/50 rounded-large p-standard shadow-card text-pitstop-text relative overflow-hidden">
        {/* Background circuit track graphic overlay */}
        <div className="absolute right-2 top-0 bottom-0 opacity-10 flex items-center pr-2 pointer-events-none font-display font-black text-6xl italic">
          F1
        </div>

        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-small">
            <div className="w-9 h-9 rounded-card bg-black/30 backdrop-blur-md flex items-center justify-center text-pitstop-text border border-white/20">
              <Zap className="w-5 h-5 fill-pitstop-price text-pitstop-price" />
            </div>
            <div>
              <div className="flex items-center gap-compact">
                <span className="font-display font-black text-body-large tracking-wide uppercase">
                  20% OFF PRACTICE 3 DROP ORDERS
                </span>
                <span className="bg-pitstop-price text-black text-label-compact font-display font-black px-compact py-micro rounded-tiny uppercase">
                  OFF-PEAK
                </span>
              </div>
              <p className="text-label text-white/90 font-medium">
                EatClub Dynamic Pricing • Order before Green Flag
              </p>
            </div>
          </div>

          <div className="text-right pl-small border-l border-white/20 shrink-0">
            <div className="text-label-compact uppercase font-bold text-white/80 flex items-center justify-end gap-micro">
              <Clock className="w-2.5 h-2.5 text-pitstop-price" />
              <span>Ends In</span>
            </div>
            <div className="text-compact-title font-display font-black tracking-wider text-pitstop-price">
              {timeLeft.minutes}:{formatSeconds(timeLeft.seconds)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
