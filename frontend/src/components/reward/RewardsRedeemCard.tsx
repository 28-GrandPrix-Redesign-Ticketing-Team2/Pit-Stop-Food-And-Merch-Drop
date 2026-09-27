import { Icon } from "@iconify/react";

import Button from "@/components/ui/Buttons";
import Card from "@/components/ui/Card";
import Typography from "@/components/ui/Typography";

import type { RedeemReward } from "@/data/rewardsConstantData";

type RewardsRedeemCardProps = {
    reward: RedeemReward;
    userPoints: number;
    redeemed: boolean;

    onRedeem: () => void;
};

export default function RewardsRedeemCard({
    reward,
    userPoints,
    redeemed,
    onRedeem,
}: RewardsRedeemCardProps) {
    // Reward must have:
    // 1. Enough user points
    // 2. A real Checkout voucher
    // 3. Not already redeemed
    const canRedeem =
        userPoints >=
        reward.pointsCost &&
        reward.voucherId !== null &&
        !redeemed;

    return (
        <Card
            className={`
                !rounded-[12px]
                !p-[14px]

                ${redeemed
                    ? "!border-[var(--color-status-success-soft-border)]"
                    : ""
                }
            `}
        >
            <div
                className="
                    flex
                    items-center
                    gap-3
                "
            >
                {/* Reward icon */}
                <div
                    className="
                        flex
                        h-[46px]
                        w-[46px]
                        shrink-0
                        items-center
                        justify-center
                        rounded-[12px]
                        border
                        border-[var(--color-border)]
                        bg-[var(--color-page-background)]
                        text-[var(--color-text-primary)]
                    "
                >
                    <Icon
                        icon={reward.icon}
                        width="26"
                        height="26"
                    />
                </div>

                {/* Reward details */}
                <div className="min-w-0 flex-1">
                    <Typography
                        variant="cardHeading"
                        className="
                            block
                            !text-[15px]
                            !leading-[22.5px]
                        "
                    >
                        {reward.name}
                    </Typography>

                    <Typography
                        variant="body"
                        className="
                            mt-[2px]
                            block
                            !text-[11px]
                            !leading-[16.5px]
                            !text-[var(--color-text-muted)]
                        "
                    >
                        {reward.description}
                    </Typography>

                    <div
                        className="
                            mt-[5px]
                            flex
                            items-center
                            gap-1
                        "
                    >
                        <Icon
                            icon="ph:star-fill"
                            width="11"
                            height="11"
                            className={
                                canRedeem ||
                                    redeemed
                                    ? "text-[var(--color-status-warning)]"
                                    : "text-[var(--color-text-muted)]"
                            }
                        />

                        <Typography
                            variant="meta"
                            className={`
                                !text-[12px]
                                !leading-[18px]

                                ${canRedeem ||
                                    redeemed
                                    ? "!text-[var(--color-status-warning)]"
                                    : "!text-[var(--color-text-muted)]"
                                }
                            `}
                        >
                            {reward.pointsCost.toLocaleString()}{" "}
                            PTS
                        </Typography>
                    </div>
                </div>

                {/* Reward action */}
                {redeemed ? (
                    <div
                        className="
                            shrink-0
                            rounded-[10px]
                            border
                            border-[var(--color-status-success-soft-border)]
                            bg-[var(--color-status-success-surface)]
                            px-3
                            py-2
                        "
                    >
                        <Typography
                            variant="button"
                            className="
                                !text-[13px]
                                !leading-[19.5px]
                                !text-[var(--color-status-success)]
                            "
                        >
                            ✓ DONE
                        </Typography>
                    </div>
                ) : (
                    <Button
                        type="button"
                        disabled={!canRedeem}
                        onClick={onRedeem}
                        className={`
                            !h-[40px]
                            !w-auto
                            shrink-0
                            !rounded-[10px]
                            !px-3

                            ${!canRedeem
                                ? `
                                        !border
                                        !border-[var(--color-border)]
                                        !bg-[var(--color-page-background)]
                                        !opacity-100
                                    `
                                : ""
                            }
                        `}
                    >
                        <Typography
                            variant="button"
                            className={`
                                !text-[13px]
                                !leading-[19.5px]

                                ${canRedeem
                                    ? "!text-[var(--color-text-on-primary)]"
                                    : "!text-[var(--color-text-muted)]"
                                }
                            `}
                        >
                            {canRedeem
                                ? "REDEEM"
                                : "LOCKED"}
                        </Typography>
                    </Button>
                )}
            </div>
        </Card >
    );
}