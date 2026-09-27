"use client";

import { useState } from "react";

import Typography from "@/components/ui/Typography";
import { MOCK_REWARDS_PROFILE, RedeemReward } from "@/data/rewardsConstantData";
import RewardsTabs from "./RewardsTabs";
import RewardsProgressCard from "./RewardsProgressCard";
import RewardsBadgeGrid from "./RewardsBadgeGrid";
import { CHECKOUT_VOUCHERS, CheckoutVoucherData } from "@/data/checkoutConstantData";
import RewardsRedeemList from "./RewardsRedeemList";
import RedeemVoucherPopup from "./RedeemVoucherPopup";

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
    const [
        rewardsProfile,
        setRewardsProfile,
    ] = useState(
        MOCK_REWARDS_PROFILE
    );

    // Voucher popup state
    const [
        redeemedVoucher,
        setRedeemedVoucher,
    ] = useState<{
        reward: RedeemReward;
        voucher: CheckoutVoucherData;
    } | null>(
        null
    );

    function handleRedeem(
        reward: RedeemReward
    ) {
        // Must have enough points
        if (
            rewardsProfile.points <
            reward.pointsCost
        ) { return }

        // Cannot redeem twice
        if (
            rewardsProfile.redeemedRewardIds.includes(
                reward.id
            )
        ) return;

        // Reward must link to a real Checkout voucher
        if (!reward.voucherId) return;


        // Find the matching voucher from the
        // single Checkout voucher source
        const voucher =
            CHECKOUT_VOUCHERS.find(
                (item) =>
                    item.id ===
                    reward.voucherId
            );

        if (!voucher) return;

        // Deduct points and mark reward redeemed
        setRewardsProfile(
            (current) => ({
                ...current,

                points:
                    current.points -
                    reward.pointsCost,

                redeemedRewardIds: [
                    ...current.redeemedRewardIds,
                    reward.id,
                ],
            })
        );

        // Open voucher popup.
        setRedeemedVoucher({
            reward,
            voucher,
        });
    }

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
                            {rewardsProfile.points.toLocaleString()}
                        </Typography>
                    </div>
                </div>

                {/* Fan tier progress */}
                <RewardsProgressCard
                    profile={rewardsProfile}
                />

                {/* Rewards tabs */}
                <RewardsTabs
                    activeTab={activeTab}
                    onTabChange={
                        setActiveTab
                    }
                />

                {/* Tab content */}
                {activeTab === "badges" && (
                    <RewardsBadgeGrid
                        profile={rewardsProfile}
                    />
                )}

                {/* Redeem content */}
                {activeTab === "redeem" && (
                    <RewardsRedeemList
                        profile={rewardsProfile}
                        onRedeem={handleRedeem}
                    />
                )}

                <RedeemVoucherPopup
                    reward={
                        redeemedVoucher?.reward ??
                        null
                    }
                    voucher={
                        redeemedVoucher?.voucher ??
                        null
                    }
                    onClose={() =>
                        setRedeemedVoucher(null)
                    }
                />
            </div>
        </section>
    );
}

