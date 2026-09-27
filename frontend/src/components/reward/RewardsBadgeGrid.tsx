import RewardsBadgeCard from "./RewardsBadgeCard";

import { REWARD_BADGES } from "@/data/rewardsConstantData";

import type { RewardsProfile } from "@/data/rewardsConstantData";

type RewardsBadgeGridProps = { profile: RewardsProfile };

export default function RewardsBadgeGrid({
    profile,
}: RewardsBadgeGridProps) {
    return (
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

                    // Protect against incomplete backend data
                    if (!userProgress) {
                        return null;
                    }

                    return (
                        <RewardsBadgeCard
                            key={badge.id}
                            badge={badge}
                            userProgress={
                                userProgress
                            }
                        />
                    );
                }
            )}
        </div>
    );
}