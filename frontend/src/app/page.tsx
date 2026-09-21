import DemoToggle from "@/components/DemoToggle";
import PitStopMap from "@/components/PitStopMap";

export default function Home() {
  return (
    // Makes page at least full height of screen. 
    <main className="min-h-screen w-full">
      {/* Mobile container - full width up to 430px, centered on larger screens */}
      <div className="relative mx-auto w-full max-w-[430px] px-4">
        <DemoToggle />
        <h2>Find a Pit Stop</h2>
        <br />
        <p>
          Find food, merchandise and collection points near you
        </p>

        {/* Map Component */}
        <PitStopMap />
      </div>
    </main>
  );
}
