/**
 * Database Seed Script
 *
 * Run this after pushing the schema to the Neon database.
 * Usage: npm run db:seed
 *
 * This will populate the categories table with 6 categories
 * and the products table with 36 mock F&B items.
 * Safe to run multiple times (uses onConflictDoNothing).
 */

import { readFileSync } from "fs";
import { resolve } from "path";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { products, categories } from "./schema";

// Load .env.local so the seed script can access DATABASE_URL
try {
  const envPath = resolve(process.cwd(), ".env.local");
  const envFile = readFileSync(envPath, "utf-8");
  for (const line of envFile.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIndex = trimmed.indexOf("=");
    if (eqIndex === -1) continue;
    const key = trimmed.slice(0, eqIndex).trim();
    const value = trimmed.slice(eqIndex + 1).trim();
    if (key && !process.env[key]) {
      process.env[key] = value;
    }
  }
} catch {
  // .env.local not found – DATABASE_URL must be set in the environment
}

// ============================================================
// Category Seed Data
// ============================================================
const mockCategoryData = [
  {
    name: "Hot Drinks",
    description: "Freshly brewed hot beverages including coffee and tea",
    imageUrl:
      "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    name: "Cold Drinks",
    description: "Refreshing cold beverages, juices, and smoothies",
    imageUrl:
      "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    name: "Appetizers",
    description: "Light starters and sharing plates",
    imageUrl:
      "https://images.unsplash.com/photo-1577805947697-89e18249d767?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    name: "Main Course",
    description: "Hearty main dishes and full meals",
    imageUrl:
      "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    name: "Desserts",
    description: "Sweet treats and desserts to finish your meal",
    imageUrl:
      "https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    name: "Sides",
    description: "Side dishes to complement your main course",
    imageUrl:
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
];

// ============================================================
// Product Seed Data
// ============================================================
const mockProductData = [
  // Hot Drinks
  {
    name: "Espresso",
    price: "12.00",
    sku: "HD-001",
    category: "Hot Drinks",
    stockQuantity: 100,
    imageUrl:
      "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    name: "Latte",
    price: "18.00",
    sku: "HD-002",
    category: "Hot Drinks",
    stockQuantity: 100,
    imageUrl:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    name: "Cappuccino",
    price: "18.00",
    sku: "HD-003",
    category: "Hot Drinks",
    stockQuantity: 100,
    imageUrl:
      "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    name: "Americano",
    price: "14.00",
    sku: "HD-004",
    category: "Hot Drinks",
    stockQuantity: 100,
    imageUrl:
      "https://images.unsplash.com/photo-1521302080334-4bebac2763a6?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    name: "Hot Chocolate",
    price: "16.00",
    sku: "HD-005",
    category: "Hot Drinks",
    stockQuantity: 100,
    imageUrl:
      "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    name: "Chai Tea",
    price: "14.00",
    sku: "HD-006",
    category: "Hot Drinks",
    stockQuantity: 100,
    imageUrl:
      "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  // Cold Drinks
  {
    name: "Iced Latte",
    price: "20.00",
    sku: "CD-001",
    category: "Cold Drinks",
    stockQuantity: 100,
    imageUrl:
      "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    name: "Fresh Orange Juice",
    price: "16.00",
    sku: "CD-002",
    category: "Cold Drinks",
    stockQuantity: 100,
    imageUrl:
      "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    name: "Mango Smoothie",
    price: "22.00",
    sku: "CD-003",
    category: "Cold Drinks",
    stockQuantity: 100,
    imageUrl:
      "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    name: "Sparkling Water",
    price: "8.00",
    sku: "CD-004",
    category: "Cold Drinks",
    stockQuantity: 100,
    imageUrl:
      "https://images.unsplash.com/photo-1559839914-17aae19cec71?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    name: "Iced Tea",
    price: "14.00",
    sku: "CD-005",
    category: "Cold Drinks",
    stockQuantity: 100,
    imageUrl:
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    name: "Milkshake",
    price: "20.00",
    sku: "CD-006",
    category: "Cold Drinks",
    stockQuantity: 100,
    imageUrl:
      "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  // Appetizers
  {
    name: "Hummus & Pita",
    price: "24.00",
    sku: "AP-001",
    category: "Appetizers",
    stockQuantity: 50,
    imageUrl:
      "https://images.unsplash.com/photo-1577805947697-89e18249d767?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    name: "Spring Rolls",
    price: "22.00",
    sku: "AP-002",
    category: "Appetizers",
    stockQuantity: 50,
    imageUrl:
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    name: "Bruschetta",
    price: "26.00",
    sku: "AP-003",
    category: "Appetizers",
    stockQuantity: 50,
    imageUrl:
      "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    name: "Soup of the Day",
    price: "20.00",
    sku: "AP-004",
    category: "Appetizers",
    stockQuantity: 50,
    imageUrl:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    name: "Caesar Salad",
    price: "28.00",
    sku: "AP-005",
    category: "Appetizers",
    stockQuantity: 50,
    imageUrl:
      "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    name: "Loaded Nachos",
    price: "30.00",
    sku: "AP-006",
    category: "Appetizers",
    stockQuantity: 50,
    imageUrl:
      "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  // Main Course
  {
    name: "Grilled Chicken",
    price: "48.00",
    sku: "MC-001",
    category: "Main Course",
    stockQuantity: 30,
    imageUrl:
      "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    name: "Beef Burger",
    price: "42.00",
    sku: "MC-002",
    category: "Main Course",
    stockQuantity: 30,
    imageUrl:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    name: "Penne Arrabiata",
    price: "38.00",
    sku: "MC-003",
    category: "Main Course",
    stockQuantity: 30,
    imageUrl:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    name: "Grilled Salmon",
    price: "58.00",
    sku: "MC-004",
    category: "Main Course",
    stockQuantity: 30,
    imageUrl:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    name: "Ribeye Steak",
    price: "75.00",
    sku: "MC-005",
    category: "Main Course",
    stockQuantity: 30,
    imageUrl:
      "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    name: "Margherita Pizza",
    price: "36.00",
    sku: "MC-006",
    category: "Main Course",
    stockQuantity: 30,
    imageUrl:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  // Desserts
  {
    name: "NY Cheesecake",
    price: "28.00",
    sku: "DS-001",
    category: "Desserts",
    stockQuantity: 20,
    imageUrl:
      "https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    name: "Tiramisu",
    price: "26.00",
    sku: "DS-002",
    category: "Desserts",
    stockQuantity: 20,
    imageUrl:
      "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    name: "Gelato",
    price: "18.00",
    sku: "DS-003",
    category: "Desserts",
    stockQuantity: 20,
    imageUrl:
      "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    name: "Chocolate Brownie",
    price: "22.00",
    sku: "DS-004",
    category: "Desserts",
    stockQuantity: 20,
    imageUrl:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    name: "Creme Brulee",
    price: "30.00",
    sku: "DS-005",
    category: "Desserts",
    stockQuantity: 20,
    imageUrl:
      "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    name: "Fruit Platter",
    price: "24.00",
    sku: "DS-006",
    category: "Desserts",
    stockQuantity: 20,
    imageUrl:
      "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  // Sides
  {
    name: "French Fries",
    price: "14.00",
    sku: "SD-001",
    category: "Sides",
    stockQuantity: 80,
    imageUrl:
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    name: "Garlic Bread",
    price: "12.00",
    sku: "SD-002",
    category: "Sides",
    stockQuantity: 80,
    imageUrl:
      "https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    name: "Onion Rings",
    price: "16.00",
    sku: "SD-003",
    category: "Sides",
    stockQuantity: 80,
    imageUrl:
      "https://images.unsplash.com/photo-1639024471283-03518883512d?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    name: "Coleslaw",
    price: "10.00",
    sku: "SD-004",
    category: "Sides",
    stockQuantity: 80,
    imageUrl:
      "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    name: "Steamed Rice",
    price: "10.00",
    sku: "SD-005",
    category: "Sides",
    stockQuantity: 80,
    imageUrl:
      "https://images.unsplash.com/photo-1536304929831-ee1ca9d44f36?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    name: "Mashed Potatoes",
    price: "14.00",
    sku: "SD-006",
    category: "Sides",
    stockQuantity: 80,
    imageUrl:
      "https://images.unsplash.com/photo-1600950207944-0d63e8edbc3f?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
];

async function seed() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error("❌ DATABASE_URL not set. Add it to .env.local");
    process.exit(1);
  }

  console.log("🌱 Seeding database...");

  const sql = neon(databaseUrl);
  const db = drizzle(sql);

  // Seed categories first
  console.log("📂 Seeding categories...");
  await db
    .insert(categories)
    .values(mockCategoryData)
    .onConflictDoNothing({ target: categories.name });
  console.log(`✅ Inserted ${mockCategoryData.length} categories`);

  // Seed products
  console.log("🍽️  Seeding products...");
  await db
    .insert(products)
    .values(mockProductData)
    .onConflictDoNothing({ target: products.sku });
  console.log(`✅ Inserted ${mockProductData.length} products`);

  console.log("🎉 Seeding complete!");
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
