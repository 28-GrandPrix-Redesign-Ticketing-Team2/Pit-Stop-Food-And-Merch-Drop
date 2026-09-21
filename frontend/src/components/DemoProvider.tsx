"use client";

import {
    createContext,
    useContext,
    useState,
    ReactNode,
} from "react";

// Defines what data is stored inside DemoContext
type DemoContextType = {
    demoMode: boolean;
    setDemoMode: (value: boolean) => void;
};

// Shared Demo Mode context
const DemoContext = createContext<DemoContextType | undefined>(
    undefined
);

export function DemoProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [demoMode, setDemoMode] = useState(false);

    return (
        <DemoContext.Provider
            value={{
                demoMode,
                setDemoMode,
            }}
        >
            {children}
        </DemoContext.Provider>
    );
}

// Hook used by components to access Demo Mode
export function useDemoMode() {
    const context = useContext(DemoContext);

    if (!context) {
        throw new Error(
            "useDemoMode must be used inside DemoProvider"
        );
    }

    return context;
}