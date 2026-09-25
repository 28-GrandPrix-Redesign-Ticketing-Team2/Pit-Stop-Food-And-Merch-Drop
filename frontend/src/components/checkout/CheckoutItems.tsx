import { Icon } from "@iconify/react";
import Typography from "@/components/ui/Typography";
import { ORDER_ITEMS } from "@/data/orderConstantData";

type CheckoutItemsProps = {
    quantities: Record<string, number>;
};

export default function CheckoutItems({
    quantities,
}: CheckoutItemsProps) {
    // Only display items that have actually been added.
    const selectedItems = ORDER_ITEMS.filter(
        (item) =>
            (quantities[item.id] ?? 0) > 0
    );

    return (
        <section
            className="
                overflow-hidden
                rounded-[12px]
                border
                border-[var(--color-border)]
                bg-[var(--color-surface)]
            "
        >
            {/* Heading */}
            <div
                className="
                    border-b
                    border-[var(--color-border)]
                    px-4
                    py-3
                "
            >
                <Typography
                    variant="meta"
                    className="
                        tracking-[0.66px]
                        !text-[var(--color-text-muted)]
                    "
                >
                    YOUR ITEMS
                </Typography>
            </div>

            {/* Selected Order items */}
            {selectedItems.map(
                (item, index) => {
                    const quantity =
                        quantities[item.id];

                    const itemTotal =
                        item.price * quantity;

                    return (
                        <div
                            key={item.id}
                            className={`
                                flex
                                items-center
                                gap-3
                                px-4
                                py-3

                                ${index <
                                    selectedItems.length -
                                    1
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

                            {/* Item name + quantity */}
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

                            {/* Quantity × price */}
                            <Typography
                                variant="price"
                                className="
                                    shrink-0
                                    !text-[16px]
                                    !leading-6
                                    !text-[var(--color-status-warning)]
                                "
                            >
                                $
                                {itemTotal.toFixed(
                                    2
                                )}
                            </Typography>
                        </div>
                    );
                }
            )}
        </section>
    );
}