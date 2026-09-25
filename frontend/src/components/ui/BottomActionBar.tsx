import { ReactNode } from "react";

type BottomActionBarProps = {
    children: ReactNode;
};

export default function BottomActionBar({
    children,
}: BottomActionBarProps) {
    return (
        <div
            className="
                fixed
                bottom-[82px]
                left-1/2
                z-40
                w-full
                max-w-[430px]
                -translate-x-1/2
                border-t
                border-[var(--color-border)]
                bg-[var(--color-surface)]
                px-4
                pb-1
                pt-3
            "
        >
            {children}
        </div>
    );
}