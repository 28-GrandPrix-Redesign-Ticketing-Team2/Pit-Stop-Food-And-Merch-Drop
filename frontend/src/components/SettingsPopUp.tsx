"use client";

import { Icon } from "@iconify/react";
import Typography from "@/components/ui/Typography";
import BottomPopUp from "@/components/popUp/BottomPopUp";

type SettingsPopUpProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function SettingsPopUp({
    isOpen,
    onClose,
}: SettingsPopUpProps) {
    if (!isOpen) return null;

    return (
        <BottomPopUp
            isOpen={isOpen}
            onClose={onClose}
            ariaLabel="Close settings"
        >
            {/* Heading */}
            <Typography
                variant="sectionHeader"
                className="mt-5 text-[22px] leading-[33px]"
            >
                SETTINGS
            </Typography>

            <Typography
                variant="body"
                className="mt-1 block !text-[var(--color-text-muted)]"
            >
                App configuration and demo options.
            </Typography>

            {/* Demo card */}
            <div
                className="
                        mt-5
                        rounded-[14px]
                        border
                        border-[var(--color-border)]
                        bg-[var(--color-page-background)]
                        p-4
                    "
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-[10px]">
                        <div
                            className="
                                    flex
                                    h-9
                                    w-9
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-[10px]
                                    border
                                    border-[var(--color-border)]
                                "
                        >
                            <Icon
                                icon="ph:presentation-chart-fill"
                                width="18"
                                height="18"
                                className="text-[var(--color-text-muted)]"
                            />
                        </div>

                        <div>
                            <Typography variant="cardHeading">
                                DEMO MODE
                            </Typography>

                            <Typography
                                variant="body"
                                className="
                                        block
                                        text-[12px]
                                        leading-[18px]
                                        !text-[var(--color-text-muted)]
                                    "
                            >
                                Pre-fills cart & pit stop for presentations
                            </Typography>
                        </div>
                    </div>

                    {/* Toggle off */}
                    <button
                        type="button"
                        aria-label="Enable demo mode"
                        className="
                                relative
                                h-7
                                w-12
                                shrink-0
                                rounded-full
                                bg-[var(--color-border)]
                            "
                    >
                        <span
                            className="
                                    absolute
                                    left-[3px]
                                    top-[3px]
                                    h-[22px]
                                    w-[22px]
                                    rounded-full
                                    bg-[var(--color-surface)]
                                    shadow-[0_1px_3px_rgba(0,0,0,0.2)]
                                "
                        />
                    </button>
                </div>
            </div>

            {/* Close */}
            <button
                type="button"
                onClick={onClose}
                className="
                        mt-4
                        flex
                        h-[54px]
                        w-full
                        items-center
                        justify-center
                        rounded-[12px]
                        border
                        border-[var(--color-border)]
                        bg-[var(--color-page-background)]
                    "
            >
                <Typography
                    variant="button"
                    className="
                            tracking-[0.64px]
                            !text-[var(--color-text-primary)]
                        "
                >
                    CLOSE
                </Typography>
            </button>
        </BottomPopUp>
    );
}