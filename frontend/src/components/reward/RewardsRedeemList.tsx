import Typography from "@/components/ui/Typography";

import RewardsRedeemCard from "./RewardsRedeemCard";

import { REDEEM_REWARDS } from "@/data/rewardsConstantData";

import type {
    RedeemReward,
    RewardsProfile,
} from "@/data/rewardsConstantData";

type RewardsRedeemListProps = {
    profile: RewardsProfile;

    onRedeem: (
        reward: RedeemReward
    ) => void;
};

export default function RewardsRedeemList({
    profile,
    onRedeem,
}: RewardsRedeemListProps) {
    return (
        <section
            className="
                px-4
                pb-[calc(var(--bottom-nav-height)+16px)]
                pt-3
            "
        >
            <Typography
                variant="body"
                className="
                    block
                    !text-[11px]
                    !leading-[16.5px]
                    !text-[var(--color-text-muted)]
                "
            >
                Spend your points on free items and
                discounts. Redeemed rewards are applied
                at your next checkout.
            </Typography>

            <div
                className="
                    mt-3
                    flex
                    flex-col
                    gap-[10px]
                "
            >
                {REDEEM_REWARDS.map(
                    (reward) => (
                        <RewardsRedeemCard
                            key={reward.id}
                            reward={reward}
                            userPoints={
                                profile.points
                            }
                            redeemed={profile.redeemedRewardIds.includes(
                                reward.id
                            )}
                            onRedeem={() =>
                                onRedeem(
                                    reward
                                )
                            }
                        />
                    )
                )}
            </div>
        </section>
    );
}