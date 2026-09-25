import { Icon } from "@iconify/react";

import Typography from "@/components/ui/Typography";

type CheckoutRewardsProps = {
    points: number;
};

export default function CheckoutRewards({
    points,
}: CheckoutRewardsProps) {
    return (
        <div
            className="
                flex
                items-center
                gap-[10px]
                rounded-[12px]
                border
                border-[#f0d060]
                bg-[#fff9e6]
                px-4
                py-3
            "
        >
            <Icon
                icon="ph:star-fill"
                width="18"
                height="18"
                className="text-[#a07000]"
            />

            <div>
                <Typography
                    variant="body"
                    className="
                        block
                        !text-[13px]
                        !font-semibold
                        !leading-[19.5px]
                        !text-[#7a5800]
                    "
                >
                    You&apos;ll earn points on this order
                </Typography>

                <Typography
                    variant="body"
                    className="
                        block
                        !text-[12px]
                        !leading-[18px]
                        !text-[#a07000]
                    "
                >
                    +{points} PTS added to your rewards
                </Typography>
            </div>
        </div>
    );
}