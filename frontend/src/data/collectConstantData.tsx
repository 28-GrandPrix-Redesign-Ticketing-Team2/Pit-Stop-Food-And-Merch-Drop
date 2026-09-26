export const COLLECT_STATUS = {
    RECEIVED: "received",
    PREPARING: "preparing",
    READY: "ready",
    COMPLETED: "completed",
} as const;

export type CollectStatus =
    (typeof COLLECT_STATUS)[keyof typeof COLLECT_STATUS];