"use client";

import { motion } from "framer-motion";
import {
  LayoutGrid,
  Coffee,
  GlassWater,
  Salad,
  UtensilsCrossed,
  Cake,
  Bean,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ProductCategory, CATEGORIES } from "@/types";

// Map categories to their icons
const categoryIcons: Record<ProductCategory, React.ElementType> = {
  All: LayoutGrid,
  "Hot Drinks": Coffee,
  "Cold Drinks": GlassWater,
  Appetizers: Salad,
  "Main Course": UtensilsCrossed,
  Desserts: Cake,
  Sides: Bean,
};

interface CategorySidebarProps {
  activeCategory: ProductCategory;
  onCategoryChange: (category: ProductCategory) => void;
}

export default function CategorySidebar({
  activeCategory,
  onCategoryChange,
}: CategorySidebarProps) {
  return (
    <aside className="w-[100px] bg-white border-r border-border flex flex-col py-3 shrink-0">
      <div className="flex flex-col gap-1 px-2">
        {CATEGORIES.map((category) => {
          const Icon = categoryIcons[category];
          const isActive = activeCategory === category;

          return (
            <motion.button
              key={category}
              onClick={() => onCategoryChange(category)}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "relative flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl transition-colors duration-200",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-primary rounded-xl"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}
              <Icon
                className={cn("w-5 h-5 relative z-10", isActive && "text-white")}
              />
              <span
                className={cn(
                  "text-[10px] font-medium leading-tight text-center relative z-10",
                  isActive && "text-white"
                )}
              >
                {category}
              </span>
            </motion.button>
          );
        })}
      </div>
    </aside>
  );
}
