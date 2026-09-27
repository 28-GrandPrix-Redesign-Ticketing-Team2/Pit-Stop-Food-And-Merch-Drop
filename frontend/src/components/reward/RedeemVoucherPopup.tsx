"use client";

import { useState } from "react";

import { Icon } from "@iconify/react";

import BottomPopUp from "@/components/popUp/BottomPopUp";
import Button from "@/components/ui/Buttons";
import Typography from "@/components/ui/Typography";

import type { CheckoutVoucherData } from "@/data/checkoutConstantData";

import type { RedeemReward } from "@/data/rewardsConstantData";

type RedeemVoucherPopupProps = {
    reward: RedeemReward | null;
    voucher: CheckoutVoucherData | null;

    onClose: () => void;
};

export default function RedeemVoucherPopup({
    reward,
    voucher,
    onClose,
}: RedeemVoucherPopupProps) {
    const [
        copied,
        setCopied,
    ] = useState(false);

    if (!reward || !voucher) {
        return null;
    }

    const voucherCode = voucher.code;

    // Copies the actual Checkout voucher code.
    async function handleCopyCode() {
        try {
            await navigator.clipboard.writeText(
                voucherCode
            );

            setCopied(true);
        } catch {
            setCopied(false);
        }
    }

    function handleClose() {
        setCopied(false);
        onClose();
    }

    return (
        <BottomPopUp
            isOpen
            onClose={handleClose}
            ariaLabel="Close voucher"
        >
            <div
                className="
                    mt-5
                    flex
                    flex-col
                    items-center
                "
            >
                {/* Reward icon */}
                <div
                    className="
                        flex
                        h-[60px]
                        w-[60px]
                        items-center
                        justify-center
                        rounded-[14px]
                        border
                        border-[var(--color-status-success)]
                        bg-[var(--color-status-success-surface)]
                    "
                >
                    <Icon
                        icon={reward.icon}
                        width="32"
                        height="32"
                    />
                </div>

                <Typography
                    variant="sectionHeader"
                    className="
                        mt-3
                        block
                        !text-[22px]
                        !leading-[33px]
                    "
                >
                    VOUCHER UNLOCKED
                </Typography>

                <Typography
                    variant="body"
                    className="
                        mt-1
                        !text-[13px]
                        !leading-[19.5px]
                        !text-[var(--color-text-muted)]
                    "
                >
                    {reward.name}
                </Typography>

                {/* Voucher code */}
                <div
                    className="
                        mt-5
                        w-full
                        rounded-[12px]
                        border-2
                        border-dashed
                        border-[var(--color-border)]
                        bg-[var(--color-page-background)]
                        p-4
                        text-center
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
                        YOUR VOUCHER CODE
                    </Typography>

                    <Typography
                        variant="sectionHeader"
                        className="
                            mt-[6px]
                            block
                            !text-[28px]
                            !leading-[42px]
                            tracking-[3.36px]
                            !text-[var(--color-brand-primary)]
                        "
                    >
                        {voucher.code}
                    </Typography>

                    <Typography
                        variant="body"
                        className="
                            mt-[6px]
                            block
                            !text-[11px]
                            !leading-[16.5px]
                            !text-[var(--color-text-muted)]
                        "
                    >
                        Show this at the kiosk or enter
                        at checkout
                    </Typography>
                </div>

                {/* Copy voucher code */}
                <Button
                    type="button"
                    onClick={
                        handleCopyCode
                    }
                    className={`
                        mt-4
                        flex
                        !h-[52px]
                        w-full
                        items-center
                        justify-center
                        gap-2
                        !rounded-[12px]

                        ${copied
                            ? "!bg-[var(--color-status-success)]"
                            : ""
                        }
                    `}
                >
                    <Icon
                        icon={
                            copied
                                ? "ph:check"
                                : "ph:copy"
                        }
                        width="18"
                        height="18"
                    />

                    <Typography
                        variant="button"
                        className="
                            !text-[16px]
                            !leading-6
                            tracking-[0.64px]
                            !text-[var(--color-text-on-primary)]
                        "
                    >
                        {copied
                            ? "COPIED!"
                            : "COPY CODE"}
                    </Typography>
                </Button>

                {/* Close popup */}
                <Button
                    type="button"
                    onClick={
                        handleClose
                    }
                    className="
                        mt-[10px]
                        !h-[50px]
                        w-full
                        !rounded-[12px]
                        !border
                        !border-[var(--color-border)]
                        !bg-[var(--color-surface)]
                    "
                >
                    <Typography
                        variant="button"
                        className="
                            !text-[15px]
                            !leading-[22.5px]
                            !text-[var(--color-text-muted)]
                        "
                    >
                        CLOSE
                    </Typography>
                </Button>
            </div>
        </BottomPopUp>
    );
}