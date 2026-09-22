import type { Metadata, Viewport } from "next";
import {
  Inter,
  Big_Shoulders_Display,
} from "next/font/google";
import "./globals.css";
import { DemoProvider } from "@/components/DemoProvider";
import NavBar from "@/components/NavBar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const bigShoulders = Big_Shoulders_Display({
  subsets: ["latin"],
  variable: "--font-big-shoulders",
});

// Page Metadata
export const metadata: Metadata = {
  title: "Pit Stop Food & Merch Drop",
  description: "Order ahead. Pick up fast. Get back to the action.",
};


// Mobile Viewport behaviour
export const viewport: Viewport = {
  width: "device-width",
  // Loading page to 100% zoom 
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${bigShoulders.variable} antialiased`}
      >
        {/* Makes Demo Mode available across all pages */}
        <DemoProvider>
          {children}

          {/* Nav Bar */}
          <NavBar />
        </DemoProvider>
      </body>
    </html>
  );
}
