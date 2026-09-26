import Image from "next/image";
import { Icon } from "@iconify/react";

import Button from "@/components/ui/Buttons";
import Card from "@/components/ui/Card";
import Typography from "@/components/ui/Typography";

import CollectItemsCard from "./CollectItemsCard";
import CollectPageHeader from "./CollectPageHeader";

import type {
    ActiveOrder,
} from "@/components/order/OrderProvider";

import type {
    PitStop,
} from "@/data/pitStopConstantData";

type CollectReadyStateProps = {
    order: ActiveOrder;
    pitStop: PitStop;
    onCollected: () => void;
};

export default function CollectReadyState({
    order,
    pitStop,
    onCollected,
}: CollectReadyStateProps) {
    return (
        <div
            className="
                min-h-[calc(100dvh-var(--app-header-height))]
                bg-[var(--color-page-background)]
                pb-[calc(var(--bottom-nav-height)+24px)]
            "
        >
            <CollectPageHeader
                description={`Show this code at ${pitStop.name}. Take it and run back to the race!`}
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
                {/* Ready banner */}
                <Card
                    className="
                        !rounded-[12px]
                        !border-2
                        !border-[var(--color-status-success)]
                        !bg-[var(--color-status-success-surface)]
                        !px-4
                        !py-3
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
                            icon="ph:check-circle-fill"
                            width="24"
                            height="24"
                            className="text-[var(--color-status-success)]"
                        />

                        <div>
                            <Typography
                                variant="sectionHeader"
                                className="
                                    block
                                    !text-[16px]
                                    !leading-6
                                    !text-[var(--color-status-success-text)]
                                "
                            >
                                YOUR ORDER IS READY!
                            </Typography>

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-1
                                "
                            >
                                <Icon
                                    icon="ph:map-pin"
                                    width="11"
                                    height="11"
                                    className="text-[var(--color-status-success-muted)]"
                                />

                                <Typography
                                    variant="body"
                                    className="
                                        !text-[12px]
                                        !leading-[18px]
                                        !text-[var(--color-status-success-muted)]
                                    "
                                >
                                    Collect at{" "}
                                    {pitStop.name}{" "}·{" "}
                                    {pitStop.distance}
                                </Typography>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* QR collection code */}
                <Card
                    className="
                        !rounded-[14px]
                        !px-5
                        !py-[18px]
                    "
                >
                    <Typography
                        variant="meta"
                        className="
                            block
                            text-center
                            tracking-[0.88px]
                            !text-[var(--color-text-muted)]
                        "
                    >
                        SCAN AT PIT STOP CARRIER
                    </Typography>

                    {order.qrCodeSrc && (
                        <div
                            className="
                                mt-[14px]
                                flex
                                items-center
                                justify-center
                                rounded-[10px]
                                border
                                border-[var(--color-border)]
                                bg-[var(--color-surface)]
                                p-4
                            "
                        >
                            <Image
                                src={
                                    order.qrCodeSrc
                                }
                                alt="Order collection QR code"
                                width={180}
                                height={180}
                            />
                        </div>
                    )}

                    <Typography
                        variant="qrNumber"
                        className="
                            mt-[14px]
                            block
                            text-center
                            !leading-[45px]
                            tracking-[3.6px]
                        "
                    >
                        {order.collectionCode}
                    </Typography>

                    <Typography
                        variant="body"
                        className="
                            block
                            text-center
                            !text-[12px]
                            !leading-[18px]
                            !text-[var(--color-text-muted)]
                        "
                    >
                        ORDER REF: #{order.reference}
                    </Typography>
                </Card>

                {/* Items to collect */}
                <CollectItemsCard
                    order={order}
                    title="ITEMS TO COLLECT"
                    showTotal
                />

                <Button
                    type="button"
                    onClick={
                        onCollected
                    }
                    className="
                        flex
                        !h-[56px]
                        items-center
                        justify-center
                        gap-2
                        !rounded-[12px]
                    "
                >
                    <Icon
                        icon="ph:check"
                        width="18"
                        height="18"
                    />

                    <Typography
                        variant="button"
                        className="
                            tracking-[0.64px]
                            !text-[var(--color-text-on-primary)]
                        "
                    >
                        I HAVE COLLECTED MY ORDER
                    </Typography>
                </Button>
            </div>
        </div>
    );
}