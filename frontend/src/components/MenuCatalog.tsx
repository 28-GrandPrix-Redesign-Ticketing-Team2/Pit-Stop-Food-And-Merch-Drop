'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MENU_ITEMS, MenuCategory } from '../data/menu';
import { useCart } from '../context/CartContext';
import { Plus, Minus, Users, Check, Trophy, Medal, Lock, Target, Flame, Sparkles } from 'lucide-react';

export default function MenuCatalog() {
  const [activeTab, setActiveTab] = useState<MenuCategory>('food');
  const { cart, addToCart, updateQuantity, isGroupOrder, setIsGroupOrder, isDiscountActive, dynamicDiscountPct } = useCart();

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search).get('tab') as MenuCategory;
      if (p === 'merch' || p === 'rewards' || p === 'food') {
        setActiveTab(p);
      }
    }
  }, []);

  const filteredItems = MENU_ITEMS.filter((item) => item.category === activeTab);

  const getItemQuantity = (itemId: string) => {
    const found = cart.find((ci) => ci.item.id === itemId);
    return found ? found.quantity : 0;
  };

  return (
    <div className="px-screen pb-28 space-y-standard">
      {/* Figma Section 08: Navigation Tabs (FOOD, MERCH, REWARDS) */}
      <div className="grid grid-cols-3 gap-compact bg-pitstop-surface p-micro rounded-large border border-pitstop-border shadow-card">
        <button
          onClick={() => setActiveTab('food')}
          className={`min-h-tap rounded-card font-display font-black text-body tracking-wider uppercase transition-all ${
            activeTab === 'food'
              ? 'bg-pitstop-brand text-pitstop-text shadow-raised'
              : 'text-pitstop-text-secondary hover:text-pitstop-text'
          }`}
        >
          Food
        </button>

        <button
          onClick={() => setActiveTab('merch')}
          className={`min-h-tap rounded-card font-display font-black text-body tracking-wider uppercase transition-all ${
            activeTab === 'merch'
              ? 'bg-pitstop-brand text-pitstop-text shadow-raised'
              : 'text-pitstop-text-secondary hover:text-pitstop-text'
          }`}
        >
          Merch
        </button>

        <button
          onClick={() => setActiveTab('rewards')}
          className={`min-h-tap rounded-card font-display font-black text-body tracking-wider uppercase transition-all flex items-center justify-center gap-micro ${
            activeTab === 'rewards'
              ? 'bg-pitstop-brand text-pitstop-text shadow-raised'
              : 'text-pitstop-text-secondary hover:text-pitstop-text'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-pitstop-price" />
          <span>Rewards</span>
        </button>
      </div>

      {/* When FOOD or MERCH is active: show Group Order toggle & Product Cards */}
      {activeTab !== 'rewards' ? (
        <>
          {/* Group Order Callout (Wireframe Screen 1) */}
          <div className="p-small rounded-large bg-pitstop-surface border border-pitstop-border flex items-center justify-between shadow-card">
            <div className="flex items-center gap-small">
              <div className="w-9 h-9 rounded-card bg-pitstop-location/20 text-pitstop-location flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="text-body font-display font-black text-pitstop-text uppercase tracking-wide flex items-center gap-compact">
                  <span>Group Order: 1 Collector for Seat</span>
                  <span className="text-label-compact bg-pitstop-location/20 text-pitstop-location font-bold px-compact py-micro rounded-tiny border border-pitstop-location/30">
                    SMART
                  </span>
                </div>
                <p className="text-label text-pitstop-text-secondary">
                  Pick up for your entire row in 1 single locker trip
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsGroupOrder(!isGroupOrder)}
              className={`min-w-tap min-h-tap rounded-card border flex items-center justify-center transition-all ${
                isGroupOrder
                  ? 'bg-pitstop-location border-pitstop-location text-white shadow-card'
                  : 'border-pitstop-border bg-pitstop-background text-transparent'
              }`}
            >
              <Check className="w-4 h-4" />
            </button>
          </div>

          {/* Figma Section 04: Display Cards */}
          <div className="space-y-compact">
            {filteredItems.map((item) => {
              const qty = getItemQuantity(item.id);
              const discountedPrice = isDiscountActive
                ? (item.price * (100 - dynamicDiscountPct)) / 100
                : item.price;

              return (
                <div
                  key={item.id}
                  className="bg-pitstop-surface border border-pitstop-border rounded-large p-small flex gap-small hover:border-neutral-600 transition-all shadow-card"
                >
                  {/* Left High-Res Food/Merch Photo */}
                  <div className="w-20 h-20 rounded-card overflow-hidden relative shrink-0 bg-pitstop-background border border-pitstop-border">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  {/* Middle Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-micro">
                        <h3 className="font-display font-black text-pitstop-text text-compact-title tracking-wide uppercase leading-tight">
                          {item.name}
                        </h3>
                        {/* Price in Electric Yellow (#DFFF19) */}
                        <div className="text-right shrink-0">
                          <span className="font-display font-black text-compact-title text-pitstop-price tracking-wide">
                            ${discountedPrice.toFixed(2)}
                          </span>
                          {isDiscountActive && (
                            <div className="text-label-compact text-pitstop-text-secondary line-through font-mono">
                              ${item.price.toFixed(2)}
                            </div>
                          )}
                        </div>
                      </div>

                      <p className="text-label text-pitstop-text-secondary mt-0.5 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-compact flex items-center justify-between">
                      {/* Tag Pill */}
                      {item.tag ? (
                        <span className="text-label-compact font-display font-black uppercase px-compact py-micro rounded-tiny bg-pitstop-brand text-pitstop-text tracking-wider">
                          {item.tag}
                        </span>
                      ) : (
                        <span className="text-label-compact text-pitstop-text-secondary font-mono">
                          {item.prepTime}
                        </span>
                      )}

                      {/* Figma Section 03: QTY Stepper Component */}
                      {qty === 0 ? (
                        <button
                          onClick={() => addToCart(item)}
                          className="min-h-tap px-small rounded-card bg-pitstop-brand hover:bg-[#c90500] text-pitstop-text font-display font-black text-body uppercase tracking-wider flex items-center gap-micro shadow-card transition-all active:scale-95"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add</span>
                        </button>
                      ) : (
                        <div className="min-h-tap flex items-center bg-pitstop-background border border-pitstop-border rounded-card p-micro">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 rounded-small text-pitstop-text-secondary flex items-center justify-center hover:bg-neutral-800 active:scale-90"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="font-display font-black text-body text-pitstop-text min-w-7 text-center uppercase tracking-wider">
                            {qty} QTY
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 rounded-small bg-pitstop-brand text-pitstop-text flex items-center justify-center hover:bg-[#c90500] active:scale-90"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        /* Figma Section 07: Gamification System (Rewards View) */
        <div className="space-y-compact">
          {/* Rewards Points Header Card */}
          <div className="bg-pitstop-surface border border-pitstop-border rounded-large p-standard text-center relative overflow-hidden shadow-card">
            <div className="inline-flex items-center gap-micro px-small py-micro rounded-full bg-pitstop-price/10 border border-pitstop-price/30 text-pitstop-price text-label-compact font-display font-bold uppercase tracking-wider mb-compact">
              <Sparkles className="w-3 h-3" />
              <span>EatClub & Liven Loyalty Model</span>
            </div>
            <div className="font-display font-black text-screen-title text-pitstop-text tracking-wide">
              1,850 <span className="text-pitstop-price">FAN CLUB PTS</span>
            </div>
            <p className="text-body text-pitstop-text-secondary mt-1">
              Worth <span className="text-pitstop-text font-bold">$18.50 Trackside Credit</span> on future food & merch drops
            </p>
          </div>

          {/* Figma Spec Sheet 07 Badges & Tier Cards */}
          <div className="space-y-compact">
            {/* VIP FAN - Pro Tier Active */}
            <div className="p-standard rounded-large bg-pitstop-surface border border-pitstop-brand/70 shadow-card">
              <div className="flex items-center justify-between">
                <span className="px-compact py-micro rounded-tiny bg-pitstop-brand text-pitstop-text font-display font-black text-label-compact tracking-wider uppercase">
                  PRO TIER ACTIVE
                </span>
                <span className="text-label font-display font-black text-pitstop-price uppercase tracking-wider">
                  10% CASHBACK ON FOOD
                </span>
              </div>
              <div className="flex items-center gap-small mt-compact">
                <div className="w-9 h-9 rounded-full bg-pitstop-brand/20 text-pitstop-brand flex items-center justify-center shrink-0">
                  <Medal className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-display font-black text-card-title text-pitstop-text uppercase tracking-wide">
                    VIP FAN
                  </div>
                  <div className="text-label text-pitstop-text-secondary">Your top rewards tier active all weekend</div>
                </div>
              </div>
            </div>

            {/* SPEEDY PICKUP - Earned Badge */}
            <div className="p-standard rounded-large bg-pitstop-surface border border-pitstop-border shadow-card">
              <div className="flex items-center justify-between">
                <span className="px-compact py-micro rounded-tiny bg-pitstop-success/20 text-pitstop-success font-display font-black text-label-compact tracking-wider uppercase border border-pitstop-success/30">
                  EARNED BADGE
                </span>
                <span className="text-body font-display font-black text-pitstop-price uppercase tracking-wider">
                  +500 PTS
                </span>
              </div>
              <div className="flex items-center gap-small mt-compact">
                <div className="w-9 h-9 rounded-full bg-pitstop-success/20 text-pitstop-success flex items-center justify-center shrink-0">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-display font-black text-card-title text-pitstop-text uppercase tracking-wide">
                    SPEEDY PICKUP
                  </div>
                  <div className="text-label text-pitstop-text-secondary">Picked up an order in under 3 minutes</div>
                </div>
              </div>
            </div>

            {/* ORDER STREAK - In Progress */}
            <div className="p-standard rounded-large bg-pitstop-surface border border-pitstop-border shadow-card">
              <div className="flex items-center justify-between">
                <span className="px-compact py-micro rounded-tiny bg-pitstop-location/20 text-pitstop-location font-display font-black text-label-compact tracking-wider uppercase border border-pitstop-location/30">
                  IN PROGRESS
                </span>
                <span className="text-label font-display font-black text-pitstop-text-secondary uppercase tracking-wider">
                  3 OF 5 DONE
                </span>
              </div>
              <div className="flex items-center gap-small mt-compact">
                <div className="w-9 h-9 rounded-full bg-pitstop-location/20 text-pitstop-location flex items-center justify-center shrink-0">
                  <Flame className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-display font-black text-card-title text-pitstop-text uppercase tracking-wide">
                    ORDER STREAK
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full bg-pitstop-background h-2 rounded-full mt-compact overflow-hidden">
                    <div className="bg-pitstop-brand h-full rounded-full" style={{ width: '60%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* EARLY BIRD - Earned Badge */}
            <div className="p-standard rounded-large bg-pitstop-surface border border-pitstop-border shadow-card">
              <div className="flex items-center justify-between">
                <span className="px-compact py-micro rounded-tiny bg-pitstop-success/20 text-pitstop-success font-display font-black text-label-compact tracking-wider uppercase border border-pitstop-success/30">
                  EARNED BADGE
                </span>
                <span className="text-body font-display font-black text-pitstop-price uppercase tracking-wider">
                  +500 PTS
                </span>
              </div>
              <div className="flex items-center gap-small mt-compact">
                <div className="w-9 h-9 rounded-full bg-pitstop-success/20 text-pitstop-success flex items-center justify-center shrink-0">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-display font-black text-card-title text-pitstop-text uppercase tracking-wide">
                    EARLY BIRD
                  </div>
                  <div className="text-label text-pitstop-text-secondary">Order before 11:00 AM trackside</div>
                </div>
              </div>
            </div>

            {/* WEEKEND WARRIOR - In Progress */}
            <div className="p-standard rounded-large bg-pitstop-surface border border-pitstop-border shadow-card">
              <div className="flex items-center justify-between">
                <span className="px-compact py-micro rounded-tiny bg-pitstop-location/20 text-pitstop-location font-display font-black text-label-compact tracking-wider uppercase border border-pitstop-location/30">
                  IN PROGRESS
                </span>
                <span className="text-label font-display font-black text-pitstop-text-secondary uppercase tracking-wider">
                  2 OF 3 DONE
                </span>
              </div>
              <div className="flex items-center gap-small mt-compact">
                <div className="w-9 h-9 rounded-full bg-pitstop-location/20 text-pitstop-location flex items-center justify-center shrink-0">
                  <Target className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-display font-black text-card-title text-pitstop-text uppercase tracking-wide">
                    WEEKEND WARRIOR
                  </div>
                  <div className="w-full bg-pitstop-background h-2 rounded-full mt-compact overflow-hidden">
                    <div className="bg-pitstop-brand h-full rounded-full" style={{ width: '66%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* GROUP HERO - Locked */}
            <div className="p-standard rounded-large bg-pitstop-surface/70 border border-pitstop-border opacity-70 shadow-card">
              <div className="flex items-center justify-between">
                <span className="px-compact py-micro rounded-tiny bg-neutral-800 text-neutral-400 font-display font-black text-label-compact tracking-wider uppercase">
                  LOCKED
                </span>
                <span className="text-body font-display font-black text-neutral-400 uppercase tracking-wider">
                  +1000 PTS
                </span>
              </div>
              <div className="flex items-center gap-small mt-compact">
                <div className="w-9 h-9 rounded-full bg-neutral-800 text-neutral-500 flex items-center justify-center shrink-0">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-display font-black text-card-title text-neutral-300 uppercase tracking-wide">
                    GROUP HERO
                  </div>
                  <div className="text-label text-neutral-500">Complete 5 group orders for your grandstand row</div>
                </div>
              </div>
            </div>

            {/* SNACK ATTACK - Locked */}
            <div className="p-standard rounded-large bg-pitstop-surface/70 border border-pitstop-border opacity-70 shadow-card">
              <div className="flex items-center justify-between">
                <span className="px-compact py-micro rounded-tiny bg-neutral-800 text-neutral-400 font-display font-black text-label-compact tracking-wider uppercase">
                  LOCKED
                </span>
                <span className="text-body font-display font-black text-neutral-400 uppercase tracking-wider">
                  +1000 PTS
                </span>
              </div>
              <div className="flex items-center gap-small mt-compact">
                <div className="w-9 h-9 rounded-full bg-neutral-800 text-neutral-500 flex items-center justify-center shrink-0">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-display font-black text-card-title text-neutral-300 uppercase tracking-wide">
                    SNACK ATTACK
                  </div>
                  <div className="text-label text-neutral-500">Order 3 snacks in one race day</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
