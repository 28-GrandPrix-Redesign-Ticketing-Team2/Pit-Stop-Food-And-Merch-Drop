"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";

import { CATEGORIES, ORDER_ITEMS } from "@/data/orderConstantData";

import Button from "@/components/ui/Buttons";
import Typography from "@/components/ui/Typography";
import OrderItemCard from "./OrderItemCard";

type Category =
    (typeof CATEGORIES)[number]["id"];

export default function OrderContent() {
    const router = useRouter();

    const [category, setCategory] =
        useState<Category>("all");

    const [quantities, setQuantities] =
        useState<Record<string, number>>(
            Object.fromEntries(
                ORDER_ITEMS.map((item) => [
                    item.id,
                    0,
                ])
            )
        );

    const visibleItems = useMemo(() => {
        if (category === "all") {
            return ORDER_ITEMS;
        }

        return ORDER_ITEMS.filter(
            (item) => item.category === category
        );
    }, [category]);

    function increaseQuantity(id: string) {
        setQuantities((current) => ({
            ...current,
            [id]: current[id] + 1,
        }));
    }

    function decreaseQuantity(id: string) {
        setQuantities((current) => ({
            ...current,
            [id]: Math.max(
                0,
                current[id] - 1
            ),
        }));
    }

    return (
        <main className="min-h-screen bg-[var(--color-page-background)]">
            <div
                className="
                    relative
                    mx-auto
                    flex
                    min-h-screen
                    w-full
                    max-w-[430px]
                    flex-col
                    bg-[var(--color-page-background)]
                "
            >
                <div className="flex-1 overflow-y-auto pb-[82px]">

                    {/* Delivery Title */}
                    <section
                        className="
                            border-b
                            border-[var(--color-border)]
                            bg-[var(--color-surface)]
                            px-5
                            pb-3
                            pt-4
                        "
                    >
                        <div className="flex items-center gap-1.5">
                            <Icon
                                icon="mdi:map-marker-outline"
                                width={12}
                                height={12}
                                className="text-[var(--color-text-muted)]"
                            />

                            <Typography
                                variant="meta"
                                className="
                                    tracking-[0.88px]
                                    !text-[var(--color-text-muted)]
                                "
                            >
                                DELIVERING TO: PIT STOP M2
                            </Typography>

                            {/* Rouites back to home */}
                            <Button
                                type="button"
                                onClick={() =>
                                    router.push("/")
                                }
                                className="
                                    ml-auto
                                    !h-auto
                                    !w-auto
                                    !rounded-none
                                    !bg-transparent
                                    !p-0
                                    !text-[var(--color-brand-primary)]
                                "
                            >
                                <Typography
                                    variant="meta"
                                    className="
                                        tracking-[0.88px]
                                        !text-[var(--color-brand-primary)]
                                    "
                                >
                                    CHANGE
                                </Typography>
                            </Button>
                        </div>

                        <div className="mt-1">
                            <Typography
                                variant="screenTitle"
                                className="
                                    !text-[28px]
                                    !leading-[29.4px]
                                "
                            >
                                PIT STOP FUEL & GEAR
                            </Typography>
                        </div>
                    </section>

                    {/* Categories */}
                    <section
                        className="
                            flex
                            gap-2
                            overflow-x-auto
                            border-b
                            border-[var(--color-border)]
                            bg-[var(--color-surface)]
                            px-4
                            py-[10px]
                        "
                    >
                        {CATEGORIES.map((item) => {
                            const selected =
                                category === item.id;

                            return (
                                <Button
                                    key={item.id}
                                    type="button"
                                    onClick={() =>
                                        setCategory(
                                            item.id
                                        )
                                    }
                                    className={`
                                        !h-[32px]
                                        !w-auto
                                        shrink-0
                                        !rounded-[6px]
                                        !border
                                        !px-3
                                        !py-0

                                        ${selected
                                            ? `
                                                    !border-[var(--color-brand-primary)]
                                                    !bg-[var(--color-brand-primary)]
                                                    !text-[var(--color-text-on-primary)]
                                                `
                                            : `
                                                    !border-[var(--color-border)]
                                                    !bg-[var(--color-page-background)]
                                                    !text-[var(--color-text-primary)]
                                                `
                                        }
                                    `}
                                >
                                    <Typography
                                        variant="button"
                                        className="
                                            !text-[12px]
                                            !leading-[18px]
                                            tracking-[0.48px]
                                        "
                                    >
                                        {item.label}
                                    </Typography>
                                </Button>
                            );
                        })}
                    </section>

                    {/* Order items */}
                    <section
                        className="
                            flex
                            flex-col
                            gap-3
                            px-4
                            pt-3
                        "
                    >
                        {visibleItems.map(
                            (item) => (
                                <OrderItemCard
                                    key={item.id}
                                    item={item}
                                    quantity={
                                        quantities[
                                        item.id
                                        ]
                                    }
                                    onIncrease={() =>
                                        increaseQuantity(
                                            item.id
                                        )
                                    }
                                    onDecrease={() =>
                                        decreaseQuantity(
                                            item.id
                                        )
                                    }
                                />
                            )
                        )}
                    </section>
                </div>

            </div>
        </main>
    );
}