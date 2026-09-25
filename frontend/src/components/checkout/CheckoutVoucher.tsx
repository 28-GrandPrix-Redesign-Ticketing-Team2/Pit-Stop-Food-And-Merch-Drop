"use client";

import { Icon } from "@iconify/react";

import Button from "@/components/ui/Buttons";
import Card from "@/components/ui/Card";
import Typography from "@/components/ui/Typography";

import { INVALID_VOUCHER_MESSAGE, type CheckoutVoucherData } from "@/data/checkoutConstantData";

type CheckoutVoucherProps = {
    voucherCode: string;
    appliedVoucher:
    | CheckoutVoucherData
    | null;
    invalid: boolean;

    onCodeChange: (
        value: string
    ) => void;

    onApply: () => void;
    onRemove: () => void;
};

export default function CheckoutVoucher({
    voucherCode,
    appliedVoucher,
    invalid,
    onCodeChange,
    onApply,
    onRemove,
}: CheckoutVoucherProps) {
    return (
        <Card
            className={`
            !rounded-[12px]
            !px-[14px]
            !py-3

            ${appliedVoucher
                    ? "!border-[var(--color-status-success)]"
                    : ""
                }
        `}
        >
            <Typography
                variant="meta"
                className="
                tracking-[0.66px]
                !text-[var(--color-text-muted)]
            "
            >
                VOUCHER CODE
            </Typography>

            {appliedVoucher ? (
                <div
                    className="
                    mt-[10px]
                    flex
                    min-h-[38px]
                    items-center
                    justify-between
                "
                >
                    <div className="flex items-center gap-2">
                        <Icon
                            icon="ph:check-circle-fill"
                            width="20"
                            height="20"
                            className="text-[var(--color-status-success)]"
                        />

                        <div>
                            <Typography
                                variant="body"
                                className="
                                block
                                !text-[13px]
                                !font-semibold
                                !leading-[19.5px]
                                !text-[var(--color-voucher-applied-text)]
                            "
                            >
                                {appliedVoucher.title}
                            </Typography>

                            <Typography
                                variant="body"
                                className="
                                block
                                !text-[12px]
                                !leading-[18px]
                                !text-[var(--color-text-muted)]
                            "
                            >
                                {appliedVoucher.description}
                            </Typography>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onRemove}
                    >
                        <Typography
                            variant="body"
                            className="
                            !text-[12px]
                            !font-semibold
                            !leading-[18px]
                            !text-[var(--color-text-muted)]
                        "
                        >
                            Remove
                        </Typography>
                    </button>
                </div>
            ) : (
                <>
                    <div className="mt-[10px] flex h-11 gap-2">
                        <input
                            type="text"
                            value={voucherCode}
                            onChange={(event) =>
                                onCodeChange(
                                    event.target.value
                                )
                            }
                            placeholder="GP-XXXXXX"
                            className={`
                            min-w-0
                            flex-1
                            rounded-[10px]
                            border
                            bg-[var(--color-page-background)]
                            px-3
                            font-[family-name:var(--font-big-shoulders)]
                            text-[15px]
                            font-bold
                            uppercase
                            tracking-[1.2px]
                            text-[var(--color-text-primary)]
                            outline-none

                            ${invalid
                                    ? "border-[var(--color-status-danger)]"
                                    : "border-[var(--color-border)]"
                                }
                        `}
                        />

                        <Button
                            type="button"
                            onClick={onApply}
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

                    {invalid && (
                        <Typography
                            variant="body"
                            className="
                            mt-[6px]
                            block
                            !text-[12px]
                            !leading-[18px]
                            !text-[var(--color-status-danger)]
                        "
                        >
                            {INVALID_VOUCHER_MESSAGE}
                        </Typography>
                    )}
                </>
            )}
        </Card>
    );
}
