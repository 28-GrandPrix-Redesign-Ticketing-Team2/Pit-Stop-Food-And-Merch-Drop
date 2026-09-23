"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import Typography from "@/components/ui/Typography";

const navItems = [
    {
        label: "Home",
        href: "/",
        icon: "ph:house",
        activeIcon: "ph:house-fill",
    },
    {
        label: "Order",
        href: "/order",
        icon: "ph:fork-knife",
        activeIcon: "ph:fork-knife-fill",
    },
    {
        label: "Checkout",
        href: "/checkout",
        icon: "ph:receipt",
        activeIcon: "ph:receipt-fill",
    },
    {
        label: "Collect",
        href: "/collect",
        icon: "ph:qr-code",
        activeIcon: "ph:qr-code-fill",
    },
    {
        label: "Rewards",
        href: "/rewards",
        icon: "ph:star",
        activeIcon: "ph:star-fill",
    },
];

export default function NavBar() {
    const pathname = usePathname();

    return (
        <nav
            className="
                fixed
                bottom-0
                left-1/2
                z-50
                flex
                h-[82px]
                w-full
                max-w-[430px]
                -translate-x-1/2
                items-start
                justify-around
                border-t
                border-[var(--color-border)]
                bg-[var(--color-surface)]
                px-1
                pb-6
                pt-2
            "
        >
            {navItems.map((item) => {
                const isActive =
                    item.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(item.href);

                return (
                    <Link
                        key={item.label}
                        href={item.href}
                        aria-current={isActive ? "page" : undefined}
                        className="
                            flex
                            min-w-[44px]
                            flex-col
                            items-center
                            gap-1
                            px-2
                            py-1
                            no-underline
                        "
                    >
                        <Icon
                            icon={isActive ? item.activeIcon : item.icon}
                            width="22"
                            height="22"
                            className={
                                isActive
                                    ? "!text-[var(--color-brand-primary)]"
                                    : "!text-[var(--color-text-muted)]"
                            }
                        />

                        <Typography
                            variant="nav"
                            className={
                                isActive
                                    ? "font-semibold !text-[var(--color-brand-primary)]"
                                    : "!text-[var(--color-text-muted)]"
                            }
                        >
                            {item.label}
                        </Typography>
                    </Link>
                );
            })}
        </nav>
    );
}