import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
};

export default function Button({
    children,
    className = "",
    ...props
}: ButtonProps) {
    return (
        <button
            className={`
                h-[52px]
                w-full
                rounded-[12px]
                bg-[var(--color-brand-primary)]
                px-4
                font-[var(--font-big-shoulders)]
                text-[16px]
                font-bold
                leading-[24px]
                text-[var(--color-text-on-primary)]
                disabled:cursor-not-allowed
                disabled:opacity-50
                ${className}
            `}
            {...props}
        >
            {children}
        </button>
    );
}