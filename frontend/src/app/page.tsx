"use client";

import HomeHeader from "@/components/home/HomeHeader";
import SettingsPopUp from "@/components/home/SettingsPopUp";
import PitStopMap from "@/components/PitStopMap";
import { useState } from "react";

export default function Home() {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    // Makes page at least full height of screen. 
    <main className="min-h-screen w-full bg-[var(--color-page-background)]">
      {/* Mobile container - full width up to 430px, centered on larger screens */}
      <div className="mx-auto w-full max-w-[430px]">
        {/* Header */}
        <HomeHeader onSettingsClick={() => setSettingsOpen(true)} />

        {/* Map Component */}

        {/* Settings */}
        <SettingsPopUp
          isOpen={settingsOpen}
          onClose={() => setSettingsOpen(false)}
        />

      </div>
    </main>
  );
}
