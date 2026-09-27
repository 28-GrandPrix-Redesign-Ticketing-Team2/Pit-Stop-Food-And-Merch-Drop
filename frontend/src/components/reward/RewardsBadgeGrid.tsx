import RewardsBadgeCard from "./RewardsBadgeCard";

import { REWARD_BADGES } from "@/data/rewardsConstantData";
import type { RewardBadgeId, RewardsProfile } from "@/data/rewardsConstantData";
import { useState } from "react";
import RewardBadgePopup from "./RewardBadgePopup";

type RewardsBadgeGridProps = { profile: RewardsProfile };

export default function RewardsBadgeGrid({
    profile,
}: RewardsBadgeGridProps) {
    // Badge currently open in the detail popup
    const [
        selectedBadgeId,
        setSelectedBadgeId,
    ] =
        useState<RewardBadgeId | null>(
            null
        );

    const selectedBadge =
        REWARD_BADGES.find(
            (badge) =>
                badge.id ===
                selectedBadgeId
        );

    const selectedProgress =
        profile.badges.find(
            (item) =>
                item.badgeId ===
                selectedBadgeId
        );

    return (
        <div>
            <div
                className="
                grid
                grid-cols-2
                gap-[10px]
                px-4
                pb-[calc(var(--bottom-nav-height)+16px)]
                pt-3
            "
            >
                {REWARD_BADGES.map(
                    (badge) => {
                        const userProgress =
                            profile.badges.find(
                                (item) =>
                                    item.badgeId ===
                                    badge.id
                            );

                        if (!userProgress) return null;

                        // Protect against incomplete backend data
                        if (!userProgress) {
                            return null;
                        }

                        return (
                            <RewardsBadgeCard
                                key={badge.id}
                                badge={badge}
                                userProgress={userProgress}
                                onClick={() =>
                                    setSelectedBadgeId(
                                        badge.id
                                    )
                                }
                            />
                        );
                    }
                )}
            </div>
            {/* Selected badge details */}
            {
                selectedBadge &&
                selectedProgress && (
                    <RewardBadgePopup
                        isOpen={
                            selectedBadgeId !==
                            null
                        }
                        badge={selectedBadge}
                        userProgress={selectedProgress}
                        onClose={() =>
                            setSelectedBadgeId(
                                null
                            )
                        }
                    />
                )
            }
        </div>
    );
}