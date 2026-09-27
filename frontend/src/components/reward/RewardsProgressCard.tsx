import Typography from "@/components/ui/Typography";

import type { RewardsProfile } from "@/data/rewardsConstantData";

type RewardsProgressCardProps = {
    profile: RewardsProfile;
};

export default function RewardsProgressCard({
    profile,
}: RewardsProgressCardProps) {
    const progressPercent = Math.min(
        100,
        (
            profile.points /
            profile.tier.nextTierPoints
        ) * 100
    );

    return (
        <div
            className="
                mt-3
                rounded-[8px]
                border
                border-[var(--color-border)]
                bg-[var(--color-page-background)]
                px-3
                py-2
            "
        >
            <div
                className="
                    flex
                    items-center
                    justify-between
                "
            >
                <Typography
                    variant="meta"
                    className="
                        !text-[10px]
                        !font-bold
                        !leading-[15px]
                        !text-[var(--color-rewards-progress)]
                    "
                >
                    🏁 {profile.tier.current}
                </Typography>

                <Typography
                    variant="body"
                    className="
                        !text-[10px]
                        !leading-[15px]
                        !text-[var(--color-text-muted)]
                    "
                >
                    {profile.points.toLocaleString()} /{" "}
                    {profile.tier.nextTierPoints.toLocaleString()}{" "}
                    PTS to {profile.tier.next}
                </Typography>
            </div>

            {/* Tier progress */}
            <div
                className="
                    mt-[5px]
                    h-[5px]
                    overflow-hidden
                    rounded-full
                    bg-[var(--color-border)]
                "
            >
                <div
                    className="
                        h-full
                        rounded-full
                        bg-[linear-gradient(90deg,var(--color-rewards-progress),var(--color-brand-primary))]
                        transition-[width]
                    "
                    style={{
                        width: `${progressPercent}%`,
                    }}
                />
            </div>
        </div>
    );
}