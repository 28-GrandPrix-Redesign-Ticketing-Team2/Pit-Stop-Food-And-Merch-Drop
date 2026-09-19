'use client';

import React from 'react';
import Header from '../components/Header';
import LocationBar from '../components/LocationBar';
import RaceAlertBanner from '../components/RaceAlertBanner';
import MenuCatalog from '../components/MenuCatalog';
import CartDrawer from '../components/CartDrawer';

export default function Home() {
  return (
    <div className="min-h-screen bg-pitstop-background text-pitstop-text flex flex-col items-center">
      {/* Mobile container - full width up to 430px, centered on larger screens */}
      <main className="w-full max-w-[430px] flex flex-col min-h-screen bg-pitstop-background border-x border-pitstop-border shadow-raised relative">
        <Header />
        <LocationBar />
        <RaceAlertBanner />
        <MenuCatalog />
        <CartDrawer />
      </main>
    </div>
  );
}
