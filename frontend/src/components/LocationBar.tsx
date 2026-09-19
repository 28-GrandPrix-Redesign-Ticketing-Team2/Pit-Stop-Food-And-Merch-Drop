'use client';

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { VIEWING_LOCATIONS } from '../data/dropPoints';
import { Ticket, MapPin, ChevronDown, CheckCircle2, AlertTriangle, Flag } from 'lucide-react';

export default function LocationBar() {
  const { selectedLocation, setSelectedLocation, selectedDropPoint, setSelectedDropPoint } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Figma 04 Display Cards: Ticket Verified Banner & Wayfinding Pinhead */}
      <div className="bg-pitstop-background border-b border-pitstop-border px-screen py-compact space-y-compact">
        {/* Ticket Verification Pill */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-compact px-small py-micro rounded-full bg-pitstop-surface border border-pitstop-border">
            <Ticket className="w-3.5 h-3.5 text-pitstop-brand" />
            <span className="font-display font-black text-label tracking-wider text-pitstop-text uppercase">
              TICKET VERIFIED: GP-3820-X
            </span>
          </div>

          <div className="flex items-center gap-micro">
            <span className="inline-block w-2 h-2 rounded-full bg-pitstop-success animate-ping" />
            <span className="text-label-compact uppercase font-bold text-pitstop-success tracking-wider font-display">
              DISPATCH ACTIVE
            </span>
          </div>
        </div>

        {/* Wayfinding Bar with M2 ACTIVE Pill */}
        <button
          onClick={() => setIsOpen(true)}
          className="w-full min-h-tap flex items-center justify-between p-compact rounded-large bg-pitstop-surface border border-pitstop-border hover:border-neutral-600 transition-all text-left shadow-card"
        >
          <div className="flex items-center gap-small">
            <div className="w-8 h-8 rounded-card bg-pitstop-brand/15 text-pitstop-brand flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <div className="text-label-compact text-pitstop-text-secondary uppercase font-semibold tracking-wider">
                Viewing Zone & Station
              </div>
              <div className="text-body font-bold text-pitstop-text flex items-center gap-compact">
                <span>{selectedLocation.name} ({selectedLocation.turn})</span>
                <span className="px-compact py-micro rounded-small bg-pitstop-brand text-pitstop-text font-display font-black text-label-compact tracking-wider uppercase">
                  {selectedDropPoint.id} ACTIVE
                </span>
                <span className="text-label-compact text-pitstop-price font-display font-black tracking-wider">
                  {selectedDropPoint.walkTimeMins} MIN WALK
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-micro text-label font-display font-bold uppercase tracking-wider text-pitstop-text-secondary bg-pitstop-background px-small py-micro rounded-small border border-pitstop-border">
            <span>Change</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </div>
        </button>
      </div>

      {/* Live Queue Balancer Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-standard animate-in fade-in duration-200">
          <div className="bg-pitstop-surface border border-pitstop-border w-full max-w-[430px] rounded-t-large sm:rounded-large max-h-[90vh] flex flex-col shadow-raised">
            {/* Header */}
            <div className="p-standard border-b border-pitstop-border flex items-center justify-between">
              <div>
                <h2 className="text-card-title font-display font-black text-pitstop-text uppercase tracking-wider flex items-center gap-compact">
                  <span>📍 Select Pickup Point</span>
                </h2>
                <p className="text-label text-pitstop-text-secondary mt-0.5">Live Drop-Point Queue Balancer</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-pitstop-background text-pitstop-text-secondary flex items-center justify-center text-body hover:bg-neutral-800"
              >
                ✕
              </button>
            </div>

            <div className="p-standard overflow-y-auto space-y-standard">
              {/* Grandstand Picker */}
              <div>
                <label className="text-label font-display font-black text-pitstop-text-secondary uppercase tracking-wider block mb-compact">
                  1. Where are you seated?
                </label>
                <div className="grid grid-cols-2 gap-compact">
                  {VIEWING_LOCATIONS.map((loc) => {
                    const isSelected = loc.id === selectedLocation.id;
                    return (
                      <button
                        key={loc.id}
                        onClick={() => setSelectedLocation(loc)}
                        className={`min-h-tap p-small rounded-card border text-left transition-all ${
                          isSelected
                            ? 'bg-pitstop-brand/20 border-pitstop-brand text-pitstop-text shadow-card'
                            : 'bg-pitstop-background border-pitstop-border text-pitstop-text-secondary hover:bg-neutral-900'
                        }`}
                      >
                        <div className="text-body font-bold leading-tight">{loc.name}</div>
                        <div className="text-label-compact text-pitstop-text-secondary mt-0.5 font-mono">{loc.turn}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Live Queue Balancer Cards */}
              <div>
                <label className="text-label font-display font-black text-pitstop-text-secondary uppercase tracking-wider block mb-compact">
                  2. Choose Express Drop Station:
                </label>
                <div className="space-y-compact">
                  {selectedLocation.dropPoints.map((dp) => {
                    const isChosen = dp.id === selectedDropPoint.id;
                    const isFastest = dp.status === 'fastest';

                    return (
                      <div
                        key={dp.id}
                        onClick={() => setSelectedDropPoint(dp)}
                        className={`p-standard rounded-large border cursor-pointer transition-all ${
                          isFastest
                            ? 'bg-pitstop-success/10 border-pitstop-success/80 hover:bg-pitstop-success/15'
                            : 'bg-pitstop-urgent/10 border-pitstop-urgent/70 hover:bg-pitstop-urgent/15'
                        } ${isChosen ? 'ring-2 ring-white ring-offset-2 ring-offset-pitstop-surface' : ''}`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-compact">
                              <span className="font-display font-black text-compact-title text-pitstop-text uppercase tracking-wide">
                                {dp.name}
                              </span>
                              {isFastest && (
                                <span className="bg-pitstop-success text-black text-label-compact font-display font-black px-compact py-micro rounded-tiny uppercase tracking-wider">
                                  Fastest
                                </span>
                              )}
                            </div>
                            <div className="text-body text-pitstop-text-secondary mt-1">
                              • Estimated Walk: <span className="font-semibold text-pitstop-text">{dp.walkTimeMins} mins</span>
                            </div>
                            <div className="text-body text-pitstop-text-secondary">
                              • Queue Wait: <span className="font-semibold text-pitstop-text">{dp.queueWaitMins}</span>
                            </div>
                            <div className="text-label text-pitstop-text-secondary mt-0.5">
                              • Counter / Locker: <span className="text-pitstop-price font-mono font-bold">{dp.counterNumber}</span> ({dp.availableLockers} lockers available)
                            </div>
                            {!isFastest && (
                              <div className="text-label text-pitstop-price font-medium mt-compact flex items-center gap-micro">
                                <AlertTriangle className="w-3.5 h-3.5 text-pitstop-price" />
                                <span>Heavy congestion: suggest using fastest recommended station</span>
                              </div>
                            )}
                          </div>

                          <div className="mt-1">
                            {isChosen ? (
                              <CheckCircle2 className="w-5 h-5 text-pitstop-success" />
                            ) : (
                              <div className="w-5 h-5 rounded-full border-2 border-neutral-600" />
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Confirm button (Figma Section 03: Confirm Zone & Enter Menu) */}
            <div className="p-standard border-t border-pitstop-border">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full min-h-tap py-small rounded-large bg-pitstop-brand hover:bg-[#c90500] text-pitstop-text font-display font-black text-body-large uppercase tracking-wider flex items-center justify-center gap-compact shadow-raised transition-all active:scale-[0.99]"
              >
                <Flag className="w-4 h-4 fill-white" />
                <span>Confirm Zone & Enter Menu</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
