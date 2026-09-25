export const SERVICE_FEES_ITEMS = 1.5;
export const SERVICE_FEES_ZERO_ITEMS = 0;
export const REWARD_POINT_MULTIPLIER = 10;

// Demo codes
// GP-SAVE05 && GP-BREW01
export const CHECKOUT_VOUCHERS = [
    {
        code: "GP-SAVE05",
        title: "Reward Discount",
        description: "-$5.00 applied",
        effect: {
            type: "discount",
            amount: 5,
        },
    },
    {
        code: "GP-BREW01",
        title: "Free Cold Brew",
        description: "Added to your order for free",
        effect: {
            type: "freeItem",
            itemId: "cold-brew",
        },
    },
] as const;

export type CheckoutVoucherData =
    (typeof CHECKOUT_VOUCHERS)[number];

export const INVALID_VOUCHER_MESSAGE =
    "Invalid code. Check your Rewards tab.";