"use client";

import Button from "@/components/ui/Buttons";
import Card from "@/components/ui/Card";
import Typography from "@/components/ui/Typography";

import { PitStop } from "@/data/pitStopConstantData";
import PitStopInfo from "../pitstop/PitStopInfo";


type CheckoutCollectionPointProps = {
    pitStop: PitStop | undefined;
    onChange: () => void;
};

export default function CheckoutCollectionPoint({
    pitStop,
    onChange,
}: CheckoutCollectionPointProps) {
    return (
        <Card className="!rounded-[12px] !px-4 !py-[14px]">

            {/* Collection point heading */}
            <div className="flex items-center justify-between">
                <Typography
                    variant="meta"
                    className="
                        tracking-[0.66px]
                        !text-[var(--color-text-muted)]
                    "
                >
                    COLLECTION POINT
                </Typography>

                <Button
                    type="button"
                    onClick={onChange}
                    className="
                        !h-auto
                        !w-auto
                        !rounded-none
                        !bg-transparent
                        !p-0
                    "
                >
                    <Typography
                        variant="meta"
                        className="!text-[var(--color-brand-primary)]"
                    >
                        {pitStop
                            ? "CHANGE"
                            : "SELECT"}
                    </Typography>
                </Button>
            </div>

            {pitStop && (
                <PitStopInfo
                    stop={pitStop}
                    selected
                    showLocationIcon
                />
            )}

            {/* Covers direct Checkout navigation with no selected Pit Stop */}
            {!pitStop && (
                <Typography
                    variant="body"
                    className="
                        mt-[10px]
                        block
                        !text-[var(--color-text-muted)]
                    "
                >
                    No collection point selected.
                </Typography>
            )}
        </Card>
    );
}