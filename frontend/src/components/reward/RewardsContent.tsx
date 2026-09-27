"use client";

import { useState } from "react";

import Typography from "@/components/ui/Typography";
import { MOCK_REWARDS_SUMMARY } from "@/data/rewardsConstantData";
import RewardsTabs from "./RewardsTabs";

export type RewardsTab =
    | "badges"
    | "redeem"
    | "history";

export default function RewardsContent() {
    // Active tab
    const [
        activeTab,
        setActiveTab,
    ] = useState<RewardsTab>(
        "badges"
    );

    // Temporary Rewards data
    const rewardsSummary =
        MOCK_REWARDS_SUMMARY;

    return (
        <section
            className="
                min-h-[calc(100dvh-var(--app-header-height))]
                bg-[var(--color-page-background)]
                pb-[var(--bottom-nav-height)]
            "
        >
            {/* Header */}
            <div
                className="
                    border-b
                    border-[var(--color-border)]
                    bg-[var(--color-surface)]
                    px-5
                    pb-3
                    pt-[14px]
                "
            >
                {/* Title + points */}
                <div
                    className="
                        flex
                        items-start
                        justify-between
                        gap-4
                    "
                >
                    <div>
                        <Typography
                            variant="screenTitle"
                            className="
                                block
                                !leading-8
                            "
                        >
                            REWARDS
                        </Typography>

                        <Typography
                            variant="body"
                            className="
                                mt-[2px]
                                block
                                !text-[12px]
                                !leading-[18px]
                                !text-[var(--color-text-muted)]
                            "
                        >
                            Earn badges. Redeem perks. Have fun.
                        </Typography>
                    </div>

                    {/* Points summary */}
                    <div
                        className="
                            min-w-[96px]
                            rounded-[10px]
                            bg-[var(--color-brand-primary)]
                            px-[14px]
                            py-[6px]
                            text-center
                        "
                    >
                        <Typography
                            variant="meta"
                            className="
                                block
                                !text-[10px]
                                !leading-[15px]
                                !text-white/70
                            "
                        >
                            YOUR POINTS
                        </Typography>

                        <Typography
                            variant="sectionHeader"
                            className="
                                block
                                !text-[22px]
                                !leading-[24px]
                                !text-[var(--color-text-on-primary)]
                            "
                        >
                            {rewardsSummary.points.toLocaleString()}
                        </Typography>
                    </div>
                </div>

                {/* Rewards tabs */}
                <RewardsTabs
                    activeTab={activeTab}
                    onTabChange={
                        setActiveTab
                    }
                />
            </div>
        </section>
    );
}