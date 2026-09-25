import { Icon } from "@iconify/react";

import Button from "@/components/ui/Buttons";
import Typography from "@/components/ui/Typography";

type CheckoutBottomBarProps = {
    totalItems: number;
    total: number;
};

export default function CheckoutBottomBar({
    totalItems,
    total,
}: CheckoutBottomBarProps) {
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
                disabled={totalItems === 0}
                className={`
                    flex
                    !h-[56px]
                    items-center
                    justify-center
                    gap-2
                    !rounded-[12px]
                    ${totalItems === 0
                        ? "!bg-[#ccc] !opacity-100"
                        : ""
                    }
                `}
            >
                <Icon
                    icon={
                        totalItems === 0
                            ? "ph:shopping-cart-simple-fill"
                            : "ph:lock-key-fill"
                    }
                    width="16"
                    height="16"
                />

                <Typography
                    variant="button"
                    className="
                        uppercase
                        tracking-[0.64px]
                        !text-[var(--color-text-on-primary)]
                    "
                >
                    {totalItems === 0
                        ? "NO ITEMS IN CART"
                        : `PLACE ORDER — $${total.toFixed(
                            2
                        )}`}
                </Typography>
            </Button>
        </div>
    );
}