import { Icon } from "@iconify/react";

import Card from "@/components/ui/Card";
import Typography from "@/components/ui/Typography";

import {
    ORDER_ITEMS,
} from "@/data/orderConstantData";

import type {
    ActiveOrder,
} from "@/components/order/OrderProvider";

type CollectItemsCardProps = {
    order: ActiveOrder;
    title?:
    | "YOUR ITEMS"
    | "ITEMS TO COLLECT";
    showTotal?: boolean;
};

export default function CollectItemsCard({
    order,
    title = "YOUR ITEMS",
    showTotal = false,
}: CollectItemsCardProps) {
    return (
        <Card
            className="
                !rounded-[14px]
                !px-4
                !py-[14px]
            "
        >
            <Typography
                variant="meta"
                className="
                    tracking-[0.66px]
                    !text-[var(--color-text-muted)]
                "
            >
                {title}
            </Typography>

            <div
                className="
                    mt-[10px]
                    flex
                    flex-col
                    gap-[10px]
                "
            >
                {order.items.map(
                    (orderItem) => {
                        // Find the display information for this ordered item
                        const item =
                            ORDER_ITEMS.find(
                                (catalogueItem) =>
                                    catalogueItem.id ===
                                    orderItem.itemId
                            );

                        if (!item) {
                            return null;
                        }

                        const itemTotal = orderItem.unitPrice * orderItem.quantity;

                        const isFree = itemTotal === 0;

                        return (
                            <div
                                key={orderItem.itemId}
                                className="
                                    flex
                                    items-center
                                    justify-between
                                    gap-3
                                "
                            >
                                <div
                                    className="
                                        flex
                                        min-w-0
                                        items-center
                                        gap-2
                                    "
                                >
                                    <Icon
                                        icon={
                                            item.icon
                                        }
                                        width="20"
                                        height="20"
                                        className="shrink-0"
                                    />

                                    <Typography
                                        variant="body"
                                        className="
                                            truncate
                                            !text-[13px]
                                            !leading-[19.5px]
                                        "
                                    >
                                        {orderItem.quantity}×{" "}
                                        {item.name}
                                    </Typography>
                                </div>

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
                                    {isFree ? "FREE" : `$${itemTotal.toFixed(2)}`}
                                </Typography>
                            </div>
                        );
                    }
                )}
            </div>

            {showTotal && (
                <>
                    <div
                        className="
                            my-[10px]
                            h-px
                            bg-[var(--color-border)]
                        "
                    />

                    <div
                        className="
                            flex
                            items-center
                            justify-between
                        "
                    >
                        <Typography
                            variant="body"
                            className="
                                !text-[12px]
                                !leading-[18px]
                                !text-[var(--color-text-muted)]
                            "
                        >
                            Total paid
                        </Typography>

                        <Typography
                            variant="price"
                            className="
                                !text-[16px]
                                !leading-6
                                !text-[var(--color-brand-primary)]
                            "
                        >
                            $
                            {order.totalPaid.toFixed(2)}
                        </Typography>
                    </div>
                </>
            )}
        </Card>
    );
}