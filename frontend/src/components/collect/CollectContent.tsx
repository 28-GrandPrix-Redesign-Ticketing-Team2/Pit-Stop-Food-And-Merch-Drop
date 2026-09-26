import CollectEmptyState from "./CollectEmptyState";

export default function CollectContent() {
    return (
        <section
            className="
                flex
                h-[calc(100dvh-var(--app-header-height)-var(--bottom-nav-height))]
                w-full
                items-center
                justify-center
                bg-[var(--color-page-background)]
                px-8
            "
        >
            <CollectEmptyState />
        </section>
    );
}