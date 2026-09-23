"use client";

import { Icon } from "@iconify/react";
import Typography from "@/components/ui/Typography";

type AppHeaderProps = {
    onSettingsClick?: () => void;
};

export default function AppHeader({
    onSettingsClick,
}: AppHeaderProps) {
    return (
        <header
            className="
                sticky
                top-0
                z-40
                flex
                w-full
                items-center
                justify-between
                border-b
                border-[var(--color-border)]
                bg-[var(--color-surface)]
                px-5
                py-3
            "
        >
            {/* Left section */}
            <div className="flex items-center gap-[7px]">
                <Icon
                    icon="ph:flag-checkered-fill"
                    width="20"
                    height="20"
                    className="text-[var(--color-brand-primary)]"
                />

                <Typography
                    variant="sectionHeader"
                    className="leading-[30px] tracking-[0.8px]"
                >
                    PIT STOP
                </Typography>
            </div>

            {/* Right section */}
            <div className="flex items-center gap-2">
                {/* Ticket */}
                <div
                    className="
                        flex
                        items-center
                        gap-[6px]
                        rounded-[20px]
                        border
                        border-[var(--color-border)]
                        bg-[var(--color-page-background)]
                        px-3
                        py-[5px]
                    "
                >
                    <Icon
                        icon="ph:ticket-fill"
                        width="14"
                        height="14"
                        className="text-[var(--color-brand-primary)]"
                    />

                    <Typography
                        variant="meta"
                        className="text-[12px] leading-[18px]"
                    >
                        GP-3829-X
                    </Typography>
                </div>

                {/* Settings */}
                <button
                    type="button"
                    onClick={onSettingsClick}
                    aria-label="Open settings"
                    className="
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[var(--color-border)]
                        bg-[var(--color-page-background)]
                    "
                >
                    <Icon
                        icon="ph:gear-fill"
                        width="16"
                        height="16"
                        className="text-[var(--color-text-muted)]"
                    />
                </button>
            </div>
        </header>
    );
}