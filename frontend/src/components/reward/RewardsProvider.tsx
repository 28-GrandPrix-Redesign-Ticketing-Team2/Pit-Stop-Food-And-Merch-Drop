"use client";

import {
    createContext,
    ReactNode,
    useContext,
    useState,
} from "react";

import { MOCK_REWARDS_PROFILE } from "@/data/rewardsConstantData";

import type {
    RedeemReward,
    RewardHistoryEntry,
    RewardsProfile,
} from "@/data/rewardsConstantData";

import { CHECKOUT_VOUCHERS } from "@/data/checkoutConstantData";

type RewardsContextType = {
    profile: RewardsProfile;

    redeemReward: (
        reward: RedeemReward
    ) => RewardHistoryEntry | null;

    markVoucherUsed: (
        voucherCode: string
    ) => void;
};

const RewardsContext =
    createContext<
        RewardsContextType | undefined
    >(undefined);

type RewardsProviderProps = {
    children: ReactNode;
};

export default function RewardsProvider({
    children,
}: RewardsProviderProps) {
    const [
        profile,
        setProfile,
    ] = useState<RewardsProfile>(
        MOCK_REWARDS_PROFILE
    );

    function redeemReward(
        reward: RedeemReward
    ) {
        // Must have enough points
        if (
            profile.points <
            reward.pointsCost
        ) {
            return null;
        }

        // Reward needs a real Checkout voucher
        if (!reward.voucherId) {
            return null;
        }

        // Find voucher from the single checkout voucher source
        const voucher =
            CHECKOUT_VOUCHERS.find(
                (item) =>
                    item.id ===
                    reward.voucherId
            );

        if (!voucher) return null;

        // Prevent duplicate redemption
        const alreadyRedeemed =
            profile.history.some(
                (entry) =>
                    entry.rewardId ===
                    reward.id &&
                    entry.status ===
                    "available"
            );

        if (alreadyRedeemed) return null;

        const historyEntry: RewardHistoryEntry = {
            id: crypto.randomUUID(),

            rewardId: reward.id,
            voucherId: voucher.id,
            voucherCode: voucher.code,
            redeemedAt:
                new Date().toISOString(),
            status: "available",
        };

        setProfile(
            (current) => ({
                ...current,

                points:
                    current.points -
                    reward.pointsCost,

                history: [
                    historyEntry,
                    ...current.history,
                ],
            })
        );

        return historyEntry;
    }

    // Called when Checkout successfully and applies a redeemed voucher
    function markVoucherUsed(
        voucherCode: string
    ) {
        setProfile(
            (current) => ({
                ...current,

                history:
                    current.history.map(
                        (entry) =>
                            entry.voucherCode ===
                                voucherCode
                                ? {
                                    ...entry,
                                    status:
                                        "used",
                                }
                                : entry
                    ),
            })
        );
    }

    return (
        <RewardsContext.Provider
            value={{
                profile,
                redeemReward,
                markVoucherUsed,
            }}
        >
            {children}
        </RewardsContext.Provider>
    );
}

export function useRewards() {
    const context =
        useContext(
            RewardsContext
        );

    if (!context) {
        throw new Error(
            "useRewards must be used inside RewardsProvider"
        );
    }

    return context;
}