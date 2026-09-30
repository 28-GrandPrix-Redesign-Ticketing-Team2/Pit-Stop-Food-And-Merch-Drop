"use client";

import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";

import { MOCK_REWARDS_PROFILE } from "@/data/rewardsConstantData";

import type {
    RedeemReward,
    RewardHistoryEntry,
    RewardsProfile,
} from "@/data/rewardsConstantData";

import { CHECKOUT_VOUCHERS } from "@/data/checkoutConstantData";
import { DEMO_STARTING_REWARD_POINTS } from "@/data/demoConstantData";
import { useDemoMode } from "../DemoProvider";

type RewardsContextType = {
    profile: RewardsProfile;

    redeemReward: (
        reward: RedeemReward
    ) => RewardHistoryEntry | null;

    markVoucherUsed: (
        voucherCode: string
    ) => void;

    // Gives Demo Mode its starting rewards balance
    seedDemoRewards: () => void;


    // Adds points earned from a successfully completed order
    awardOrderPoints: (
        orderReference: string,
        points: number
    ) => void;

    // Restores the Demo rewards state
    resetDemoRewards: () => void;
};

const RewardsContext =
    createContext<RewardsContextType | undefined>(undefined);

type RewardsProviderProps = {
    children: ReactNode;
};

function createDemoRewardsProfile():
    RewardsProfile {
    return {
        ...MOCK_REWARDS_PROFILE,

        points:
            DEMO_STARTING_REWARD_POINTS,

        tier: {
            ...MOCK_REWARDS_PROFILE.tier,
        },

        badges:
            MOCK_REWARDS_PROFILE.badges.map(
                (badge) => ({
                    ...badge,
                })
            ),

        redeemedRewardIds: [],
        history: [],
    };
}

export default function RewardsProvider({
    children,
}: RewardsProviderProps) {
    const { demoMode } = useDemoMode();

    const [profile, setProfile] = useState<RewardsProfile>(
        MOCK_REWARDS_PROFILE
    );

    // Stops Demo Mode from repeatedly resetting rewards back to 1000.
    const demoRewardsSeeded = useRef(false);

    // Stops the same completed order from awarding points twice
    const awardedOrderReferences =
        useRef<Set<string>>(new Set());

    // Gives Demo Mode a useful starting rewards balance
    function seedDemoRewards() {
        if (demoRewardsSeeded.current
        ) return;

        demoRewardsSeeded.current = true;

        awardedOrderReferences
            .current
            .clear();

        setProfile(createDemoRewardsProfile());
    }

    // seed rewards
    useEffect(() => {
        if (demoMode) { seedDemoRewards() }
    }, [demoMode]);

    // Restarts Rewards for another Demo walkthrough
    function resetDemoRewards() {
        // Demo remains enabled, so this remains true
        demoRewardsSeeded.current = true;

        // Allows new demo orders to earn their points normally
        awardedOrderReferences
            .current
            .clear();

        setProfile(createDemoRewardsProfile());
    }

    // Adds points from a completed order Order reference prevents duplicates
    function awardOrderPoints(
        orderReference: string,
        points: number
    ) {
        if (awardedOrderReferences
            .current
            .has(orderReference)
        ) return;


        awardedOrderReferences
            .current
            .add(orderReference);

        setProfile(
            (current) => ({
                ...current,

                points:
                    current.points +
                    points,
            })
        );
    }

    function redeemReward(
        reward: RedeemReward
    ) {
        // Must have enough points
        if (profile.points < reward.pointsCost) {
            return null;
        }

        // Reward needs a real Checkout voucher
        if (!reward.voucherId) return null;


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

                redeemedRewardIds: [
                    ...current.redeemedRewardIds,
                    reward.id,
                ],

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

                // demo
                seedDemoRewards,
                awardOrderPoints,
                resetDemoRewards,
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