"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useMemo,
} from "react";
import { CartItem, Product, PaymentMethod, Sale, SaleItem } from "@/types";
import {
  calculateCartTotals,
  generateSaleNumber,
} from "@/lib/utils";

// ============================================================
// State & Action Types
// ============================================================

interface CartState {
  items: CartItem[];
  orderNumber: string;
  isCheckoutOpen: boolean;
  isReceiptOpen: boolean;
  lastCompletedSale: Sale | null;
}

type CartAction =
  | { type: "ADD_ITEM"; product: Product }
  | { type: "REMOVE_ITEM"; productId: number }
  | { type: "UPDATE_QUANTITY"; productId: number; quantity: number }
  | { type: "CLEAR_CART" }
  | { type: "OPEN_CHECKOUT" }
  | { type: "CLOSE_CHECKOUT" }
  | { type: "COMPLETE_SALE"; paymentMethod: PaymentMethod }
  | { type: "CLOSE_RECEIPT" }
  | { type: "NEW_ORDER" };

// ============================================================
// Reducer
// ============================================================

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(
        (item) => item.productId === action.product.id
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.productId === action.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        ...state,
        items: [
          ...state.items,
          {
            productId: action.product.id,
            name: action.product.name,
            price: action.product.price,
            quantity: 1,
            imageUrl: action.product.imageUrl,
          },
        ],
      };
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(
          (item) => item.productId !== action.productId
        ),
      };

    case "UPDATE_QUANTITY": {
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            (item) => item.productId !== action.productId
          ),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.productId === action.productId
            ? { ...item, quantity: action.quantity }
            : item
        ),
      };
    }

    case "CLEAR_CART":
      return {
        ...state,
        items: [],
      };

    case "OPEN_CHECKOUT":
      return {
        ...state,
        isCheckoutOpen: true,
      };

    case "CLOSE_CHECKOUT":
      return {
        ...state,
        isCheckoutOpen: false,
      };

    case "COMPLETE_SALE": {
      const { subtotal, taxAmount, totalAmount } = calculateCartTotals(
        state.items
      );

      const saleItems: SaleItem[] = state.items.map((item) => ({
        productId: item.productId,
        productName: item.name,
        quantity: item.quantity,
        unitPrice: item.price,
        subtotal: item.price * item.quantity,
      }));

      const sale: Sale = {
        saleNumber: state.orderNumber,
        subtotal,
        taxAmount,
        totalAmount,
        paymentMethod: action.paymentMethod,
        status: "completed",
        items: saleItems,
        createdAt: new Date().toISOString(),
      };

      return {
        ...state,
        isCheckoutOpen: false,
        isReceiptOpen: true,
        lastCompletedSale: sale,
      };
    }

    case "CLOSE_RECEIPT":
      return {
        ...state,
        isReceiptOpen: false,
      };

    case "NEW_ORDER":
      return {
        items: [],
        orderNumber: generateSaleNumber(),
        isCheckoutOpen: false,
        isReceiptOpen: false,
        lastCompletedSale: null,
      };

    default:
      return state;
  }
}

// ============================================================
// Context
// ============================================================

interface CartContextValue {
  items: CartItem[];
  orderNumber: string;
  isCheckoutOpen: boolean;
  isReceiptOpen: boolean;
  lastCompletedSale: Sale | null;
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  itemCount: number;
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  openCheckout: () => void;
  closeCheckout: () => void;
  completeSale: (paymentMethod: PaymentMethod) => void;
  closeReceipt: () => void;
  newOrder: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

// ============================================================
// Provider
// ============================================================

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    orderNumber: generateSaleNumber(),
    isCheckoutOpen: false,
    isReceiptOpen: false,
    lastCompletedSale: null,
  });

  const addItem = useCallback(
    (product: Product) => dispatch({ type: "ADD_ITEM", product }),
    []
  );

  const removeItem = useCallback(
    (productId: number) => dispatch({ type: "REMOVE_ITEM", productId }),
    []
  );

  const updateQuantity = useCallback(
    (productId: number, quantity: number) =>
      dispatch({ type: "UPDATE_QUANTITY", productId, quantity }),
    []
  );

  const clearCart = useCallback(() => dispatch({ type: "CLEAR_CART" }), []);
  const openCheckout = useCallback(
    () => dispatch({ type: "OPEN_CHECKOUT" }),
    []
  );
  const closeCheckout = useCallback(
    () => dispatch({ type: "CLOSE_CHECKOUT" }),
    []
  );
  const completeSale = useCallback(
    (paymentMethod: PaymentMethod) =>
      dispatch({ type: "COMPLETE_SALE", paymentMethod }),
    []
  );
  const closeReceipt = useCallback(
    () => dispatch({ type: "CLOSE_RECEIPT" }),
    []
  );
  const newOrder = useCallback(() => dispatch({ type: "NEW_ORDER" }), []);

  const { subtotal, taxAmount, totalAmount } = useMemo(
    () => calculateCartTotals(state.items),
    [state.items]
  );

  const itemCount = useMemo(
    () => state.items.reduce((sum, item) => sum + item.quantity, 0),
    [state.items]
  );

  const value: CartContextValue = useMemo(
    () => ({
      items: state.items,
      orderNumber: state.orderNumber,
      isCheckoutOpen: state.isCheckoutOpen,
      isReceiptOpen: state.isReceiptOpen,
      lastCompletedSale: state.lastCompletedSale,
      subtotal,
      taxAmount,
      totalAmount,
      itemCount,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      openCheckout,
      closeCheckout,
      completeSale,
      closeReceipt,
      newOrder,
    }),
    [
      state.items,
      state.orderNumber,
      state.isCheckoutOpen,
      state.isReceiptOpen,
      state.lastCompletedSale,
      subtotal,
      taxAmount,
      totalAmount,
      itemCount,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      openCheckout,
      closeCheckout,
      completeSale,
      closeReceipt,
      newOrder,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// ============================================================
// Hook
// ============================================================

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
