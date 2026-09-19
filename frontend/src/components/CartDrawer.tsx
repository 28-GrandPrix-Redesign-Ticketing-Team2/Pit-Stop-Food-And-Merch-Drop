'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Plus, Minus, ArrowRight, ShieldCheck, Zap, Award, Flag } from 'lucide-react';

export default function CartDrawer() {
  const { cart, cartCount, total, subtotal, discountAmount, updateQuantity, selectedDropPoint, createOrder } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  if (cartCount === 0) return null;

  const handleCheckout = () => {
    createOrder();
    setIsOpen(false);
    router.push('/pass');
  };

  const loyaltyPoints = Math.round(total * 2);

  return (
    <>
      {/* Floating Bottom Cart Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-standard bg-gradient-to-t from-black via-black/90 to-transparent pointer-events-none">
        <div className="max-w-[430px] mx-auto pointer-events-auto">
          <button
            onClick={() => setIsOpen(true)}
            className="w-full min-h-tap bg-pitstop-brand hover:bg-[#c90500] text-pitstop-text rounded-large p-small flex items-center justify-between shadow-raised border border-pitstop-brand/40 transition-all active:scale-98"
          >
            <div className="flex items-center gap-small">
              <div className="w-9 h-9 rounded-card bg-black/30 flex items-center justify-center font-extrabold text-body relative">
                <ShoppingBag className="w-5 h-5 text-pitstop-text" />
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-white text-pitstop-brand text-label-compact font-black flex items-center justify-center shadow font-mono">
                  {cartCount}
                </span>
              </div>
              <div className="text-left">
                <div className="font-display font-black text-body-large uppercase tracking-wider">
                  Review Express Order
                </div>
                <div className="text-label text-white/90">
                  Station: <span className="font-bold">{selectedDropPoint.name}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-compact">
              <span className="font-display font-black text-compact-title text-pitstop-price tracking-wide">
                ${total.toFixed(2)}
              </span>
              <ArrowRight className="w-4 h-4 text-pitstop-text" />
            </div>
          </button>
        </div>
      </div>

      {/* Slide-Up Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-end justify-center animate-in fade-in duration-200">
          <div className="bg-pitstop-surface border-t border-pitstop-border w-full max-w-[430px] rounded-t-large max-h-[85vh] flex flex-col shadow-raised animate-in slide-in-from-bottom duration-300">
            {/* Header */}
            <div className="p-standard border-b border-pitstop-border flex items-center justify-between">
              <div>
                <h3 className="text-card-title font-display font-black text-pitstop-text flex items-center gap-compact uppercase tracking-wider">
                  <span>Express Cart</span>
                  <span className="text-label font-bold text-pitstop-text-secondary">({cartCount} items)</span>
                </h3>
                <p className="text-label text-pitstop-success mt-0.5 font-medium">
                  Drop Station: {selectedDropPoint.name}
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-pitstop-background text-pitstop-text-secondary flex items-center justify-center text-body hover:bg-neutral-800"
              >
                ✕
              </button>
            </div>

            {/* Cart Items */}
            <div className="p-standard overflow-y-auto space-y-compact divide-y divide-pitstop-border">
              {cart.map(({ item, quantity }) => (
                <div key={item.id} className="pt-compact first:pt-0 flex items-center justify-between gap-small">
                  <div className="flex items-center gap-small">
                    <div className="w-12 h-12 rounded-card overflow-hidden relative shrink-0 bg-pitstop-background border border-pitstop-border">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <div className="font-display font-black text-body-large text-pitstop-text uppercase tracking-wide">
                        {item.name}
                      </div>
                      <div className="text-label text-pitstop-price font-display font-bold">
                        ${item.price.toFixed(2)} each
                      </div>
                    </div>
                  </div>

                  {/* Stepper */}
                  <div className="min-h-tap flex items-center bg-pitstop-background border border-pitstop-border rounded-card p-micro shrink-0">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-7 h-7 rounded-small text-pitstop-text-secondary flex items-center justify-center hover:bg-neutral-800 active:scale-90"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-display font-black text-body text-pitstop-text min-w-6 text-center font-mono">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-7 h-7 rounded-small bg-pitstop-brand text-pitstop-text flex items-center justify-center hover:bg-[#c90500] active:scale-90"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="p-standard bg-pitstop-background border-t border-pitstop-border space-y-compact">
              <div className="flex justify-between text-label text-pitstop-text-secondary">
                <span>Subtotal</span>
                <span className="font-mono">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-label text-pitstop-success font-bold">
                <span className="flex items-center gap-micro">
                  <Zap className="w-3.5 h-3.5 text-pitstop-success" />
                  <span>EatClub Trackside Discount (-20%)</span>
                </span>
                <span className="font-mono">-${discountAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-label text-pitstop-price font-bold">
                <span className="flex items-center gap-micro">
                  <Award className="w-3.5 h-3.5 text-pitstop-price" />
                  <span>Grand Prix Rewards Accrued</span>
                </span>
                <span>+{loyaltyPoints} pts</span>
              </div>
              <div className="border-t border-pitstop-border pt-compact flex justify-between text-card-title font-display font-black text-pitstop-text uppercase tracking-wider">
                <span>Total Due</span>
                <span className="text-pitstop-price font-display text-section-title">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button (Section 03) */}
            <div className="p-standard border-t border-pitstop-border bg-pitstop-surface">
              <button
                onClick={handleCheckout}
                className="w-full min-h-tap py-small rounded-large bg-pitstop-brand hover:bg-[#c90500] text-pitstop-text font-display font-black text-body-large uppercase tracking-wider flex items-center justify-center gap-compact shadow-raised transition-all active:scale-98"
              >
                <Flag className="w-4 h-4 fill-white" />
                <span>Confirm Order & Generate Pass</span>
              </button>
              <div className="flex items-center justify-center gap-micro text-label-compact text-pitstop-text-secondary mt-compact">
                <ShieldCheck className="w-3.5 h-3.5 text-pitstop-success" />
                <span>Zero cellular lag • Auto-cached to device for offline scan</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
