'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { Ticket, Radio } from 'lucide-react';

export default function Header() {
  const { activeOrder } = useCart();

  return (
    <header className="sticky top-0 z-30 bg-pitstop-background/95 backdrop-blur-md border-b border-pitstop-border px-screen py-small">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-compact">
          <div className="w-8 h-8 rounded-card bg-pitstop-brand flex items-center justify-center font-display font-black text-pitstop-text text-sm tracking-tighter shadow-card">
            F1
          </div>
          <div>
            <div className="flex items-center gap-micro">
              <span className="font-display font-black text-pitstop-text text-compact-title tracking-wide uppercase">
                Pit Stop Food & Merch Drop
              </span>
            </div>
            <div className="flex items-center gap-micro text-label-compact text-pitstop-text-secondary font-medium tracking-wide">
              <Radio className="w-2.5 h-2.5 text-pitstop-success animate-pulse" />
              <span>Albert Park Grand Prix Circuit • Live</span>
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-compact">
          {activeOrder ? (
            <Link
              href="/pass"
              className="min-h-tap px-small rounded-full bg-pitstop-brand/20 border border-pitstop-brand text-pitstop-text text-label font-display font-bold uppercase tracking-wider flex items-center gap-micro hover:bg-pitstop-brand/30 transition-all animate-pulse"
            >
              <Ticket className="w-3.5 h-3.5 text-pitstop-price" />
              <span>Pass #{activeOrder.pinCode}</span>
            </Link>
          ) : (
            <div className="px-compact py-micro rounded-small bg-pitstop-brand text-pitstop-text font-display font-black text-label-compact tracking-wider uppercase">
              UI SPEC V1.0
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
