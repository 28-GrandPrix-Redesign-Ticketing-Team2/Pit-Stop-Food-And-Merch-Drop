import { ReactNode } from "react";

type BadgeVariant =
    | "fastest"
    | "lowQueue"
    | "heavyTraffic"
    | "earned"
    | "inProgress"
    | "locked"
    | "proTier"
    | "demo";

type StatusBadgeProps = {
    children: ReactNode;
    variant: BadgeVariant;
};

const variants: Record<BadgeVariant, string> = {
    fastest:
        "bg-[var(--color-status-success-bg)] text-[var(--color-status-success)]",
    lowQueue:
        "bg-[var(--color-status-success-bg)] text-[var(--color-status-success)]",
    heavyTraffic:
        "bg-[var(--color-status-danger-bg)] text-[var(--color-status-danger)]",
    earned:
        "bg-[var(--color-status-brand-bg)] text-[var(--color-brand-primary)]",
    inProgress:
        "bg-[var(--color-status-info-bg)] text-[var(--color-status-info)]",
    locked:
        "bg-[var(--color-status-neutral-bg)] text-[var(--color-status-neutral)]",
    proTier:
        "bg-[var(--color-status-warning-bg)] text-[var(--color-status-warning)]",
    demo:
        "bg-[var(--color-status-warning-bg)] text-[var(--color-status-warning)]",
};

export default function StatusBadge({
    children,
    variant,
}: StatusBadgeProps) {
    return (
        <span
            className={`
            inline-flex
            items-center
            rounded-[5px]
            px-2
            py-[3px]
            font-[var(--font-inter)]
            text-[11px]
            font-bold
            leading-[16.5px]
            ${variants[variant]}
        `}
        >
            {children}
        </span>
    );
}