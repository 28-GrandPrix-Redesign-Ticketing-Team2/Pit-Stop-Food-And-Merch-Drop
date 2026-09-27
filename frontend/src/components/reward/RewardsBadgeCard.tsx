import { Icon } from "@iconify/react";

import Card from "@/components/ui/Card";
import Typography from "@/components/ui/Typography";

import type { RewardBadge, UserBadgeProgress }
    from "@/data/rewardsConstantData";

type BadgeStatus =
    | "earned"
    | "inProgress"
    | "locked";

type RewardsBadgeCardProps = {
    badge: RewardBadge;
    userProgress: UserBadgeProgress;
};

export default function RewardsBadgeCard({
    badge,
    userProgress,
}: RewardsBadgeCardProps) {
    // Status comes from backend styled user dat.
    const status: BadgeStatus =
        userProgress.earned
            ? "earned"
            : userProgress.progress > 0
                ? "inProgress"
                : "locked";

    const progressPercent = Math.min(
        100,
        (
            userProgress.progress /
            badge.target
        ) * 100
    );

    const statusLabel =
        status === "earned"
            ? "EARNED"
            : status === "inProgress"
                ? "IN PROGRESS"
                : "LOCKED";

    return (
        <Card
            className={`
                min-h-[146px]
                !rounded-[12px]
                !p-3

                ${status === "earned"
                    ? "!border-[var(--color-rewards-earned-border)]"
                    : status === "inProgress"
                        ? "!border-[var(--color-rewards-progress-border)]"
                        : "!border-[var(--color-border)] opacity-60"
                }
            `}
        >
            {/* Status + reward points */}
            <div
                className="
                    flex
                    items-center
                    justify-between
                "
            >
                <Typography
                    variant="meta"
                    className={`
                        !text-[9px]
                        !font-bold
                        !leading-[13.5px]
                        tracking-[0.45px]

                        ${status === "earned"
                            ? "!text-[var(--color-brand-primary)]"
                            : status === "inProgress"
                                ? "!text-[var(--color-rewards-progress)]"
                                : "!text-[var(--color-text-muted)]"
                        }
                    `}
                >
                    {statusLabel}
                </Typography>

                {badge.rewardPoints !== null && (
                    <Typography
                        variant="meta"
                        className="
                            !text-[10px]
                            !font-bold
                            !leading-[15px]
                            !text-[var(--color-text-muted)]
                        "
                    >
                        +{badge.rewardPoints}
                    </Typography>
                )}
            </div>

            {/* Badge icon */}
            <div
                className={`
                    mt-2
                    flex
                    h-[34px]
                    w-[34px]
                    items-center
                    justify-center
                    rounded-full
                    border

                    ${status === "earned"
                        ? `
                                border-[var(--color-brand-primary)]
                                bg-[var(--color-rewards-earned-surface)]
                            `
                        : status === "inProgress"
                            ? `
                                    border-[var(--color-rewards-progress)]
                                    bg-[var(--color-rewards-progress-surface)]
                                `
                            : `
                                    border-[var(--color-border)]
                                    bg-[var(--color-page-background)]
                                `
                    }
                `}
            >
                <Icon
                    icon={
                        status === "locked"
                            ? "ph:lock-fill"
                            : badge.icon
                    }
                    width="17"
                    height="17"
                    className={
                        status === "earned"
                            ? "text-[var(--color-brand-primary)]"
                            : status === "inProgress"
                                ? "text-[var(--color-rewards-progress)]"
                                : "text-[var(--color-text-muted)]"
                    }
                />
            </div>

            {/* Badge name */}
            <Typography
                variant="cardHeading"
                className="
                    mt-2
                    block
                    !text-[13px]
                    !leading-[14.3px]
                "
            >
                {badge.name}
            </Typography>

            {/* Description */}
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
                {badge.description}
            </Typography>

            {/* Only show progress bar when progress has started */}
            {status === "inProgress" && (
                <div
                    className="
                        mt-2
                        h-1
                        overflow-hidden
                        rounded-full
                        bg-[var(--color-page-background)]
                    "
                >
                    <div
                        className="
                            h-full
                            rounded-full
                            bg-[var(--color-rewards-progress)]
                        "
                        style={{
                            width: `${progressPercent}%`,
                        }}
                    />
                </div>
            )}

            {/* Card footer */}
            <div
                className="
                    mt-2
                    flex
                    items-center
                    gap-[3px]
                "
            >
                <Icon
                    icon="ph:info"
                    width="10"
                    height="10"
                    className="text-[var(--color-text-muted)]"
                />

                <Typography
                    variant="body"
                    className="
                        !text-[10px]
                        !leading-[15px]
                        !text-[var(--color-text-muted)]
                    "
                >
                    Tap for details
                </Typography>
            </div>
        </Card>
    );
}