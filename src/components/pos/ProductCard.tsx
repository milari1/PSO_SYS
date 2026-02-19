"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Plus } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { Product } from "@/types";

// Category color dots for visual identification
const categoryDotColors: Record<string, string> = {
  "Hot Drinks": "bg-orange-400",
  "Cold Drinks": "bg-cyan-400",
  Appetizers: "bg-emerald-400",
  "Main Course": "bg-red-400",
  Desserts: "bg-pink-400",
  Sides: "bg-amber-400",
};

// Fallback gradient backgrounds per category
const categoryGradients: Record<string, string> = {
  "Hot Drinks": "from-orange-100 to-orange-50",
  "Cold Drinks": "from-cyan-100 to-cyan-50",
  Appetizers: "from-emerald-100 to-emerald-50",
  "Main Course": "from-red-100 to-red-50",
  Desserts: "from-pink-100 to-pink-50",
  Sides: "from-amber-100 to-amber-50",
};

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const dotColor = categoryDotColors[product.category] || "bg-gray-400";
  const gradient = categoryGradients[product.category] || "from-gray-100 to-gray-50";

  return (
    <motion.button
      onClick={() => onAddToCart(product)}
      whileHover={{ y: -3, boxShadow: "0 8px 25px rgba(0,0,0,0.1)" }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="bg-white rounded-xl border border-border overflow-hidden text-left flex flex-col group cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30"
    >
      {/* Image Section */}
      <div className={cn("relative w-full aspect-[4/3] overflow-hidden bg-gradient-to-br", gradient)}>
        {product.imageUrl && !imageError ? (
          <>
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className={cn(
                "object-cover transition-all duration-500 group-hover:scale-105",
                imageLoaded ? "opacity-100" : "opacity-0"
              )}
              sizes="(max-width: 768px) 50vw, 200px"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-muted-foreground/20 border-t-primary animate-spin" />
              </div>
            )}
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl opacity-60">
              {product.category === "Hot Drinks" && "☕"}
              {product.category === "Cold Drinks" && "🥤"}
              {product.category === "Appetizers" && "🥗"}
              {product.category === "Main Course" && "🍽️"}
              {product.category === "Desserts" && "🍰"}
              {product.category === "Sides" && "🍟"}
            </span>
          </div>
        )}

        {/* Add overlay on hover */}
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-200 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1, opacity: 1 }}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <Plus className="w-5 h-5 text-primary" />
          </motion.div>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-3 flex flex-col gap-1 flex-1">
        <div className="flex items-start gap-1.5">
          <div className={cn("w-1.5 h-1.5 rounded-full mt-1.5 shrink-0", dotColor)} />
          <span className="text-sm font-medium text-foreground leading-tight line-clamp-2">
            {product.name}
          </span>
        </div>
        <span className="text-sm font-bold text-primary pl-3">
          {formatCurrency(product.price)}
        </span>
      </div>
    </motion.button>
  );
}
