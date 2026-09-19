import type { Metadata, Viewport } from "next";
import { Big_Shoulders_Display } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import ClientProviders from "../context/ClientProviders";

const bigShoulders = Big_Shoulders_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Pit Stop Food & Merch Drop | AUSGP",
  description: "Express Food & Merch Drop for the Formula 1 Australian Grand Prix.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bigShoulders.variable} ${geistSans.variable}`}>
      <body className="antialiased bg-[#050505] text-[#FFFFFF] font-sans selection:bg-[#E10600] selection:text-white">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
