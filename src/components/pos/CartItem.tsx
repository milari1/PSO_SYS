"use client";

import { motion } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem as CartItemType } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <motion.div
      layout
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -50, opacity: 0, height: 0, marginBottom: 0 }}
      transition={{ type: "spring", stiffness: 500, damping: 35 }}
      className="flex items-center gap-3 bg-muted/50 rounded-xl p-3"
    >
      {/* Product info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">
          {item.name}
        </p>
        <p className="text-xs text-muted-foreground">
          {formatCurrency(item.price)} each
        </p>
      </div>

      {/* Quantity controls */}
      <div className="flex items-center gap-1.5">
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
          className="w-8 h-8 rounded-lg bg-white border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
        >
          <Minus className="w-3.5 h-3.5" />
        </motion.button>

        <motion.span
          key={item.quantity}
          initial={{ scale: 1.3 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 20 }}
          className="w-8 text-center text-sm font-bold text-foreground"
        >
          {item.quantity}
        </motion.span>

        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
          className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
        </motion.button>
      </div>

      {/* Line total */}
      <div className="text-right min-w-[70px]">
        <p className="text-sm font-bold text-foreground">
          {formatCurrency(item.price * item.quantity)}
        </p>
      </div>

      {/* Remove */}
      <motion.button
        whileTap={{ scale: 0.85 }}
        onClick={() => removeItem(item.productId)}
        className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </motion.button>
    </motion.div>
  );
}
