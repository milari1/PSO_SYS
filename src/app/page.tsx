"use client";

import { useState } from "react";
import { CartProvider } from "@/hooks/useCart";
import Header from "@/components/pos/Header";
import CategorySidebar from "@/components/pos/CategorySidebar";
import ProductGrid from "@/components/pos/ProductGrid";
import Cart from "@/components/pos/Cart";
import CheckoutDialog from "@/components/pos/CheckoutDialog";
import ReceiptDialog from "@/components/pos/ReceiptDialog";
import { mockProducts } from "@/data/products";
import { ProductCategory } from "@/types";

export default function POSPage() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("All");

  return (
    <CartProvider>
      <div className="h-screen flex flex-col overflow-hidden bg-background pos-no-select">
        {/* Top Header Bar */}
        <Header />

        {/* Main Content: Sidebar + Products + Cart */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left: Category Sidebar */}
          <CategorySidebar
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          {/* Center: Product Grid with Search */}
          <ProductGrid
            products={mockProducts}
            activeCategory={activeCategory}
          />

          {/* Right: Cart Panel */}
          <Cart />
        </div>

        {/* Modals */}
        <CheckoutDialog />
        <ReceiptDialog />
      </div>
    </CartProvider>
  );
}
