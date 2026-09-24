import { Icon } from "@iconify/react";

import Button from "@/components/ui/Buttons";
import Card from "@/components/ui/Card";
import StatusBadge from "@/components/ui/StatusBadge";
import Typography from "@/components/ui/Typography";
import { useRouter } from "next/navigation";

type SelectedPitStopCardProps = {
    stop: {
        id: string;
        name: string;
        distance: string;
        status: string;
        variant:
        | "fastest"
        | "lowQueue"
        | "heavyTraffic";
    };
    onViewMap: () => void;
};

export default function SelectedPitStopCard({
    stop,
    onViewMap,
}: SelectedPitStopCardProps) {
    const router = useRouter();

    return (
        <Card className="!rounded-[14px] !p-4">
            {/* Stop details */}
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-[10px]">
                    {/* Selected marker */}
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
                            {stop.id}
                        </Typography>
                    </div>

                    <div>
                        <Typography
                            variant="sectionHeader"
                            className="
                                block
                                text-[18px]
                                leading-[27px]
                            "
                        >
                            {stop.name}
                        </Typography>

                        <div className="flex items-center gap-1">
                            <Icon
                                icon="ph:map-pin-fill"
                                width="12"
                                height="12"
                                className="text-[var(--color-text-muted)]"
                            />

                            <Typography
                                variant="body"
                                className="
                                    text-[12px]
                                    leading-[18px]
                                    text-[var(--color-text-muted)]
                                "
                            >
                                {stop.distance}
                            </Typography>
                        </div>
                    </div>
                </div>

                <StatusBadge variant={stop.variant}>
                    {stop.status}
                </StatusBadge>
            </div>

            {/* Actions */}
            <div className="mt-[14px] grid grid-cols-2 gap-[10px]">
                {/* Primary button */}
                <Button
                    onClick={() => router.push("/order")}
                    className="
                        flex
                        !h-[46px]
                        items-center
                        justify-center
                        gap-[6px]
                        !rounded-[10px]
                    "
                >
                    <Icon
                        icon="ph:shopping-cart-simple-fill"
                        width="16"
                        height="16"
                    />

                    <Typography
                        variant="button"
                        className="
                            text-[15px]
                            tracking-[0.6px]
                        "
                    >
                        ORDER HERE
                    </Typography>
                </Button>

                {/* Secondary button */}
                <button
                    type="button"
                    onClick={onViewMap}
                    className="
                        flex
                        h-[46px]
                        items-center
                        justify-center
                        gap-[6px]
                        rounded-[10px]
                        border
                        border-[var(--color-border)]
                        bg-[var(--color-page-background)]
                    "
                >
                    <Icon
                        icon="ph:map-trifold"
                        width="16"
                        height="16"
                        className="text-[var(--color-text-primary)]"
                    />

                    <Typography
                        variant="button"
                        className="
                            text-[15px]
                            tracking-[0.6px]
                            text-[var(--color-text-primary)]
                        "
                    >
                        VIEW MAP
                    </Typography>
                </button>
            </div>
        </Card>
    );
}