import Button from "@/components/ui/Buttons";
import Typography from "@/components/ui/Typography";

import type {
    RewardsTab,
} from "./RewardsContent";

type RewardsTabsProps = {
    activeTab: RewardsTab;

    onTabChange: (
        tab: RewardsTab
    ) => void;
};

const tabs: {
    id: RewardsTab;
    label: string;
}[] = [
        {
            id: "badges",
            label: "🏅 BADGES",
        },
        {
            id: "redeem",
            label: "🎁 REDEEM",
        },
        {
            id: "history",
            label: "🧾 HISTORY",
        },
    ];

export default function RewardsTabs({
    activeTab,
    onTabChange,
}: RewardsTabsProps) {
    return (
        <div
            className="
                mt-[10px]
                flex
                gap-2
            "
        >
            {tabs.map((tab) => {
                const isActive =
                    activeTab === tab.id;

                return (
                    <Button
                        key={tab.id}
                        type="button"
                        onClick={() =>
                            onTabChange(
                                tab.id
                            )
                        }
                        aria-pressed={
                            isActive
                        }
                        className={`
                            !h-[36px]
                            flex-1
                            !rounded-[8px]
                            !px-2
                            !py-2

                            ${isActive
                                ? `
                                        !border
                                        !border-[var(--color-brand-primary)]
                                        !bg-[var(--color-brand-primary)]
                                    `
                                : `
                                        !border
                                        !border-[var(--color-border)]
                                        !bg-[var(--color-page-background)]
                                    `
                            }
                        `}
                    >
                        <Typography
                            variant="button"
                            className={`
                                !text-[12px]
                                !leading-[18px]
                                tracking-[0.36px]

                                ${isActive
                                    ? "!text-[var(--color-text-on-primary)]"
                                    : "!text-[var(--color-text-primary)]"
                                }
                            `}
                        >
                            {tab.label}
                        </Typography>
                    </Button>
                );
            })}
        </div>
    );
}