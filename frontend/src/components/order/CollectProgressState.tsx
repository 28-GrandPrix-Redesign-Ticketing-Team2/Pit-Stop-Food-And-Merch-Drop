import { Icon } from "@iconify/react";

import Card from "@/components/ui/Card";
import Typography from "@/components/ui/Typography";

import { COLLECT_STATUS } from "@/data/collectConstantData";
import type { ActiveOrder } from "@/components/order/OrderProvider";
import type { PitStop } from "@/data/pitStopConstantData";
import CollectPageHeader from "@/components/collect/CollectPageHeader";
import CollectItemsCard from "@/components/collect/CollectItemsCard";

type CollectProgressStateProps = {
    order: ActiveOrder;
    pitStop: PitStop;
};

export default function CollectProgressState({
    order,
    pitStop,
}: CollectProgressStateProps) {
    const isPreparing =
        order.status ===
        COLLECT_STATUS.PREPARING;

    // Received = first step complete
    // Preparing = first two steps complete
    const completedStepCount =
        isPreparing ? 2 : 1;

    return (
        <div
            className="
                min-h-[calc(100dvh-var(--app-header-height))]
                bg-[var(--color-page-background)]
                pb-[calc(var(--bottom-nav-height)+24px)]
            "
        >
            <CollectPageHeader
                description={`Your order is being prepared at ${pitStop.name}.`}
            />

            <div
                className="
                    flex
                    flex-col
                    gap-[14px]
                    px-4
                    py-[14px]
                "
            >
                {/* Current status banner */}
                <Card
                    className="
                        !rounded-[12px]
                        !border-2
                        !border-[var(--color-status-warning)]
                        !bg-[var(--color-status-warning-surface)]
                        !px-4
                        !py-[14px]
                    "
                >
                    <div
                        className="
                            flex
                            items-center
                            gap-3
                        "
                    >
                        <Icon
                            icon="ph:timer-fill"
                            width="24"
                            height="24"
                            className="text-[var(--color-status-warning)]"
                        />

                        <div>
                            <Typography
                                variant="sectionHeader"
                                className="
                                    block
                                    !text-[16px]
                                    !leading-6
                                    !text-[var(--color-status-warning-text)]
                                "
                            >
                                {isPreparing
                                    ? "ORDER BEING PREPARED"
                                    : "ORDER RECEIVED"}
                            </Typography>

                            <Typography
                                variant="body"
                                className="
                                    mt-[2px]
                                    block
                                    !text-[12px]
                                    !leading-[18px]
                                    !text-[var(--color-status-warning-muted)]
                                "
                            >
                                {isPreparing
                                    ? `Ready in approximately ${order.estimatedMinutes ?? 4} mins`
                                    : "Confirmed! Kitchen is picking up your order."}
                            </Typography>
                        </div>
                    </div>
                </Card>

                {/* Order lifecycle */}
                <Card
                    className="
                        !rounded-[12px]
                        !px-4
                        !py-[14px]
                    "
                >
                    <Typography
                        variant="meta"
                        className="
                            tracking-[0.66px]
                            !text-[var(--color-text-muted)]
                        "
                    >
                        ORDER STATUS
                    </Typography>

                    <div
                        className="
                            mt-[14px]
                            flex
                            flex-col
                            gap-3
                        "
                    >
                        {[
                            "Order received",
                            "Being prepared",
                            "Ready to collect",
                        ].map(
                            (label, index) => {
                                const complete =
                                    index <
                                    completedStepCount;

                                return (
                                    <div
                                        key={label}
                                        className="
                                            flex
                                            items-center
                                            gap-3
                                        "
                                    >
                                        <Icon
                                            icon={
                                                complete
                                                    ? "ph:check-circle-fill"
                                                    : "ph:circle-dashed"
                                            }
                                            width="20"
                                            height="20"
                                            className={
                                                complete
                                                    ? "text-[var(--color-status-success)]"
                                                    : "text-[var(--color-text-muted)]"
                                            }
                                        />

                                        <Typography
                                            variant="body"
                                            className={`
                                                !text-[14px]
                                                !leading-[21px]

                                                ${complete
                                                    ? "!font-semibold"
                                                    : "!text-[var(--color-text-muted)]"
                                                }
                                            `}
                                        >
                                            {label}
                                        </Typography>
                                    </div>
                                );
                            }
                        )}
                    </div>
                </Card>

                {/* Ordered items */}
                <CollectItemsCard
                    order={order}
                />
            </div>
        </div>
    );
}