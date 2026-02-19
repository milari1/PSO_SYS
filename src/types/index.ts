// ============================================================
// POS System Types
// ============================================================

export interface Product {
  id: number;
  name: string;
  price: number; // AED
  sku: string;
  category: string;
  stockQuantity: number;
  imageUrl: string | null;
  isActive: boolean;
}

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string | null;
}

export interface Sale {
  id?: number;
  saleNumber: string;
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  status: SaleStatus;
  items: SaleItem[];
  createdAt?: string;
}

export interface SaleItem {
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export type PaymentMethod = "cash" | "card" | "credit";

export type SaleStatus = "completed" | "refunded" | "void";

export type ProductCategory =
  | "All"
  | "Hot Drinks"
  | "Cold Drinks"
  | "Appetizers"
  | "Main Course"
  | "Desserts"
  | "Sides";

export const CATEGORIES: ProductCategory[] = [
  "All",
  "Hot Drinks",
  "Cold Drinks",
  "Appetizers",
  "Main Course",
  "Desserts",
  "Sides",
];

export const VAT_RATE = 0.05; // 5% VAT
