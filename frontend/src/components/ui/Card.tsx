import { ReactNode } from "react";

type CardProps = {
    children: ReactNode;
    selected?: boolean;
    className?: string;
};

export default function Card({
    children,
    selected = false,
    className = "",
}: CardProps) {
    return (
        <div
            className={`
                rounded-[12px]
                p-4
                ${selected
                    ? "border-2 border-[var(--color-brand-primary)] bg-[var(--color-surface-selected)]"
                    : "border border-[var(--color-border)] bg-[var(--color-surface)]"
                }
                ${className}
            `}
        >
            {children}
        </div>
    );
}