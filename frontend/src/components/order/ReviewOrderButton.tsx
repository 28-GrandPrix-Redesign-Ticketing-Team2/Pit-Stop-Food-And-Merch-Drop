"use client";

import { Icon } from "@iconify/react";

import Button from "@/components/ui/Buttons";
import Typography from "@/components/ui/Typography";

type ReviewOrderButtonProps = {
    itemCount: number;
    totalPrice: number;
    onClick: () => void;
};

export default function ReviewOrderButton({
    itemCount,
    totalPrice,
    onClick,
}: ReviewOrderButtonProps) {
    // Hide Review Order until at least one item is selected.
    if (itemCount === 0) return null;

    return (
        <div
            className="
                fixed
                bottom-[82px]
                left-1/2
                z-40
                w-full
                max-w-[430px]
                -translate-x-1/2
                border-t
                border-[var(--color-border)]
                bg-[var(--color-surface)]
                px-4
                pb-1
                pt-3
            "
        >
            <Button
                type="button"
                onClick={onClick}
                className="
                    flex
                    !h-[56px]
                    items-center
                    justify-center
                    gap-2
                    !rounded-[12px]
                "
            >
                <Icon
                    icon="ph:shopping-cart-simple-fill"
                    width="16"
                    height="16"
                />

                <Typography
                    variant="button"
                    className="
                        text-center
                        uppercase
                        tracking-[0.64px]
                        !text-[var(--color-text-on-primary)]
                    "
                >
                    Review Order ({itemCount}{" "}
                    {itemCount === 1 ? "item" : "items"}) — $
                    {totalPrice.toFixed(2)}
                </Typography>
            </Button>
        </div>
    );
}