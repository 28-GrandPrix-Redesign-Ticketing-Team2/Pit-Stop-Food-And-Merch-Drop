import { Icon } from "@iconify/react";

import Button from "@/components/ui/Buttons";
import Typography from "@/components/ui/Typography";
import BottomActionBar from "../ui/BottomActionBar";

type CheckoutBottomBarProps = {
    totalItems: number;
    total: number;
    hasPitStop: boolean;
};

export default function CheckoutBottomBar({
    totalItems,
    total,
    hasPitStop,
}: CheckoutBottomBarProps) {

    // Protect direct checkout access
    const canPlaceOrder =
        totalItems > 0 && hasPitStop;

    return (
        <BottomActionBar>
            <Button
                type="button"
                disabled={!canPlaceOrder}
                className={`
                    flex
                    !h-[56px]
                    items-center
                    justify-center
                    gap-2
                    !rounded-[12px]
                    ${!canPlaceOrder
                        ? "!bg-[var(--color-action-disabled)] !opacity-100"
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
                        : !hasPitStop
                            ? "SELECT PIT STOP"
                            : `PLACE ORDER — $${total.toFixed(2)}`
                    }
                </Typography>
            </Button>
        </BottomActionBar>
    );
}