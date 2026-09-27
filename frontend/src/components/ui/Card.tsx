import { ReactNode, KeyboardEvent } from "react";

type CardProps = {
    children: ReactNode;
    selected?: boolean;
    className?: string;

    // Optional interaction for clickable cards
    onClick?: () => void;
    ariaLabel?: string;
};

export default function Card({
    children,
    selected = false,
    className = "",
    onClick,
    ariaLabel,
}: CardProps) {
    // Clickable cards
    const isInteractive =
        onClick !== undefined;

    function handleKeyDown(
        event: KeyboardEvent<HTMLDivElement>
    ) {
        if (!onClick) return;

        if (
            event.key === "Enter" ||
            event.key === " "
        ) {
            event.preventDefault();
            onClick();
        }
    }
    return (
        <div
            role={
                isInteractive
                    ? "button"
                    : undefined
            }
            tabIndex={
                isInteractive
                    ? 0
                    : undefined
            }
            aria-label={ariaLabel}
            onClick={onClick}
            onKeyDown={handleKeyDown}
            className={`
                rounded-[12px]
                p-4
                ${selected
                    ? "border-2 border-[var(--color-brand-primary)] bg-[var(--color-surface-selected)]"
                    : "border border-[var(--color-border)] bg-[var(--color-surface)]"
                }
                 ${isInteractive
                    ? "cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--color-brand-primary)]"
                    : ""
                }
                ${className}
            `}
        >
            {children}
        </div>
    );
}