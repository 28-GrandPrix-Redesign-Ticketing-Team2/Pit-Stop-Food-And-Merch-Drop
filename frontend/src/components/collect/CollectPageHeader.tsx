import Typography from "@/components/ui/Typography";

type CollectPageHeaderProps = {
    description: string;
};

export default function CollectPageHeader({
    description,
}: CollectPageHeaderProps) {
    return (
        <section
            className="
                border-b
                border-[var(--color-border)]
                bg-[var(--color-surface)]
                px-5
                pb-[14px]
                pt-3
            "
        >
            <Typography
                variant="screenTitle"
                className="
                    block
                    !text-[30px]
                    !leading-[36px]
                "
            >
                COLLECT YOUR FUEL
            </Typography>

            <Typography
                variant="body"
                className="
                    mt-[2px]
                    block
                    !text-[13px]
                    !leading-[19.5px]
                    !text-[var(--color-text-muted)]
                "
            >
                {description}
            </Typography>
        </section>
    );
}