import Typography from "@/components/ui/Typography";
import { ORDER_ITEMS } from "@/data/orderConstantData";

import CheckoutItemRow from "./CheckoutItemRow";

type CheckoutItemsProps = {
    quantities: Record<string, number>;
    freeItemId?: string | null;
};

export default function CheckoutItems({
    quantities,
    freeItemId,
}: CheckoutItemsProps) {
    // Only display items that have actually been added.
    const selectedItems = ORDER_ITEMS.filter(
        (item) =>
            (quantities[item.id] ?? 0) > 0
    );

    // Item added free by a voucher.
    const freeItem = ORDER_ITEMS.find(
        (item) =>
            item.id === freeItemId
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
            {selectedItems.map((item, index) => {
                const quantity =
                    quantities[item.id];

                const hasBorder =
                    index <
                    selectedItems.length - 1 ||
                    freeItem !== undefined;

                return (
                    <CheckoutItemRow
                        key={item.id}
                        item={item}
                        quantity={quantity}
                        hasBorder={hasBorder}
                    />
                );
            })}

            {/* Complimentary voucher item */}
            {freeItem && (
                <CheckoutItemRow
                    item={freeItem}
                    quantity={1}
                    isFree
                />
            )}

        </section>
    );
}