"use client";

import { Icon } from "@iconify/react";
import { useDemoMode } from "@/components/DemoProvider";

export default function DemoToggle() {
    const { demoMode, setDemoMode } = useDemoMode();

    return (
        <button
            // Switch Demo Mode between true and false
            onClick={() => setDemoMode(!demoMode)}

            // Keep button fixed in the top-right corner and change color accordingly
            className={`absolute right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full shadow-lg transition ${demoMode
                ? "bg-green-400 text-black"
                : "bg-white text-black border-2 border-black"
                }`}

            // Tooltip when hovering over the button
            title={
                demoMode
                    ? "Disable Demo Mode"
                    : "Enable Demo Mode"
            }

            // Accessibility label
            aria-label={
                demoMode
                    ? "Disable Demo Mode"
                    : "Enable Demo Mode"
            }
        >
            {/* Icon depending on Demo Mode state */}
            <Icon
                icon="mdi:television-play"
                width="20"
            />
        </button>
    );
}