import { Icon } from "@iconify/react";

import Card from "@/components/ui/Card";
import Typography from "@/components/ui/Typography";

import { REDEEM_REWARDS } from "@/data/rewardsConstantData";

import type { RewardHistoryEntry } from "@/data/rewardsConstantData";

type RewardsHistoryProps = { history: RewardHistoryEntry[] };

export default function RewardsHistory({
    history,
}: RewardsHistoryProps) {
    if (history.length === 0) {
        return (
            <div
                className="
                    flex
                    flex-col
                    items-center
                    px-5
                    py-10
                    text-center
                "
            >
                <div
                    className="
                        flex
                        h-[52px]
                        w-[52px]
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[var(--color-border)]
                    "
                >
                    <Icon
                        icon="ph:receipt"
                        width="24"
                        height="24"
                        className="text-[var(--color-text-muted)]"
                    />
                </div>

                <Typography
                    variant="sectionHeader"
                    className="
                        mt-3
                        !text-[18px]
                        !leading-[27px]
                    "
                >
                    NO HISTORY YET
                </Typography>

                <Typography
                    variant="body"
                    className="
                        mt-[6px]
                        !text-[12px]
                        !leading-[18px]
                        !text-[var(--color-text-muted)]
                    "
                >
                    Redeemed rewards will appear here.
                </Typography>
            </div>
        );
    }

    return (
        <div
            className="
                flex
                flex-col
                gap-[10px]
                px-4
                pb-[calc(var(--bottom-nav-height)+16px)]
                pt-3
            "
        >
            {history.map(
                (entry) => {
                    const reward =
                        REDEEM_REWARDS.find(
                            (item) =>
                                item.id ===
                                entry.rewardId
                        );

                    if (!reward) return null;


                    const used =
                        entry.status ===
                        "used";

                    const redeemedTime =
                        new Date(
                            entry.redeemedAt
                        ).toLocaleTimeString(
                            [],
                            {
                                hour: "2-digit",
                                minute:
                                    "2-digit",
                                hour12: false,
                            }
                        );

                    return (
                        <Card
                            key={entry.id}
                            className={`
                                !rounded-[12px]
                                !p-[14px]

                                ${!used
                                    ? "!border-[var(--color-status-success-soft-border)]"
                                    : ""
                                }
                            `}
                        >
                            {/* Reward details */}
                            <div
                                className="
                                    flex
                                    items-start
                                    gap-3
                                "
                            >
                                <div
                                    className="
                                        flex
                                        h-[42px]
                                        w-[42px]
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-[10px]
                                        border
                                        border-[var(--color-border)]
                                        bg-[var(--color-page-background)]
                                    "
                                >
                                    <Icon
                                        icon={
                                            reward.icon
                                        }
                                        width="24"
                                        height="24"
                                    />
                                </div>

                                <div className="flex-1">
                                    <Typography
                                        variant="cardHeading"
                                        className="
                                            block
                                            !text-[14px]
                                            !leading-[21px]
                                        "
                                    >
                                        {reward.name}
                                    </Typography>

                                    <Typography
                                        variant="body"
                                        className="
                                            !text-[11px]
                                            !leading-[16.5px]
                                            !text-[var(--color-text-muted)]
                                        "
                                    >
                                        Redeemed at{" "}
                                        {redeemedTime}
                                    </Typography>
                                </div>

                                {/* Available / Used */}
                                <div
                                    className={`
                                        rounded-[7px]
                                        border
                                        px-[9px]
                                        py-[4px]

                                        ${used
                                            ? `
                                                    border-[var(--color-border)]
                                                    bg-[var(--color-page-background)]
                                                `
                                            : `
                                                    border-[var(--color-status-success-soft-border)]
                                                    bg-[var(--color-status-success-surface)]
                                                `
                                        }
                                    `}
                                >
                                    <Typography
                                        variant="meta"
                                        className={`
                                            !text-[10px]

                                            ${used
                                                ? "!text-[var(--color-text-muted)]"
                                                : "!text-[var(--color-status-success)]"
                                            }
                                        `}
                                    >
                                        {used
                                            ? "USED"
                                            : "AVAILABLE"}
                                    </Typography>
                                </div>
                            </div>

                            {/* Voucher */}
                            <div
                                className="
                                    mt-3
                                    rounded-[8px]
                                    bg-[var(--color-page-background)]
                                    px-3
                                    py-[10px]
                                    text-center
                                "
                            >
                                <Typography
                                    variant="meta"
                                    className="
                                        block
                                        !text-[10px]
                                        !text-[var(--color-text-muted)]
                                    "
                                >
                                    VOUCHER CODE
                                </Typography>

                                <Typography
                                    variant="sectionHeader"
                                    className={`
                                        mt-[3px]
                                        block
                                        !text-[20px]
                                        tracking-[2.4px]

                                        ${used
                                            ? "line-through !text-[var(--color-text-muted)]"
                                            : "!text-[var(--color-brand-primary)]"
                                        }
                                    `}
                                >
                                    {
                                        entry.voucherCode
                                    }
                                </Typography>

                                {used && (
                                    <Typography
                                        variant="body"
                                        className="
                                            mt-[2px]
                                            block
                                            !text-[11px]
                                            !text-[var(--color-text-muted)]
                                        "
                                    >
                                        This voucher has been applied
                                    </Typography>
                                )}
                            </div>
                        </Card>
                    );
                }
            )}
        </div>
    );
}