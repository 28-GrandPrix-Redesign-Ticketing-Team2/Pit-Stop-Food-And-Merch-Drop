"use client";

import { ReactNode, useState } from "react";
import AppHeader from "@/components/AppHeader";
import SettingsPopUp from "@/components/SettingsPopUp";
import NavBar from "./NavBar";

type AppShellProps = {
    children: ReactNode;
};

export default function AppShell({
    children,
}: AppShellProps) {
    const [settingsOpen, setSettingsOpen] = useState(false);

    return (
        // Makes page at least full height of screen. 
        <main className="min-h-screen w-full bg-[var(--color-page-background)]">
            {/* Mobile container - full width up to 430px, centered on larger screens */}
            <div className="mx-auto w-full max-w-[430px]">
                <AppHeader
                    onSettingsClick={() => setSettingsOpen(true)}
                />

                {children}

                <SettingsPopUp
                    isOpen={settingsOpen}
                    onClose={() => setSettingsOpen(false)}
                />

                <NavBar />
            </div>
        </main>
    );
}