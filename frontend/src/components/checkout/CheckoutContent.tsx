"use client";

import { useState } from "react";
import { useOrder } from "@/components/order/OrderProvider";

import ChangePitStopPopup from "@/components/popUp/ChangePitStopPopup";
import {
    CHECKOUT_VOUCHERS,
    CheckoutVoucherData,
    REWARD_POINT_MULTIPLIER,
    SERVICE_FEES_ITEMS,
    SERVICE_FEES_ZERO_ITEMS
} from "@/data/checkoutConstantData";

import CheckoutVoucher from "./CheckoutVoucher";
import CheckoutPriceBreakdown from "./CheckoutPriceBreakdown";
import CheckoutRewards from "./CheckoutRewards";
import CheckoutBottomBar from "./CheckoutBottomBar";
import CheckoutCollectionPoint from "./CheckoutCollectionPoint";
import CheckoutItems from "./CheckoutItems";
import { useRewards } from "../reward/RewardsProvider";
import { useRouter } from "next/navigation";
import { useDemoMode } from "../DemoProvider";


export default function CheckoutContent() {
    const router = useRouter();

    // demo mode
    const { demoMode } = useDemoMode();

    // vouchures
    const { markVoucherUsed } = useRewards();

    // Controls the Change Collection Point popup.
    const [
        changePitStopOpen,
        setChangePitStopOpen,
    ] = useState(false);

    // Voucher input value
    const [
        voucherCode,
        setVoucherCode,
    ] = useState("");

    // Currently applied valid voucher
    const [
        appliedVoucher,
        setAppliedVoucher,
    ] =
        useState<CheckoutVoucherData | null>(
            null
        );

    // Controls invalid voucher message
    const [
        voucherInvalid,
        setVoucherInvalid,
    ] = useState(false);

    // Shared selected pit stop
    const {
        selectedPitStop,
        selectedPitStopId,
        setSelectedPitStopId,
        quantities,
        totalItems,
        totalPrice,
        placeOrder,
    } = useOrder();

    // Service Fees
    const serviceFee =
        totalItems > 0 ? SERVICE_FEES_ITEMS : SERVICE_FEES_ZERO_ITEMS;

    // Total before Disc
    const totalBeforeVoucher =
        totalPrice + serviceFee;

    // Discount supplied by the currently applied voucher.
    const voucherDiscount =
        appliedVoucher?.effect.type ===
            "discount"
            ? appliedVoucher.effect.amount
            : 0;

    // Complimentary item supplied by the currently applied voucher.
    const freeItemId =
        appliedVoucher?.effect.type ===
            "freeItem"
            ? appliedVoucher.effect.itemId
            : null;

    // Final amount
    const total =
        totalBeforeVoucher -
        voucherDiscount;

    // Rewards are calculated before voucher discount so 
    // e.g. $5 with $1 discount still shows 50pts not 40pts
    const rewardPoints =
        Math.round(
            totalBeforeVoucher *
            REWARD_POINT_MULTIPLIER
        );

    // demo
    function handlePlaceOrder() {
        // Orders can only be placed during the frontend demo mode
        if (!demoMode) return

        const order =
            placeOrder({
                totalPaid: total,
                rewardPoints,
            });

        if (!order) return;
        router.push("/collect");
    }

    // Updates voucher input
    function handleVoucherCodeChange(
        value: string
    ) {
        setVoucherCode(value);

        // Clear error when user starts editing again
        if (voucherInvalid) {
            setVoucherInvalid(false);
        }
    }

    // Checks whether entered voucher is valid
    function handleApplyVoucher() {
        const normalizedCode =
            voucherCode
                .trim()
                .toUpperCase();

        const voucher =
            CHECKOUT_VOUCHERS.find(
                (item) =>
                    item.code ===
                    normalizedCode
            );

        // Invalid voucher state.
        if (!voucher) {
            setAppliedVoucher(null);
            setVoucherInvalid(true);
            return;
        }

        // Apply valid voucher
        setAppliedVoucher(voucher);
        setVoucherInvalid(false);
        // Update Rewards history
        markVoucherUsed(voucher.code);
    }

    // Removes currently applied voucher
    function handleRemoveVoucher() {
        setAppliedVoucher(null);
        setVoucherCode("");
        setVoucherInvalid(false);
    }

    return (
        <main className="min-h-screen bg-[var(--color-page-background)]">

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

                <CheckoutItems
                    quantities={quantities}
                    freeItemId={freeItemId}

                />

                <CheckoutVoucher
                    voucherCode={voucherCode}
                    appliedVoucher={appliedVoucher}
                    invalid={voucherInvalid}
                    onCodeChange={
                        handleVoucherCodeChange
                    }
                    onApply={
                        handleApplyVoucher
                    }
                    onRemove={
                        handleRemoveVoucher
                    }
                />

                <CheckoutPriceBreakdown
                    subtotal={totalPrice}
                    serviceFee={serviceFee}
                    voucherDiscount={voucherDiscount}
                    voucherLabel={
                        appliedVoucher?.effect.type ===
                            "discount"
                            ? appliedVoucher.title
                            : undefined
                    }
                    total={total}
                />

                <CheckoutRewards
                    points={
                        totalItems > 0
                            ? rewardPoints
                            : 0
                    }
                />
            </div>

            {/* Checkout action */}
            <CheckoutBottomBar
                totalItems={totalItems}
                total={total}
                hasPitStop={
                    selectedPitStopId !== null
                }
                demoMode={demoMode}
                onPlaceOrder={handlePlaceOrder}
            />

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