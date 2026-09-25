
export const CATEGORIES = [
    {
        id: "all",
        label: "ALL ITEMS",
    },
    {
        id: "food",
        label: "FOOD & DRINK",
    },
    {
        id: "merch",
        label: "TEAM MERCH",
    },
] as const;

export const ORDER_ITEMS = [
    {
        id: "burger",
        name: "APEX TRACKSIDE BURGER",
        description:
            "Double Angus beef, smoked cheese, special race sauce, brioche bun.",
        price: 16.5,
        category: "food",
        icon: "noto:hamburger",
        imageBackground: "#fff3e0",
    },
    {
        id: "fries",
        name: "HIGH-DOWNFORCE FRIES",
        description:
            "Crispy seasoned fries with loaded cheese pull and jalapeños.",
        price: 8,
        category: "food",
        icon: "noto:french-fries",
        imageBackground: "#fff8e1",
    },
    {
        id: "cap",
        name: "REPLICA TEAM CAP 2026",
        description:
            "Premium quick-dry track fabric, embroidered logo patch.",
        price: 45,
        category: "merch",
        icon: "noto:billed-cap",
        imageBackground: "#e8f5e9",
    },
    {
        id: "tee",
        name: "RACE DAY TEE — BLACK",
        description:
            "Lightweight performance tee. Moisture-wicking. Unisex fit.",
        price: 38,
        category: "merch",
        icon: "noto:t-shirt",
        imageBackground: "#f3e5f5",
    },
    {
        id: "cold-brew",
        name: "PIT LANE COLD BREW",
        description: "Nitro cold brew coffee, race-day edition can.",
        price: 6.5,
        category: "food",
        icon: "noto:hot-beverage",
        imageBackground: "#fbe9e7",
    },
] as const;