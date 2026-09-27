"use client";

import { Icon } from "@iconify/react";

import BottomPopUp from "@/components/popUp/BottomPopUp";
import Button from "@/components/ui/Buttons";
import Card from "@/components/ui/Card";
import StatusBadge from "@/components/ui/StatusBadge";
import Typography from "@/components/ui/Typography";

import type {
    RewardBadge,
    UserBadgeProgress,
} from "@/data/rewardsConstantData";

type RewardBadgePopupProps = {
    isOpen: boolean;
    onClose: () => void;

    badge: RewardBadge;
    userProgress: UserBadgeProgress;
};

export default function RewardBadgePopup({
    isOpen,
    onClose,
    badge,
    userProgress,
}: RewardBadgePopupProps) {
    // Badge state comes entirely from user data
    const status =
        userProgress.earned
            ? "earned"
            : userProgress.progress > 0
                ? "inProgress"
                : "locked";

    const statusLabel =
        status === "earned"
            ? "EARNED"
            : status === "inProgress"
                ? "IN PROGRESS"
                : "LOCKED";

    const progressPercent =
        Math.min(
            100,
            (
                userProgress.progress /
                badge.target
            ) * 100
        );

    return (
        <BottomPopUp
            isOpen={isOpen}
            onClose={onClose}
            ariaLabel={`Close ${badge.name} details`}
        >
            {/* Badge heading */}
            <div
                className="
                    mt-5
                    flex
                    items-center
                    gap-[14px]
                "
            >
                {/* Badge icon */}
                <div
                    className={`
                        flex
                        h-[52px]
                        w-[52px]
                        shrink-0
                        items-center
                        justify-center
                        rounded-[12px]
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
                        width="25"
                        height="25"
                        className={
                            status === "earned"
                                ? "text-[var(--color-brand-primary)]"
                                : status === "inProgress"
                                    ? "text-[var(--color-rewards-progress)]"
                                    : "text-[var(--color-text-muted)]"
                        }
                    />
                </div>

                <div>
                    <Typography
                        variant="sectionHeader"
                        className="
                            block
                            !text-[20px]
                            !leading-[30px]
                        "
                    >
                        {badge.name}
                    </Typography>

                    <StatusBadge
                        variant={status}
                    >
                        {statusLabel}
                    </StatusBadge>
                </div>
            </div>

            {/* How to unlock */}
            <Card
                className="
                    mt-4
                    !rounded-[10px]
                    !bg-[var(--color-page-background)]
                    !px-[14px]
                    !py-3
                "
            >
                <Typography
                    variant="meta"
                    className="
                        block
                        !text-[11px]
                        !leading-[16.5px]
                        !text-[var(--color-text-muted)]
                    "
                >
                    HOW TO UNLOCK
                </Typography>

                <Typography
                    variant="body"
                    className="
                        mt-1
                        block
                        !text-[13px]
                        !leading-[19.5px]
                    "
                >
                    {
                        badge.unlockDescription
                    }
                </Typography>
            </Card>

            {/* Progress is only shown for an active badge */}
            {status === "inProgress" && (
                <div className="mt-3">
                    <div
                        className="
                            flex
                            items-center
                            justify-between
                        "
                    >
                        <Typography
                            variant="meta"
                            className="
                                !text-[11px]
                                !leading-[16.5px]
                                !text-[var(--color-text-muted)]
                            "
                        >
                            PROGRESS
                        </Typography>

                        <Typography
                            variant="meta"
                            className="
                                !text-[11px]
                                !leading-[16.5px]
                                !text-[var(--color-rewards-progress)]
                            "
                        >
                            {Math.round(
                                progressPercent
                            )}
                            %
                        </Typography>
                    </div>

                    <div
                        className="
                            mt-[6px]
                            h-[7px]
                            overflow-hidden
                            rounded-full
                            bg-[var(--color-border)]
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
                </div>
            )}

            {/* Completion reward */}
            {badge.rewardPoints !== null && (
                <Card
                    className="
                        mt-3
                        !rounded-[10px]
                        !border-[var(--color-reward-border)]
                        !bg-[var(--color-reward-background)]
                        !px-[14px]
                        !py-[10px]
                    "
                >
                    <div
                        className="
                            flex
                            items-center
                            gap-2
                        "
                    >
                        <Icon
                            icon="ph:star-fill"
                            width="16"
                            height="16"
                            className="text-[var(--color-reward-text)]"
                        />

                        <Typography
                            variant="body"
                            className="
                                !text-[13px]
                                !font-semibold
                                !leading-[19.5px]
                                !text-[var(--color-reward-text)]
                            "
                        >
                            Earns +
                            {badge.rewardPoints} PTS
                            {" "}on completion
                        </Typography>
                    </div>
                </Card>
            )}

            {/* Close popup */}
            <Button
                type="button"
                onClick={onClose}
                className="
                    mt-[14px]
                    !h-[50px]
                    !rounded-[12px]
                    !border
                    !border-[var(--color-border)]
                    !bg-[var(--color-page-background)]
                "
            >
                <Typography
                    variant="button"
                    className="
                        !text-[15px]
                        !leading-[22.5px]
                        tracking-[0.6px]
                        !text-[var(--color-text-primary)]
                    "
                >
                    CLOSE
                </Typography>
            </Button>
        </BottomPopUp>
    );
}