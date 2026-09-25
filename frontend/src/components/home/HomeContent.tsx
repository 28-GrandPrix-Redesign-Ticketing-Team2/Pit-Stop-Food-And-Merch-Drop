"use client";

import { Icon } from "@iconify/react";
import PitStopMap from "@/components/PitStopMap";
import Card from "@/components/ui/Card";
import Typography from "@/components/ui/Typography";
import { PIT_STOPS } from "@/data/pitStopConstantData";
import SelectedPitStopCard from "./SelectedPitStopCard";
import { useOrder } from "@/components/order/OrderProvider";
import PitStopInfo from "../pitstop/PitStopInfo";

export default function HomeContent() {
    // Shared selected pit stop
    const {
        selectedPitStop,
        selectedPitStopId,
        setSelectedPitStopId,
    } = useOrder();

    return (
        <div className="w-full">
            {/*  Heading */}
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
                    variant="meta"
                    className="
                        block
                        tracking-[0.88px]
                        !text-[var(--color-text-muted)]
                    "
                >
                    RACE DAY · GRANDSTAND A
                </Typography>

                <Typography
                    variant="screenTitle"
                    className="
                        mt-[2px]
                        block
                        text-[30px]
                        leading-[31.5px]
                    "
                >
                    TRACK MAP
                </Typography>

                <Typography
                    variant="body"
                    className="
                        mt-1
                        block
                        !text-[var(--color-text-muted)]
                    "
                >
                    Tap a pit stop to see wait times and order from that location.
                </Typography>
            </section>

            {/* Map */}
            <div
                id="pit-stop-map"
                className="px-4 pt-4"
            >
                <div className="overflow-hidden rounded-xl">
                    <PitStopMap
                        selectedPitStopId={selectedPitStopId}
                        onSelectPitStop={setSelectedPitStopId}
                    />
                </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-[14px] px-4 pt-[10px]">
                <LegendItem
                    color="bg-[var(--color-status-success)]"
                    label="Low queue"
                />

                <LegendItem
                    color="bg-[var(--color-status-danger)]"
                    label="Heavy traffic"
                />

                <LegendItem
                    color="bg-[var(--color-status-info)]"
                    label="Your location"
                />
            </div>

            {/* Pit Stop selection */}
            <div className="px-4 pt-[14px]">
                {selectedPitStop ? (
                    <SelectedPitStopCard
                        stop={selectedPitStop}
                        onViewMap={() => {
                            document
                                .getElementById("pit-stop-map")
                                ?.scrollIntoView({
                                    behavior: "smooth",
                                    block: "center",
                                });
                        }}
                    />
                ) : (
                    <Card className="!rounded-[14px] !px-4 !py-5">
                        <div className="flex flex-col items-center text-center">
                            <div
                                className="
                                        flex
                                        h-12
                                        w-12
                                        items-center
                                        justify-center
                                        rounded-full
                                        border
                                        border-[var(--color-border)]
                                        bg-[var(--color-page-background)]
                                    "
                            >
                                <Icon
                                    icon="bx:map-alt"
                                    width="24"
                                    height="24"
                                    className="text-[var(--color-text-muted)]"
                                />
                            </div>

                            <Typography
                                variant="cardHeading"
                                className="
                                        mt-[10px]
                                        block
                                        text-[17px]
                                        leading-[25.5px]
                                    "
                            >
                                SELECT A PIT STOP
                            </Typography>

                            <Typography
                                variant="body"
                                className="
                                        mt-1
                                        block
                                        text-center
                                        !text-[var(--color-text-muted)]
                                    "
                            >
                                Tap any marker on the map to see live queue
                                times and order options.
                            </Typography>
                        </div>
                    </Card>
                )}
            </div>

            {/* All pit stops */}
            <section className="px-4 pb-4 pt-[14px]">
                <Typography
                    variant="meta"
                    className="
                            block
                            tracking-[0.66px]
                            !text-[var(--color-text-muted)]
                        "
                >
                    ALL PIT STOPS
                </Typography>

                <div className="mt-2 flex flex-col gap-2">
                    {PIT_STOPS.map((stop) => (
                        <button
                            key={stop.id}
                            type="button"
                            onClick={() => setSelectedPitStopId(stop.id)}
                            aria-pressed={selectedPitStopId === stop.id}
                            className="w-full text-left"
                        >
                            <Card
                                selected={selectedPitStopId === stop.id}
                                className="
                                    !rounded-[10px]
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
                    ))}
                </div>
            </section>
        </div>
    );
}

type LegendItemProps = {
    color: string;
    label: string;
};

function LegendItem({
    color,
    label,
}: LegendItemProps) {
    return (
        <div className="flex items-center gap-1">
            <span
                className={`
                    h-2
                    w-2
                    rounded-[4px]
                    ${color}
                `}
            />

            <Typography
                variant="body"
                className="
                    text-[11px]
                    leading-[16.5px]
                    !text-[var(--color-text-muted)]
                "
            >
                {label}
            </Typography>
        </div>
    );
}
