"use client";

import { ReactNode } from "react";

type BottomPopUpProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    ariaLabel: string;
};

export default function BottomPopUp({
    isOpen,
    onClose,
    children,
    ariaLabel,
}: BottomPopUpProps) {
    if (!isOpen) return null;

    return (
        <div
            className="
                fixed
                inset-0
                z-[100]
                mx-auto
                w-full
                max-w-[430px]
            "
        >
            {/* overlay */}
            <button
                type="button"
                aria-label={ariaLabel}
                onClick={onClose}
                className="
                    absolute
                    inset-0
                    z-0
                    bg-black/40
                "
            />

            {/* Bottom PopUp */}
            <div
                className={`
                    absolute
                    bottom-0
                    z-10
                    max-h-[80dvh]
                    w-full
                    overflow-y-hidden
                    rounded-t-[20px]
                    bg-[var(--color-surface)]
                    px-5
                    pb-8
                    pt-5
                `}
            >
                {/* Drag handle */}
                <div className="flex justify-center">
                    <div
                        className="
                            h-1
                            w-9
                            rounded-full
                            bg-[var(--color-border)]
                        "
                    />
                </div>

                {children}
            </div>
        </div>
    );
}