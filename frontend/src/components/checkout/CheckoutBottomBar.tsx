import { Icon } from "@iconify/react";

import Button from "@/components/ui/Buttons";
import Typography from "@/components/ui/Typography";

export default function CheckoutBottomBar() {
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
            {/* Disabled because cart is empty */}
            <Button
                type="button"
                disabled
                className="
                    flex
                    !h-[56px]
                    items-center
                    justify-center
                    gap-2
                    !rounded-[12px]
                    !bg-[#ccc]
                    !opacity-100
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
                        uppercase
                        tracking-[0.64px]
                        !text-[var(--color-text-on-primary)]
                    "
                >
                    NO ITEMS IN CART
                </Typography>
            </Button>
        </div>
    );
}