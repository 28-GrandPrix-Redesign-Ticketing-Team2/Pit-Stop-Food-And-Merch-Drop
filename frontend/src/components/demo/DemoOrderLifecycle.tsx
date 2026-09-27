"use client";

import { useEffect } from "react";

import { useDemoMode } from "@/components/DemoProvider";

import { useOrder } from "@/components/order/OrderProvider";

import { COLLECT_STATUS, CollectStatus } from "@/data/collectConstantData";

import { DEMO_ORDER_STATUS_DELAY_MS } from "@/data/demoConstantData";

export default function DemoOrderLifecycle() {
    const { demoMode } = useDemoMode();

    const {
        activeOrder,
        updateActiveOrderStatus,
    } = useOrder();

    useEffect(() => {
        // Do nothing when Demo Mode is disabled or there is no current order
        if (
            !demoMode ||
            !activeOrder
        ) return;

        let nextStatus:
            CollectStatus | null =
            null;

        // Demo - RECEIVED -> PREPARING
        if (
            activeOrder.status ===
            COLLECT_STATUS.RECEIVED
        ) {
            nextStatus =
                COLLECT_STATUS.PREPARING;
        }

        // Demo - PREPARING -> READY
        if (
            activeOrder.status ===
            COLLECT_STATUS.PREPARING
        ) {
            nextStatus =
                COLLECT_STATUS.READY;
        }

        // READY and COMPLETED
        if (!nextStatus) return;


        const timer =
            window.setTimeout(
                () => {
                    updateActiveOrderStatus(nextStatus);
                },
                DEMO_ORDER_STATUS_DELAY_MS
            );

        // Cancel the pending transition if Demo Mode turns off, order changes,
        // or this component unmounts.
        return () => {
            window.clearTimeout(timer);
        };
    }, [
        demoMode,
        activeOrder,
        updateActiveOrderStatus,
    ]);

    return null;
}