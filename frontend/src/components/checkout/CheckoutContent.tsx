"use client";

import { useState } from "react";

import Typography from "@/components/ui/Typography";

import { useOrder } from "@/components/order/OrderProvider";
import { PIT_STOPS } from "@/data/pitStopConstantData";

import ChangePitStopPopup from "@/components/order/ChangePitStopPopup";
import CheckoutVoucher from "./CheckoutVoucher";
import CheckoutPriceBreakdown from "./CheckoutPriceBreakdown";
import CheckoutRewards from "./CheckoutRewards";
import CheckoutBottomBar from "./CheckoutBottomBar";
import CheckoutCollectionPoint from "./CheckoutCollectionPoint";


export default function CheckoutContent() {

    // Controls the Change Collection Point popup.
    const [
        changePitStopOpen,
        setChangePitStopOpen,
    ] = useState(false);

    // Shared selected pit stop
    const {
        selectedPitStopId,
        setSelectedPitStopId,
    } = useOrder();

    // Find the full Pit Stop object for display.
    const selectedPitStop = PIT_STOPS.find(
        (stop) =>
            stop.id === selectedPitStopId
    );

    return (
        <main className="min-h-screen bg-[var(--color-page-background)]">

            {/* Heading */}
            <section
                className="
                    border-b
                    border-[var(--color-border)]
                    bg-[var(--color-surface)]
                    px-5
                    pb-[14px]
                    pt-4
                "
            >
                <Typography
                    variant="screenTitle"
                    className="
                        block
                        !text-[30px]
                        !leading-[31.5px]
                    "
                >
                    ORDER SUMMARY
                </Typography>

                <Typography
                    variant="body"
                    className="
                        mt-1
                        block
                        !text-[13px]
                        !leading-[19.5px]
                        !text-[var(--color-text-muted)]
                    "
                >
                    Review your order before placing it.
                </Typography>
            </section>

            {/* Checkout content */}
            <div
                className="
                    flex
                    flex-col
                    gap-3
                    px-4
                    pb-[170px]
                    pt-4
                "
            >
                <CheckoutCollectionPoint
                    pitStop={selectedPitStop}
                    onChange={() =>
                        setChangePitStopOpen(true)
                    }
                />

                {/* Empty cart state from Figma */}
                <section
                    className="
                        rounded-[12px]
                        border
                        border-[var(--color-border)]
                        bg-[var(--color-surface)]
                    "
                >
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
                </section>

                <CheckoutVoucher />

                {/* No order yet, so all prices are zero */}
                <CheckoutPriceBreakdown
                    subtotal={0}
                    serviceFee={0}
                    total={0}
                />

                <CheckoutRewards points={0} />
            </div>

            {/* Disabled Figma bottom action */}
            <CheckoutBottomBar />

            {/* Pit Stop popup*/}
            <ChangePitStopPopup
                isOpen={changePitStopOpen}
                selectedPitStopId={
                    selectedPitStopId
                }
                onSelect={
                    setSelectedPitStopId
                }
                onClose={() =>
                    setChangePitStopOpen(false)
                }
            />
        </main>
    );
}