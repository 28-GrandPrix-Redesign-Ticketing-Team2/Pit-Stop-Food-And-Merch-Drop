"use client";

import {
    createContext,
    ReactNode,
    useContext,
    useMemo,
    useState,
} from "react";

import { ORDER_ITEMS } from "@/data/orderConstantData";
import { PIT_STOPS, PitStop, PitStopId } from "@/data/pitStopConstantData";

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
};

const OrderContext = createContext<OrderContextType | undefined>(
    undefined
);


type OrderProviderProps = {
    children: ReactNode;
};

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
    const [quantities, setQuantities] = useState<
        Record<string, number>
    >(
        Object.fromEntries(
            ORDER_ITEMS.map((item) => [
                item.id,
                0,
            ])
        )
    );

    // Add one item.
    function increaseQuantity(id: string) {
        setQuantities((current) => ({
            ...current,
            [id]: (current[id] ?? 0) + 1,
        }));
    }

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