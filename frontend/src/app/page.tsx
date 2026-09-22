import DemoToggle from "@/components/DemoToggle";
import HomeHeader from "@/components/home/HomeHeader";
import PitStopMap from "@/components/PitStopMap";

export default function Home() {
  return (
    // Makes page at least full height of screen. 
    <main className="min-h-screen w-full bg-[var(--color-page-background)]">
      {/* Mobile container - full width up to 430px, centered on larger screens */}
      <div className="mx-auto w-full max-w-[430px]">
        <HomeHeader />

        {/* Map Component */}

      </div>
    </main>
  );
}
