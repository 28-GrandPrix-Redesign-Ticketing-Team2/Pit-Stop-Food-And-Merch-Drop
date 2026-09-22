import { ReactNode } from "react";

type TypographyVariant =
    | "screenTitle"
    | "sectionHeader"
    | "cardHeading"
    | "price"
    | "button"
    | "qrNumber"
    | "body"
    | "meta"
    | "nav"
    | "badge";

type TypographyProps = {
    children: ReactNode;
    variant: TypographyVariant;
    className?: string;
};

const variants: Record<TypographyVariant, string> = {
    screenTitle:
        "font-[var(--font-big-shoulders)] text-[32px] font-extrabold text-[var(--color-text-primary)]",
    sectionHeader:
        "font-[var(--font-big-shoulders)] text-[20px] font-extrabold text-[var(--color-text-primary)]",
    cardHeading:
        "font-[var(--font-big-shoulders)] text-[16px] font-bold leading-[24px] text-[var(--color-text-primary)]",
    price:
        "font-[var(--font-big-shoulders)] text-[16px] font-bold leading-[24px] text-[var(--color-text-primary)]",
    button:
        "font-[var(--font-big-shoulders)] text-[16px] font-bold leading-[24px]",
    qrNumber:
        "font-[var(--font-big-shoulders)] text-[30px] font-extrabold text-[var(--color-text-primary)]",
    body:
        "font-[var(--font-inter)] text-[13px] font-normal leading-[19.5px] text-[var(--color-text-primary)]",
    meta:
        "font-[var(--font-inter)] text-[11px] font-semibold leading-[16.5px] text-[var(--color-text-primary)]",
    nav:
        "font-[var(--font-inter)] text-[10px] font-normal text-[var(--color-text-primary)]",
    badge:
        "font-[var(--font-inter)] text-[11px] font-bold leading-[16.5px]",
};

export default function Typography({
    children,
    variant,
    className = "",
}: TypographyProps) {
    return (
        <span className={`${variants[variant]} ${className}`}>
            {children}
        </span>
    );
}