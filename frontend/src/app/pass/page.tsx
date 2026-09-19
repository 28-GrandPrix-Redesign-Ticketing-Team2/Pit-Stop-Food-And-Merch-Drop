'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { QRCodeSVG } from 'qrcode.react';
import { useCart } from '../../context/CartContext';
import Header from '../../components/Header';
import { CheckCircle2, ArrowLeft, Clock, ShieldCheck, Check } from 'lucide-react';

export default function OrderPassPage() {
  const { activeOrder, clearActiveOrder } = useCart();
  const [offlineSaved, setOfflineSaved] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(240); // 4 min countdown

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatCountdown = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const order = activeOrder || {
    orderId: 'GP-8821',
    pinCode: '8821',
    qrPayload: 'AUSGP-2026-PITSTOP-PASS-GP-8821-M2-04',
    pickupStation: {
      id: 'M2',
      name: 'Pit Stop M2 (Turn 9 East)',
      locationDetails: 'Directly behind Clark Grandstand, Entry Gate 3',
      counterNumber: '#04',
      walkTimeMins: 2,
    },
    items: [
      { item: { name: 'APEX BURGER', price: 16.50, image: '/images/burger.jpg' }, quantity: 1 },
      { item: { name: 'CRAFT LAGER 4-PACK', price: 36.00, image: '/images/beer.jpg' }, quantity: 1 },
    ],
    total: 42.00,
    status: 'READY_FOR_PICKUP' as const,
  };

  const fallbackDigits = (order.pinCode.length >= 4 ? order.pinCode : '829X').slice(0, 4).split('');

  return (
    <div className="min-h-screen bg-pitstop-background text-pitstop-text flex flex-col items-center">
      <div className="w-full max-w-[430px] flex flex-col min-h-screen bg-pitstop-background border-x border-pitstop-border shadow-raised relative pb-12">
        <Header />

        {/* Back Link & Order Ref */}
        <div className="px-screen pt-compact flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-micro text-body text-pitstop-text-secondary hover:text-pitstop-text font-display font-bold uppercase tracking-wider transition-colors min-h-tap"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Menu</span>
          </Link>
          <span className="text-label font-mono text-pitstop-text-secondary bg-pitstop-surface px-small py-micro rounded-small border border-pitstop-border">
            REF: {order.orderId}
          </span>
        </div>

        {/* Figma Section 05: Live Status Overlines (ORDER READY) */}
        <div className="px-screen pt-compact">
          <div className="bg-pitstop-surface border-2 border-pitstop-success rounded-large p-standard shadow-card text-center">
            <div className="flex items-center justify-center gap-compact">
              <Check className="w-6 h-6 text-pitstop-success" />
              <h2 className="font-display font-black text-section-title text-pitstop-success tracking-wider uppercase">
                ORDER READY
              </h2>
            </div>
            <p className="text-body text-pitstop-text-secondary mt-1 font-medium">
              Collect immediately at <span className="text-pitstop-text font-bold">{order.pickupStation.name}</span>
            </p>
          </div>
        </div>

        {/* Figma Section 08: Navigation & Pickup - QR + NUMERIC PICKUP FALLBACK */}
        <div className="px-screen pt-compact">
          <div className="bg-pitstop-surface border border-pitstop-border rounded-large p-standard space-y-standard shadow-card">
            {/* Top Bar of Pass */}
            <div className="flex items-center justify-between">
              <span className="px-small py-micro rounded-tiny bg-pitstop-brand text-pitstop-text font-display font-black text-label-compact tracking-wider uppercase">
                PICKUP CODE
              </span>
              <span className="font-display font-black text-body text-pitstop-price uppercase tracking-wider">
                {order.pickupStation.id} • {order.pickupStation.walkTimeMins} MIN WALK
              </span>
            </div>

            {/* Dynamic QR Code */}
            <div className="flex justify-center">
              <div className="bg-white p-small rounded-large border-4 border-black shadow-card">
                <QRCodeSVG
                  value={order.qrPayload}
                  size={175}
                  level="H"
                  includeMargin={false}
                />
              </div>
            </div>

            {/* Numeric Fallback Boxes (Section 08: 8 | 2 | 9 | X) */}
            <div className="space-y-compact text-center">
              <div className="font-display font-black text-label text-pitstop-text-secondary uppercase tracking-wider">
                Numeric Fallback
              </div>
              <div className="grid grid-cols-4 gap-compact px-compact">
                {fallbackDigits.map((char, index) => (
                  <div
                    key={index}
                    className="bg-pitstop-background border border-pitstop-border rounded-card py-small font-display font-black text-screen-title text-pitstop-text tracking-widest shadow-card"
                  >
                    {char}
                  </div>
                ))}
              </div>
              <p className="text-label text-pitstop-text-secondary mt-1">
                Show this code at the pickup window if the QR is not scanning.
              </p>
            </div>

            {/* Locker & Countdown Details */}
            <div className="border-t border-pitstop-border pt-compact flex items-center justify-between text-body">
              <div>
                <span className="text-pitstop-text-secondary block text-label-compact uppercase font-bold">Locker / Counter</span>
                <span className="font-display font-black text-compact-title text-pitstop-text font-mono">
                  {order.pickupStation.counterNumber}
                </span>
              </div>
              <div className="text-right">
                <span className="text-pitstop-text-secondary block text-label-compact uppercase font-bold flex items-center justify-end gap-micro">
                  <Clock className="w-3 h-3 text-pitstop-price" />
                  <span>Locker Reserved</span>
                </span>
                <span className="font-display font-black text-body-large text-pitstop-price">
                  {formatCountdown(secondsRemaining)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Offline Cache & Actions */}
        <div className="px-screen pt-standard space-y-compact">
          <button
            onClick={() => setOfflineSaved(true)}
            className={`w-full min-h-tap py-small rounded-large border text-body font-display font-bold uppercase tracking-wider flex items-center justify-center gap-compact transition-all ${
              offlineSaved
                ? 'bg-pitstop-success/15 border-pitstop-success text-pitstop-success shadow-card'
                : 'bg-pitstop-surface border-pitstop-border text-pitstop-text hover:bg-neutral-900'
            }`}
          >
            {offlineSaved ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-pitstop-success" />
                <span>Saved Offline (Zero Cell Reception Mode Active)</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-5 h-5 text-pitstop-success" />
                <span>Save Pass to Offline Wallet</span>
              </>
            )}
          </button>

          {activeOrder && (
            <button
              onClick={() => clearActiveOrder()}
              className="w-full min-h-tap py-compact rounded-large bg-pitstop-surface/60 border border-pitstop-border text-pitstop-text-secondary hover:text-pitstop-text text-label font-display font-bold uppercase tracking-wider text-center transition-colors"
            >
              Order Collected • Start New Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
