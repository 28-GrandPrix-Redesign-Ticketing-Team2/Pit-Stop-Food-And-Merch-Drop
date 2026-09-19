'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem } from '../data/menu';
import { VIEWING_LOCATIONS, ViewingLocation, DropPoint } from '../data/dropPoints';

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

export interface ActiveOrder {
  orderId: string;
  pinCode: string;
  qrPayload: string;
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  total: number;
  pickupStation: DropPoint;
  viewingLocation: ViewingLocation;
  isGroupOrder: boolean;
  orderedAt: string;
  readyInMinutes: number;
  status: 'PREPARING' | 'READY_FOR_PICKUP' | 'COLLECTED';
}

interface CartContextType {
  selectedLocation: ViewingLocation;
  setSelectedLocation: (location: ViewingLocation) => void;
  selectedDropPoint: DropPoint;
  setSelectedDropPoint: (dropPoint: DropPoint) => void;
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  isGroupOrder: boolean;
  setIsGroupOrder: (value: boolean) => void;
  dynamicDiscountPct: number;
  isDiscountActive: boolean;
  cartCount: number;
  subtotal: number;
  discountAmount: number;
  total: number;
  activeOrder: ActiveOrder | null;
  createOrder: () => ActiveOrder;
  clearActiveOrder: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [selectedLocation, setSelectedLocation] = useState<ViewingLocation>(VIEWING_LOCATIONS[0]);
  const [selectedDropPoint, setSelectedDropPoint] = useState<DropPoint>(VIEWING_LOCATIONS[0].dropPoints[0]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isGroupOrder, setIsGroupOrder] = useState<boolean>(false);
  const [dynamicDiscountPct] = useState<number>(20);
  const [isDiscountActive] = useState<boolean>(true);
  const [activeOrder, setActiveOrder] = useState<ActiveOrder | null>(null);

  // Load persisted state from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('ausgp_pitstop_cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedOrder = localStorage.getItem('ausgp_pitstop_order');
      if (savedOrder) setActiveOrder(JSON.parse(savedOrder));

      const savedLocId = localStorage.getItem('ausgp_pitstop_loc');
      if (savedLocId) {
        const found = VIEWING_LOCATIONS.find((l) => l.id === savedLocId);
        if (found) {
          setSelectedLocation(found);
          const drop = found.dropPoints.find((d) => d.id === found.recommendedDropPointId) || found.dropPoints[0];
          setSelectedDropPoint(drop);
        }
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Persist cart changes
  useEffect(() => {
    try {
      localStorage.setItem('ausgp_pitstop_cart', JSON.stringify(cart));
    } catch {
      // Ignore
    }
  }, [cart]);

  // Persist active order changes
  useEffect(() => {
    try {
      if (activeOrder) {
        localStorage.setItem('ausgp_pitstop_order', JSON.stringify(activeOrder));
      } else {
        localStorage.removeItem('ausgp_pitstop_order');
      }
    } catch {
      // Ignore
    }
  }, [activeOrder]);

  const handleSetLocation = (location: ViewingLocation) => {
    setSelectedLocation(location);
    const drop = location.dropPoints.find((d) => d.id === location.recommendedDropPointId) || location.dropPoints[0];
    setSelectedDropPoint(drop);
    try {
      localStorage.setItem('ausgp_pitstop_loc', location.id);
    } catch {
      // Ignore
    }
  };

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((ci) => ci.item.id !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((ci) => {
          if (ci.item.id === itemId) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter((ci): ci is CartItem => ci !== null);
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, ci) => sum + ci.quantity, 0);
  const subtotal = cart.reduce((sum, ci) => sum + ci.item.price * ci.quantity, 0);
  const discountAmount = isDiscountActive ? (subtotal * dynamicDiscountPct) / 100 : 0;
  const total = Math.max(0, subtotal - discountAmount);

  const createOrder = (): ActiveOrder => {
    const randomCode = Math.floor(1000 + Math.random() * 9000).toString();
    const orderNum = `GP-${randomCode}`;
    const newOrder: ActiveOrder = {
      orderId: orderNum,
      pinCode: randomCode,
      qrPayload: `AUSGP-2026-PITSTOP-PASS-${orderNum}-${selectedDropPoint.id}-${selectedDropPoint.counterNumber}`,
      items: [...cart],
      subtotal,
      discountAmount,
      total,
      pickupStation: selectedDropPoint,
      viewingLocation: selectedLocation,
      isGroupOrder,
      orderedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      readyInMinutes: 4,
      status: 'READY_FOR_PICKUP',
    };
    setActiveOrder(newOrder);
    setCart([]);
    return newOrder;
  };

  const clearActiveOrder = () => {
    setActiveOrder(null);
  };

  return (
    <CartContext.Provider
      value={{
        selectedLocation,
        setSelectedLocation: handleSetLocation,
        selectedDropPoint,
        setSelectedDropPoint,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isGroupOrder,
        setIsGroupOrder,
        dynamicDiscountPct,
        isDiscountActive,
        cartCount,
        subtotal,
        discountAmount,
        total,
        activeOrder,
        createOrder,
        clearActiveOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
