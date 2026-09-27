"use client";

import {
    createContext,
    ReactNode,
    useContext,
    useMemo,
    useState,
} from "react";

import { ORDER_ITEMS, OrderItem } from "@/data/orderConstantData";
import { PIT_STOPS, PitStop, PitStopId } from "@/data/pitStopConstantData";
import { COLLECT_STATUS, CollectStatus } from "@/data/collectConstantData";
import { DEMO_QR_CODE_SRC } from "@/data/demoConstantData";

// Stored unitPrice
export type ActiveOrderItem = {
    itemId: OrderItem["id"];
    quantity: number;
    unitPrice: number;
    isFree?: boolean;
};

export type ActiveOrder = {
    reference: string;
    collectionCode: string;
    pitStopId: PitStopId;
    items: ActiveOrderItem[];
    totalPaid: number;
    rewardPoints: number;
    status: CollectStatus;
    estimatedMinutes?: number;
    qrCodeSrc?: string;
};

// demo
type PlaceOrderInput = {
    totalPaid: number;
    rewardPoints: number;
    freeItemId?: OrderItem["id"] | null;
};

type OrderContextType = {
    // Selected Pit Stop used across Home, Order and Checkout.
    selectedPitStopId: PitStopId | null;
    selectedPitStop: PitStop | undefined;
    setSelectedPitStopId: (id: PitStopId) => void;

    // Cart quantities
    quantities: Record<string, number>;
    increaseQuantity: (id: string) => void;
    decreaseQuantity: (id: string) => void;

    // Computed cart info
    totalItems: number;
    totalPrice: number;

    // Placed order used by Collect.
    activeOrder: ActiveOrder | null;
    setActiveOrder: (order: ActiveOrder | null) => void;
    updateActiveOrderStatus: (status: CollectStatus) => void;

    // Creates an order from the current cart and Pit Stop
    placeOrder: (
        input: PlaceOrderInput
    ) => ActiveOrder | null;

    // Resets cart, Pit Stop and active order for a new Demo walkthrough
    resetOrderState: () => void;
};

const OrderContext = createContext<OrderContextType | undefined>(
    undefined
);

type OrderProviderProps = {
    children: ReactNode;
};

function createEmptyQuantities() {
    return Object.fromEntries(
        ORDER_ITEMS.map(
            (item) => [item.id, 0]
        )
    ) as Record<string, number>;
}

export default function OrderProvider({
    children,
}: OrderProviderProps) {
    // Store the selected Pit Stop globally.
    const [selectedPitStopId, setSelectedPitStopId] =
        useState<PitStopId | null>(null);

    // Full selected Pit Stop object used across Home, Order and Checkout.
    const selectedPitStop = useMemo(() => {
        return PIT_STOPS.find(
            (stop) =>
                stop.id === selectedPitStopId
        );
    }, [selectedPitStopId]);

    // Create quantity 0 for every order item.
    const [quantities, setQuantities] = useState<Record<string, number>>(
        createEmptyQuantities()
    );

    // Placed order shown on Collect
    // Null means there is currently no order to collect
    const [activeOrder, setActiveOrder] =
        useState<ActiveOrder | null>(null);

    // Restores the ordering flow to a clean state
    function resetOrderState() {
        setSelectedPitStopId(null);
        setQuantities(createEmptyQuantities());
        setActiveOrder(null);
    }

    // Add one item.
    function increaseQuantity(id: string) {
        setQuantities((current) => ({
            ...current,
            [id]: (current[id] ?? 0) + 1,
        }));
    }

    // TEMP CODE FOR TESTING

    // const [
    //     activeOrder,
    //     setActiveOrder,
    // ] =
    //     useState<ActiveOrder | null>({
    //         reference: "GP-77291",
    //         collectionCode: "77291",
    //         pitStopId: "M2",
    //         items: [
    //             {
    //                 itemId: "burger",
    //                 quantity: 1,
    //                 unitPrice: 16.5,
    //             },
    //             {
    //                 itemId: "cap",
    //                 quantity: 1,
    //                 unitPrice: 45,
    //             },
    //         ],
    //         totalPaid: 63,
    //         rewardPoints: 1260,
    //         status: "ready",
    //         estimatedMinutes: 4,
    //         qrCodeSrc:
    //             "",
    //     });

    // Remove one item but not <0
    function decreaseQuantity(id: string) {
        setQuantities((current) => ({
            ...current,
            [id]: Math.max(
                0,
                (current[id] ?? 0) - 1
            ),
        }));
    }

    // Counts the total number of individual items in the cart.
    const totalItems = useMemo(() => {
        return Object.values(quantities).reduce(
            (total, quantity) =>
                total + quantity,
            0
        );
    }, [quantities]);

    // Calculates the total cart price from item price × quantity.
    const totalPrice = useMemo(() => {
        return ORDER_ITEMS.reduce(
            (total, item) =>
                total +
                item.price *
                (quantities[item.id] ?? 0),
            0
        );
    }, [quantities]);

    // Creates a placed order from the current cart and selected Pit Stop.
    function placeOrder({
        totalPaid,
        rewardPoints,
        freeItemId,
    }: PlaceOrderInput):
        ActiveOrder | null {
        // Protect against invalid checkout
        if (
            !selectedPitStopId ||
            totalItems === 0
        ) { return null }

        // Snapshot only items currently selected in the cart
        const orderItems:
            ActiveOrderItem[] =
            ORDER_ITEMS
                .filter(
                    (item) =>
                        (
                            quantities[
                            item.id
                            ] ?? 0
                        ) > 0
                )
                .map(
                    (item) => ({
                        itemId:
                            item.id,

                        quantity:
                            quantities[
                            item.id
                            ],

                        unitPrice:
                            item.price,
                    })
                );

        // Add complimentary voucher item to the final placed order
        if (freeItemId) {
            orderItems.push({
                itemId: freeItemId,
                quantity: 1,
                unitPrice: 0,
                isFree: true,
            });
        }

        // Temporary demo generated order/collection number
        const orderNumber =
            Date.now()
                .toString()
                .slice(-5);

        const order:
            ActiveOrder = {
            reference:
                `GP-${orderNumber}`,

            collectionCode:
                orderNumber,

            pitStopId:
                selectedPitStopId,

            items:
                orderItems,

            totalPaid,

            rewardPoints,

            status:
                COLLECT_STATUS.RECEIVED,

            estimatedMinutes: 4,

            // Static QR used for Demo Mode collection.
            qrCodeSrc: DEMO_QR_CODE_SRC,
        };

        // Store placed order so Collect can display it
        setActiveOrder(order);

        // Cart is no longer needed after successful order placement
        setQuantities(createEmptyQuantities());

        return order;
    }

    // Updates the lifecycle state of the currently placed order.
    // Demo Mode can call this
    function updateActiveOrderStatus(
        status: CollectStatus) {
        setActiveOrder(
            (current) => {
                if (!current) { return null; }
                return { ...current, status, };
            }
        );
    }

    return (
        <OrderContext.Provider
            value={{
                selectedPitStop,
                selectedPitStopId,
                setSelectedPitStopId,
                quantities,
                increaseQuantity,
                decreaseQuantity,
                totalItems,
                totalPrice,

                // Collect order state
                activeOrder,
                setActiveOrder,
                updateActiveOrderStatus,

                // Demo order placement
                placeOrder,

                // Demo reset
                resetOrderState,
            }}
        >
            {children}
        </OrderContext.Provider>
    );
}

//  Hook makes order state easy to access from any page
export function useOrder() {
    const context = useContext(OrderContext);

    if (!context) {
        throw new Error(
            "useOrder must be used inside OrderProvider"
        );
    }

    return context;
}