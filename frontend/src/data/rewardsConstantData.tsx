import type { CheckoutVoucherId } from "@/data/checkoutConstantData";

// Static badge catalogue.
export const REWARD_BADGES = [
    {
        id: "speedy-pickup",
        name: "SPEEDY PICKUP",
        description: "Picked up in under 3 mins",
        unlockDescription: "Collect your order within 3 minutes of it being marked ready",
        rewardPoints: 500,
        target: 1,
        icon: "ph:lightning-fill",
    },
    {
        id: "order-streak",
        name: "ORDER STREAK",
        description: "Complete 5 orders",
        unlockDescription: "Complete 5 orders",
        rewardPoints: 750,
        target: 5,
        icon: "ph:fire-fill",
    },
    {
        id: "big-spender",
        name: "BIG SPENDER",
        description: "Spend over $100 total",
        unlockDescription: "Accumulate a total spend of $100 or more across all your orders",
        rewardPoints: 1000,
        target: 100,
        icon: "ph:money-fill",
    },
    {
        id: "weekend-warrior",
        name: "WEEKEND WARRIOR",
        description: "Ordered all 3 race days",
        unlockDescription: "Ordered all 3 race days",
        rewardPoints: 1000,
        target: 3,
        icon: "ph:flag-checkered-fill",
    },
    {
        id: "podium-finisher",
        name: "PODIUM FINISHER",
        description: "Order at 3 different events",
        unlockDescription: "Order at 3 different events",
        rewardPoints: 1500,
        target: 3,
        icon: "ph:medal-fill",
    },
    {
        id: "early-bird",
        name: "EARLY BIRD",
        description: "Ordered before 11 AM.",
        unlockDescription: "Place and pay for an order before 11:00 AM on race day",
        rewardPoints: 500,
        target: 1,
        icon: "ph:sun-fill",
    },
    {
        id: "snack-attack",
        name: "SNACK ATTACK",
        description: "Order 3+ items at once.",
        unlockDescription: "Order 3+ items at once",
        rewardPoints: 1000,
        target: 1,
        icon: "ph:fork-knife-fill",
    },
    {
        id: "vip-fan",
        name: "VIP FAN",
        description: "Reach 2,000 PTS.",
        unlockDescription: "Accumulate 2,000 points to unlock VIP Fan status and perks",
        rewardPoints: null,
        target: 2000,
        icon: "ph:star-fill",
    },
] as const;

export type RewardBadge =
    (typeof REWARD_BADGES)[number];

export type RewardBadgeId =
    RewardBadge["id"];

// Use specific badge progress
export type UserBadgeProgress = {
    badgeId: RewardBadgeId;
    progress: number;
    earned: boolean;
};

export type RedeemRewardId =
    RedeemReward["id"];


export type RewardHistoryStatus =
    | "available"
    | "used";

export type RewardHistoryEntry = {
    id: string;
    rewardId: RedeemRewardId;

    // Links to CHECKOUT_VOUCHERS.
    voucherId: CheckoutVoucherId;

    // Snapshot of actual voucher code
    voucherCode: string;
    redeemedAt: string;
    status: RewardHistoryStatus;
};

export type RewardsProfile = {
    points: number;

    tier: {
        current: string;
        next: string;
        nextTierPoints: number;
    };

    badges: UserBadgeProgress[];
    redeemedRewardIds: RedeemRewardId[];
    history: RewardHistoryEntry[];
};

// Temporary backend-shaped user data
export const MOCK_REWARDS_PROFILE: RewardsProfile = {
    points: 0,

    tier: {
        current: "FAN",
        next: "VIP FAN",
        nextTierPoints: 2000,
    },

    redeemedRewardIds: [],

    badges: REWARD_BADGES.map(
        (badge) => ({
            badgeId: badge.id,
            progress: 0,
            earned: false,
        })
    ),

    // Empty until user redeems something
    history: [],


    // Test data
    // badges: [
    //     {
    //         badgeId: "speedy-pickup",
    //         progress: 1,
    //         earned: true,
    //     },
    //     {
    //         badgeId: "order-streak",
    //         progress: 3,
    //         earned: false,
    //     },
    //     {
    //         badgeId: "big-spender",
    //         progress: 0,
    //         earned: false,
    //     },
    //     {
    //         badgeId: "weekend-warrior",
    //         progress: 0,
    //         earned: false,
    //     },
    //     {
    //         badgeId: "podium-finisher",
    //         progress: 0,
    //         earned: false,
    //     },
    //     {
    //         badgeId: "early-bird",
    //         progress: 0,
    //         earned: false,
    //     },
    //     {
    //         badgeId: "snack-attack",
    //         progress: 0,
    //         earned: false,
    //     },
    //     {
    //         badgeId: "vip-fan",
    //         progress: 0,
    //         earned: false,
    //     },
    // ],
};

export type RedeemReward = {
    id: string;
    name: string;
    description: string;
    pointsCost: number;
    icon: string;

    // Links Rewards to the real Checkout voucher.
    voucherId: CheckoutVoucherId | null;

};

export const REDEEM_REWARDS: RedeemReward[] = [
    {
        id: "free-cold-brew",
        name: "Free Cold Brew",
        description:
            "Adds a free Pit Lane Cold Brew to your next order.",
        pointsCost: 500,
        icon: "noto:hot-beverage",
        voucherId: "free-cold-brew",
    },
    {
        id: "free-fries",
        name: "Free Fries Upgrade",
        description:
            "Makes your High-Downforce Fries free on your next order.",
        pointsCost: 800,
        icon: "noto:french-fries",

        // Null becaause checkout has a matching voucher effect
        voucherId: null,
    },
    {
        id: "five-off",
        name: "$5 Off Your Order",
        description:
            "$5 discount applied automatically at checkout.",
        pointsCost: 1000,
        icon: "ph:tag-fill",
        voucherId:
            "five-dollar-discount",
    },
    {
        id: "free-burger",
        name: "Free Burger",
        description:
            "Makes your Apex Trackside Burger free on your next order.",
        pointsCost: 1500,
        icon: "noto:hamburger",

        // Null becaause checkout has a matching voucher effect
        voucherId: null,
    },
    {
        id: "vip-pit-lane-pass",
        name: "VIP Pit Lane Pass",
        description:
            "Skip the queue — priority collection at any pit stop.",
        pointsCost: 2000,
        icon: "ph:crown-fill",
        voucherId: null,
    },
];