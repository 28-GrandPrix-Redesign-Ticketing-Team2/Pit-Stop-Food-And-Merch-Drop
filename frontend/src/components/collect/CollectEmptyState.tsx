import { Icon } from "@iconify/react";

import Typography from "@/components/ui/Typography";

export default function CollectEmptyState() {
    return (
        <div className="flex flex-col items-center text-center">
            {/* Empty order icon */}
            <div
                className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[var(--color-border)]
                    bg-[var(--color-page-background)]
                "
            >
                <Icon
                    icon="ph:shopping-bag"
                    width="28"
                    height="28"
                    className="text-[var(--color-text-muted)]"
                />
            </div>

            {/* Heading */}
            <Typography
                variant="sectionHeader"
                className="
                    mt-[14px]
                    block
                    !text-[24px]
                    !leading-9
                "
            >
                NO ORDER TO COLLECT
            </Typography>

            {/* Description */}
            <Typography
                variant="body"
                className="
                    mt-[6px]
                    block
                    !text-[13px]
                    !leading-[19.5px]
                    !text-[var(--color-text-muted)]
                "
            >
                Head to the Order tab to add items to your cart first.
            </Typography>
        </div>
    );
}