"use client";

import Card from "@/components/ui/Card";
import Typography from "@/components/ui/Typography";

import { PIT_STOPS } from "@/data/pitStopConstantData";
import BottomPopUp from "@/components/popUp/BottomPopUp";
import PitStopInfo from "../pitstop/PitStopInfo";

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
                                <PitStopInfo
                                    stop={stop}
                                    selected
                                />
                            </Card>
                        </button>
                    );
                })}
            </div>
        </BottomPopUp>
    );
}