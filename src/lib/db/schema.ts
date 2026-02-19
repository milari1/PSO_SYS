import {
  pgTable,
  serial,
  varchar,
  decimal,
  integer,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

// ============================================================
// Categories Table
// ============================================================
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).unique().notNull(),
  description: varchar("description", { length: 500 }),
  imageUrl: varchar("image_url", { length: 500 }),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// ============================================================
// Products Table
// ============================================================
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  sku: varchar("sku", { length: 50 }).unique(),
  category: varchar("category", { length: 100 }).notNull(),
  stockQuantity: integer("stock_quantity").default(0),
  imageUrl: varchar("image_url", { length: 500 }),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ============================================================
// Sales Table
// ============================================================
export const sales = pgTable("sales", {
  id: serial("id").primaryKey(),
  saleNumber: varchar("sale_number", { length: 20 }).unique().notNull(),
  subtotal: decimal("subtotal", { precision: 10, scale: 2 }).notNull(),
  taxAmount: decimal("tax_amount", { precision: 10, scale: 2 }).default("0"),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  paymentMethod: varchar("payment_method", { length: 50 }).default("cash"),
  status: varchar("status", { length: 20 }).default("completed"),
  createdAt: timestamp("created_at").defaultNow(),
});

// ============================================================
// Sale Items Table
// ============================================================
export const saleItems = pgTable("sale_items", {
  id: serial("id").primaryKey(),
  saleId: integer("sale_id").references(() => sales.id, {
    onDelete: "cascade",
  }),
  productId: integer("product_id").references(() => products.id),
  productName: varchar("product_name", { length: 255 }).notNull(),
  quantity: integer("quantity").notNull(),
  unitPrice: decimal("unit_price", { precision: 10, scale: 2 }).notNull(),
  subtotal: decimal("subtotal", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
