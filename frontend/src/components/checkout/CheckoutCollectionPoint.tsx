"use client";

import { Icon } from "@iconify/react";

import Button from "@/components/ui/Buttons";
import Card from "@/components/ui/Card";
import StatusBadge from "@/components/ui/StatusBadge";
import Typography from "@/components/ui/Typography";

import { PIT_STOPS } from "@/data/pitStopConstantData";

type PitStop =
    (typeof PIT_STOPS)[number];

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
                <div
                    className="
                        mt-[10px]
                        flex
                        items-center
                        justify-between
                    "
                >
                    <div className="flex items-center gap-[10px]">

                        {/* Selected Pit Stop marker */}
                        <div
                            className="
                                flex
                                h-9
                                w-9
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                bg-[var(--color-brand-primary)]
                            "
                        >
                            <Typography
                                variant="sectionHeader"
                                className="
                                    !text-[13px]
                                    !leading-[19.5px]
                                    !text-[var(--color-text-on-primary)]
                                "
                            >
                                {pitStop.id}
                            </Typography>
                        </div>

                        {/* Pit Stop information */}
                        <div>
                            <Typography
                                variant="cardHeading"
                                className="
                                    block
                                    !text-[16px]
                                    !leading-6
                                "
                            >
                                {pitStop.name}
                            </Typography>

                            <div className="flex items-center gap-1">
                                <Icon
                                    icon="ph:map-pin-fill"
                                    width="11"
                                    height="11"
                                    className="text-[var(--color-text-muted)]"
                                />

                                <Typography
                                    variant="body"
                                    className="
                                        !text-[12px]
                                        !leading-[18px]
                                        !text-[var(--color-text-muted)]
                                    "
                                >
                                    {pitStop.distance}
                                </Typography>
                            </div>
                        </div>
                    </div>

                    <StatusBadge
                        variant={pitStop.variant}
                    >
                        {pitStop.status}
                    </StatusBadge>
                </div>
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