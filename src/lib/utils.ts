import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CartItem, VAT_RATE } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number as AED currency
 */
export function formatCurrency(amount: number): string {
  return `AED ${amount.toFixed(2)}`;
}

/**
 * Generate a sale number like SAL-00001
 */
export function generateSaleNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `SAL-${timestamp.slice(-4)}${random}`;
}

/**
 * Calculate cart totals
 */
export function calculateCartTotals(items: CartItem[]) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const taxAmount = subtotal * VAT_RATE;
  const totalAmount = subtotal + taxAmount;

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    taxAmount: Math.round(taxAmount * 100) / 100,
    totalAmount: Math.round(totalAmount * 100) / 100,
  };
}

/**
 * Format a date for display
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-AE", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Format a time for display
 */
export function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-AE", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}
