"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import CartItemComponent from "./CartItem";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/lib/utils";

export default function Cart() {
  const {
    items,
    orderNumber,
    subtotal,
    taxAmount,
    totalAmount,
    itemCount,
    clearCart,
    openCheckout,
  } = useCart();

  const isEmpty = items.length === 0;

  return (
    <aside className="w-[380px] bg-white border-l border-border flex flex-col shrink-0">
      {/* Cart Header */}
      <div className="px-5 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-foreground">Current Order</h2>
          <p className="text-xs text-muted-foreground font-mono">
            {orderNumber}
          </p>
        </div>
        {!isEmpty && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileTap={{ scale: 0.9 }}
            onClick={clearCart}
            className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear
          </motion.button>
        )}
      </div>

      <Separator />

      {/* Cart Items */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-2">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <CartItemComponent key={item.productId} item={item} />
            ))}
          </AnimatePresence>

          {/* Empty state */}
          {isEmpty && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-16 text-muted-foreground"
            >
              <ShoppingCart className="w-16 h-16 mb-4 opacity-20" />
              <p className="text-sm font-medium">No items yet</p>
              <p className="text-xs mt-1">
                Tap a product to add it to the order
              </p>
            </motion.div>
          )}
        </div>
      </ScrollArea>

      {/* Cart Footer - Totals & Checkout */}
      <div className="border-t border-border p-5 space-y-3 bg-white">
        {/* Item count */}
        {!isEmpty && (
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              {itemCount} item{itemCount !== 1 ? "s" : ""} in order
            </span>
          </div>
        )}

        {/* Subtotal */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Subtotal</span>
          <motion.span
            key={subtotal}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className="text-sm font-medium text-foreground"
          >
            {formatCurrency(subtotal)}
          </motion.span>
        </div>

        {/* VAT */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">VAT (5%)</span>
          <motion.span
            key={taxAmount}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className="text-sm font-medium text-foreground"
          >
            {formatCurrency(taxAmount)}
          </motion.span>
        </div>

        <Separator />

        {/* Total */}
        <div className="flex items-center justify-between">
          <span className="text-base font-bold text-foreground">Total</span>
          <motion.span
            key={totalAmount}
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 20 }}
            className="text-xl font-bold text-primary"
          >
            {formatCurrency(totalAmount)}
          </motion.span>
        </div>

        {/* Checkout Button */}
        <Button
          onClick={openCheckout}
          disabled={isEmpty}
          size="lg"
          className="w-full h-14 text-base font-bold rounded-xl mt-2 transition-all duration-200 disabled:opacity-40"
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Complete Sale
        </Button>
      </div>
    </aside>
  );
}
