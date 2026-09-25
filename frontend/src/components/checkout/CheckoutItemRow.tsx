import { Icon } from "@iconify/react";

import Typography from "@/components/ui/Typography";
import type { OrderItem } from "@/data/orderConstantData";

type CheckoutItemRowProps = {
    item: OrderItem;
    quantity: number;
    isFree?: boolean;
    hasBorder?: boolean;
};

export default function CheckoutItemRow({
    item,
    quantity,
    isFree = false,
    hasBorder = false,
}: CheckoutItemRowProps) {
    const itemTotal =
        item.price * quantity;

    return (
        <div
            className={`
                flex
                items-center
                gap-3
                px-4
                py-3

                ${hasBorder
                    ? `
                            border-b
                            border-[var(--color-border)]
                        `
                    : ""
                }
            `}
        >
            {/* Product icon */}
            <div
                className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-[10px]
                "
                style={{
                    backgroundColor:
                        item.imageBackground,
                }}
            >
                <Icon
                    icon={item.icon}
                    width={28}
                    height={28}
                />
            </div>

            {/* Product details */}
            <div className="min-w-0 flex-1">
                <Typography
                    variant="cardHeading"
                    className="
                        block
                        !text-[15px]
                        !leading-[16.5px]
                    "
                >
                    {item.name}
                </Typography>

                <Typography
                    variant="body"
                    className="
                        mt-[2px]
                        block
                        !text-[12px]
                        !leading-[18px]
                        !text-[var(--color-text-muted)]
                    "
                >
                    Qty: {quantity}
                </Typography>
            </div>

            {/* Price */}
            <Typography
                variant="price"
                className={`
                    shrink-0
                    !text-[16px]
                    !leading-6

                    ${isFree
                        ? "!text-[var(--color-status-success)]"
                        : "!text-[var(--color-status-warning)]"
                    }
                `}
            >
                {isFree
                    ? "FREE"
                    : `$${itemTotal.toFixed(2)}`}
            </Typography>
        </div>
    );
}