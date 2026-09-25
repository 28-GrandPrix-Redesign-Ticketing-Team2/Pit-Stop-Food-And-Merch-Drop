"use client";

import { useState } from "react";

import Button from "@/components/ui/Buttons";
import Card from "@/components/ui/Card";
import Typography from "@/components/ui/Typography";

export default function CheckoutVoucher() {
    const [voucherCode, setVoucherCode] =
        useState("");

    return (
        <Card className="!rounded-[12px] !px-[14px] !py-3">

            <Typography
                variant="meta"
                className="
                    tracking-[0.66px]
                    !text-[var(--color-text-muted)]
                "
            >
                VOUCHER CODE
            </Typography>

            <div className="mt-[10px] flex h-11 gap-2">

                {/* Voucher input */}
                <input
                    type="text"
                    value={voucherCode}
                    onChange={(event) =>
                        setVoucherCode(
                            event.target.value
                        )
                    }
                    placeholder="GP-XXXXXX"
                    className="
                        min-w-0
                        flex-1
                        rounded-[10px]
                        border
                        border-[var(--color-border)]
                        bg-[var(--color-page-background)]
                        px-3
                        font-[family-name:var(--font-big-shoulders)]
                        text-[15px]
                        font-bold
                        tracking-[1.2px]
                        text-[var(--color-text-primary)]
                        outline-none
                    "
                />

                <Button
                    type="button"
                    className="
                        !h-11
                        !w-auto
                        !rounded-[10px]
                        !px-4
                    "
                >
                    <Typography
                        variant="button"
                        className="
                            !text-[14px]
                            !leading-[21px]
                            tracking-[0.56px]
                        "
                    >
                        APPLY
                    </Typography>
                </Button>
            </div>
        </Card>
    );
}