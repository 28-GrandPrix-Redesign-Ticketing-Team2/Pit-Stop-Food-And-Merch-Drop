"use client";

import Card from "@/components/ui/Card";
import StatusBadge from "@/components/ui/StatusBadge";
import Typography from "@/components/ui/Typography";

import { PIT_STOPS } from "@/data/pitStopConstantData";
import BottomPopUp from "@/components/popUp/BottomPopUp";

type ChangePitStopPopupProps = {
    isOpen: boolean;
    selectedPitStopId: string | null;
    onSelect: (id: string) => void;
    onClose: () => void;
};

export default function ChangePitStopPopup({
    isOpen,
    selectedPitStopId,
    onSelect,
    onClose,
}: ChangePitStopPopupProps) {
    // Render only id change clicked
    if (!isOpen) return null;

    return (
        <BottomPopUp
            isOpen={isOpen}
            onClose={onClose}
            ariaLabel="Close Pit Stop selection"
        >
            <Typography
                variant="sectionHeader"
                className="mt-4 block leading-[30px]"
            >
                SELECT PIT STOP
            </Typography>

            {/* Shows 3 Pit Stops, then scrolls for more */}
            <div
                className="
                mt-[14px]
                flex
                max-h-[234px]
                flex-col
                gap-2
                overflow-y-auto
                pr-1
            "
            >
                {PIT_STOPS.map((stop) => {
                    const isSelected =
                        selectedPitStopId === stop.id;

                    return (
                        <button
                            key={stop.id}
                            type="button"
                            aria-pressed={isSelected}
                            onClick={() => {
                                // Update shared selected Pit Stop.
                                onSelect(stop.id);
                            }}
                            className="w-full text-left"
                        >
                            <Card
                                selected={isSelected}
                                className="
                                        !rounded-[12px]
                                        !px-[14px]
                                        !py-3
                                    "
                            >
                                <div
                                    className="
                                            flex
                                            items-center
                                            justify-between
                                            gap-3
                                        "
                                >
                                    <div className="flex items-center gap-[10px]">

                                        {/* Pit Stop number */}
                                        <div
                                            className={`
                                                    flex
                                                    h-8
                                                    w-8
                                                    shrink-0
                                                    items-center
                                                    justify-center
                                                    rounded-full
                                                    border

                                                    ${isSelected
                                                    ? `
                                                                border-[var(--color-brand-primary)]
                                                                bg-[var(--color-brand-primary)]
                                                            `
                                                    : `
                                                                border-[var(--color-border)]
                                                                bg-[var(--color-surface)]
                                                            `
                                                }
                                                `}
                                        >
                                            <Typography
                                                variant="meta"
                                                className={
                                                    isSelected
                                                        ? "!text-[var(--color-text-on-primary)]"
                                                        : ""
                                                }
                                            >
                                                {stop.id}
                                            </Typography>
                                        </div>

                                        {/* Pit Stop details */}
                                        <div className="flex flex-col">
                                            <Typography
                                                variant="cardHeading"
                                                className="
                                                        !text-[15px]
                                                        !leading-[22.5px]
                                                    "
                                            >
                                                {stop.name}
                                            </Typography>

                                            <Typography
                                                variant="body"
                                                className="
                                                        !text-[12px]
                                                        !leading-[18px]
                                                        !text-[var(--color-text-muted)]
                                                    "
                                            >
                                                {stop.distance}
                                            </Typography>
                                        </div>
                                    </div>

                                    {/* Existing queue badge */}
                                    <StatusBadge
                                        variant={stop.variant}
                                    >
                                        {stop.status}
                                    </StatusBadge>
                                </div>
                            </Card>
                        </button>
                    );
                })}
            </div>
        </BottomPopUp>
    );
}