import Typography from "@/components/ui/Typography";

export default function Checkout() {
    return (
        <main className="mx-auto min-h-screen w-full max-w-[430px] p-4">
            <Typography variant="screenTitle">
                CHECKOUT
            </Typography>

            <Typography
                variant="body"
                className="mt-2 block text-[var(--color-text-muted)]"
            >
                Checkout page coming soon.
            </Typography>
        </main>
    );
}