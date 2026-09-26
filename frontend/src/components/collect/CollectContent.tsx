"use client";

import { useOrder } from "@/components/order/OrderProvider";
import { COLLECT_STATUS } from "@/data/collectConstantData";
import { PIT_STOPS } from "@/data/pitStopConstantData";

import CollectEmptyState from "./CollectEmptyState";
import CollectReadyState from "./CollectReadyState";
import CollectCompleteState from "./CollectCompleteState";
import CollectProgressState from "../order/CollectProgressState";

export default function CollectContent() {
    const {
        activeOrder,
        updateActiveOrderStatus,
    } = useOrder();

    // No placed order yet.
    if (!activeOrder) {
        return (
            <section
                className="
                    flex
                    h-[calc(100dvh-var(--app-header-height)-var(--bottom-nav-height))]
                    w-full
                    items-center
                    justify-center
                    bg-[var(--color-page-background)]
                    px-8
                "
            >
                <CollectEmptyState />
            </section>
        );
    }

    // Get the Pit Stop 
    const pitStop =
        PIT_STOPS.find(
            (stop) =>
                stop.id ===
                activeOrder.pitStopId
        );

    // Protect against invalid order data.
    if (!pitStop) {
        return (
            <section
                className="
                    flex
                    h-[calc(100dvh-var(--app-header-height)-var(--bottom-nav-height))]
                    w-full
                    items-center
                    justify-center
                    bg-[var(--color-page-background)]
                    px-8
                "
            >
                <CollectEmptyState />
            </section>
        );
    }

    // Received and Preparing share
    if (
        activeOrder.status ===
        COLLECT_STATUS.RECEIVED ||
        activeOrder.status ===
        COLLECT_STATUS.PREPARING
    ) {
        return (
            <CollectProgressState
                order={activeOrder}
                pitStop={pitStop}
            />
        );
    }

    if (
        activeOrder.status ===
        COLLECT_STATUS.READY
    ) {
        return (
            <CollectReadyState
                order={activeOrder}
                pitStop={pitStop}
                onCollected={() =>
                    updateActiveOrderStatus(
                        COLLECT_STATUS.COMPLETED
                    )
                }
            />
        );
    }

    if (
        activeOrder.status ===
        COLLECT_STATUS.COMPLETED
    ) {
        return (
            <CollectCompleteState
                order={activeOrder}
            />
        );
    }

    return null;
}