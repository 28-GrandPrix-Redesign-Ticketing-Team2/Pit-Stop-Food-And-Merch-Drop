export const PIT_STOPS = [
    {
        id: "M1",
        name: "PIT STOP M1",
        distance: "Grandstand A · 1 min walk",
        status: "LOW QUEUE",
        variant: "lowQueue" as const,
        latitude: -37.847,
        longitude: 144.969,
    },
    {
        id: "M2",
        name: "PIT STOP M2",
        distance: "Grandstand A · 2 min walk",
        status: "FASTEST",
        variant: "fastest" as const,
        latitude: -37.841,
        longitude: 144.966,
    },
    {
        id: "M3",
        name: "PIT STOP M3",
        distance: "Grandstand A · 5 min walk",
        status: "HEAVY TRAFFIC",
        variant: "heavyTraffic" as const,
        latitude: -37.847,
        longitude: 144.975,
    },
    {
        id: "M4",
        name: "PIT STOP M4",
        distance: "Grandstand A · 20 min walk",
        status: "HEAVY TRAFFIC",
        variant: "heavyTraffic" as const,
        latitude: -37.856,
        longitude: 144.979,
    },
] as const;

export type PitStop =
    (typeof PIT_STOPS)[number];

export type PitStopId =
    PitStop["id"];