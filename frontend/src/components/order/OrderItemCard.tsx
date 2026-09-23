import { Icon } from "@iconify/react";

import Card from "@/components/ui/Card";
import Typography from "@/components/ui/Typography";
import Button from "@/components/ui/Buttons";

import { ORDER_ITEMS } from "@/data/orderConstantData";

type OrderItem = (typeof ORDER_ITEMS)[number];

// Item Cards
type OrderItemCardProps = {
    item: OrderItem;
    quantity: number;
    onIncrease: () => void;
    onDecrease: () => void;
};

export default function OrderItemCard({
    item,
    quantity,
    onIncrease,
    onDecrease,
}: OrderItemCardProps) {
    return (
        <Card className="!p-[14px]">
            <div className="flex gap-3">

                {/* Item icon */}
                <div
                    className="
                        flex
                        h-[72px]
                        w-[72px]
                        shrink-0
                        items-center
                        justify-center
                        rounded-[12px]
                    "
                    style={{
                        backgroundColor:
                            item.imageBackground,
                    }}
                >
                    <Icon
                        icon={item.icon}
                        width={40}
                        height={40}
                    />
                </div>

                {/* Item details */}
                <div className="min-w-0 flex-1">

                    <div
                        className="
                            flex
                            items-start
                            justify-between
                            gap-3
                        "
                    >
                        <Typography
                            variant="cardHeading"
                            className="
                                !text-[15px]
                                !leading-[16.5px]
                            "
                        >
                            {item.name}
                        </Typography>

                        <Typography
                            variant="price"
                            className="
                                shrink-0
                                !text-[var(--color-status-warning)]
                            "
                        >
                            $
                            {item.price.toFixed(
                                2
                            )}
                        </Typography>
                    </div>

                    <div className="mt-[3px]">
                        <Typography
                            variant="body"
                            className="
                                !text-[12px]
                                !leading-[18px]
                                !text-[var(--color-text-muted)]
                            "
                        >
                            {item.description}
                        </Typography>
                    </div>

                    {/* Quantity */}
                    <div
                        className="
                            mt-[10px]
                            flex
                            items-center
                            justify-end
                            gap-2
                        "
                    >
                        <Button
                            type="button"
                            aria-label={`Remove ${item.name}`}
                            onClick={onDecrease}
                            disabled={
                                quantity === 0
                            }
                            className="
                                !h-[30px]
                                !w-[30px]
                                !rounded-[8px]
                                !border
                                !border-[var(--color-border)]
                                !bg-[var(--color-page-background)]
                                !p-0
                                !text-[var(--color-text-primary)]
                            "
                        >
                            <span
                                className="
                                    flex
                                    h-full
                                    w-full
                                    items-center
                                    justify-center
                                "
                            >
                                <Icon
                                    icon="mdi:minus"
                                    width={14}
                                    height={14}
                                />
                            </span>
                        </Button>

                        <div className="min-w-[18px] text-center">
                            <Typography variant="cardHeading">
                                {quantity}
                            </Typography>
                        </div>

                        <Button
                            type="button"
                            aria-label={`Add ${item.name}`}
                            onClick={onIncrease}
                            className="
                                !h-[30px]
                                !w-[30px]
                                !rounded-[8px]
                                !p-0
                            "
                        >
                            <span
                                className="
                                    flex
                                    h-full
                                    w-full
                                    items-center
                                    justify-center
                                "
                            >
                                <Icon
                                    icon="mdi:plus"
                                    width={14}
                                    height={14}
                                />
                            </span>
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
}