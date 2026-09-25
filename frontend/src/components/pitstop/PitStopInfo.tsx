import { Icon } from "@iconify/react";

import StatusBadge from "@/components/ui/StatusBadge";
import Typography from "@/components/ui/Typography";
import type { PitStop } from "@/data/pitStopConstantData";

type PitStopInfoProps = {
    stop: PitStop;
    selected?: boolean;
    showLocationIcon?: boolean;
};

export default function PitStopInfo({
    stop,
    selected = false,
    showLocationIcon = false,
}: PitStopInfoProps) {
    return (
        <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-[10px]">

                <div
                    className={`
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        border

                        ${selected
                            ? `
                                border-[var(--color-brand-primary)]
                                bg-[var(--color-brand-primary)]
                                `
                            : `
                                border-[var(--color-border)]
                                bg-[var(--color-page-background)]
                                `
                        }
                    `}
                >
                    <Typography
                        variant="sectionHeader"
                        className={`
                            !text-[13px]
                            !leading-[19.5px]

                            ${selected
                                ? "!text-[var(--color-text-on-primary)]"
                                : ""
                            }
                        `}
                    >
                        {stop.id}
                    </Typography>
                </div>

                <div>
                    <Typography
                        variant="cardHeading"
                        className="block"
                    >
                        {stop.name}
                    </Typography>

                    <div className="flex items-center gap-1">
                        {showLocationIcon && (
                            <Icon
                                icon="ph:map-pin"
                                width="11"
                                height="11"
                                className="text-[var(--color-text-muted)]"
                            />
                        )}

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
            </div>

            <StatusBadge
                variant={stop.variant}
            >
                {stop.status}
            </StatusBadge>
        </div>
    );
}