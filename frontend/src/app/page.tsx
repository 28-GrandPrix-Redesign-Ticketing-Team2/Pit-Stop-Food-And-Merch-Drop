export default function Home() {
  return (
    // Makes page at least full height of screen. 
    <main className="min-h-screen w-full">
      {/* Mobile container - full width up to 430px, centered on larger screens */}
      <div className="mx-auto w-full max-w-[430px] px-4">
        <h1>
          Pit Stop Food & Merch Drop
        </h1>
      </div>
    </main>
  );
}
