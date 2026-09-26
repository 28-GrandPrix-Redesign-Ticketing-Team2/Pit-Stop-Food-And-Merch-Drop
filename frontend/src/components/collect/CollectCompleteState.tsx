import { Icon } from "@iconify/react";

import Typography from "@/components/ui/Typography";

import type {
    ActiveOrder,
} from "@/components/order/OrderProvider";

type CollectCompleteStateProps = {
    order: ActiveOrder;
};

export default function CollectCompleteState({
    order,
}: CollectCompleteStateProps) {
    return (
        <section
            className="
                flex
                h-[calc(100dvh-var(--app-header-height)-var(--bottom-nav-height))]
                items-center
                justify-center
                bg-[var(--color-page-background)]
                px-6
            "
        >
            <div
                className="
                    flex
                    flex-col
                    items-center
                    text-center
                "
            >
                {/* Completed icon */}
                <div
                    className="
                        flex
                        h-16
                        w-16
                        items-center
                        justify-center
                        rounded-full
                        border-2
                        border-[var(--color-status-success)]
                        bg-[var(--color-status-success-surface)]
                    "
                >
                    <Icon
                        icon="ph:check-circle-fill"
                        width="36"
                        height="36"
                        className="text-[var(--color-status-success)]"
                    />
                </div>

                <Typography
                    variant="sectionHeader"
                    className="
                        mt-4
                        block
                        !text-[28px]
                        !leading-[42px]
                    "
                >
                    ORDER COMPLETE!
                </Typography>

                <Typography
                    variant="body"
                    className="
                        mt-[6px]
                        block
                        !text-[14px]
                        !leading-[21px]
                        !text-[var(--color-text-muted)]
                    "
                >
                    Marked as collected.
                    Enjoy the race!
                </Typography>

                {/* Rewards earned */}
                <div
                    className="
                        mt-4
                        flex
                        items-center
                        gap-[6px]
                        rounded-[10px]
                        border
                        border-[var(--color-status-success-soft-border)]
                        bg-[var(--color-status-success-surface)]
                        px-5
                        py-[10px]
                    "
                >
                    <Icon
                        icon="ph:star-fill"
                        width="14"
                        height="14"
                        className="text-[var(--color-status-success-muted)]"
                    />

                    <Typography
                        variant="body"
                        className="
                            !text-[13px]
                            !font-semibold
                            !leading-[19.5px]
                            !text-[var(--color-status-success-text)]
                        "
                    >
                        +
                        {order.rewardPoints}{" "}
                        PTS earned on this order
                    </Typography>
                </div>
            </div>
        </section>
    );
}