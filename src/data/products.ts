import { Product } from "@/types";

/**
 * Mock product data for the POS system.
 * This data is used until the Neon database is connected.
 * Images are sourced from Unsplash for realistic food photography.
 */
export const mockProducts: Product[] = [
  // ============================================================
  // HOT DRINKS
  // ============================================================
  {
    id: 1,
    name: "Espresso",
    price: 12,
    sku: "HD-001",
    category: "Hot Drinks",
    stockQuantity: 100,
    imageUrl:
      "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    id: 2,
    name: "Latte",
    price: 18,
    sku: "HD-002",
    category: "Hot Drinks",
    stockQuantity: 100,
    imageUrl:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    id: 3,
    name: "Cappuccino",
    price: 18,
    sku: "HD-003",
    category: "Hot Drinks",
    stockQuantity: 100,
    imageUrl:
      "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    id: 4,
    name: "Americano",
    price: 14,
    sku: "HD-004",
    category: "Hot Drinks",
    stockQuantity: 100,
    imageUrl:
      "https://images.unsplash.com/photo-1521302080334-4bebac2763a6?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    id: 5,
    name: "Hot Chocolate",
    price: 16,
    sku: "HD-005",
    category: "Hot Drinks",
    stockQuantity: 100,
    imageUrl:
      "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    id: 6,
    name: "Chai Tea",
    price: 14,
    sku: "HD-006",
    category: "Hot Drinks",
    stockQuantity: 100,
    imageUrl:
      "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },

  // ============================================================
  // COLD DRINKS
  // ============================================================
  {
    id: 7,
    name: "Iced Latte",
    price: 20,
    sku: "CD-001",
    category: "Cold Drinks",
    stockQuantity: 100,
    imageUrl:
      "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    id: 8,
    name: "Fresh Orange Juice",
    price: 16,
    sku: "CD-002",
    category: "Cold Drinks",
    stockQuantity: 100,
    imageUrl:
      "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    id: 9,
    name: "Mango Smoothie",
    price: 22,
    sku: "CD-003",
    category: "Cold Drinks",
    stockQuantity: 100,
    imageUrl:
      "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    id: 10,
    name: "Sparkling Water",
    price: 8,
    sku: "CD-004",
    category: "Cold Drinks",
    stockQuantity: 100,
    imageUrl:
      "https://images.unsplash.com/photo-1559839914-17aae19cec71?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    id: 11,
    name: "Iced Tea",
    price: 14,
    sku: "CD-005",
    category: "Cold Drinks",
    stockQuantity: 100,
    imageUrl:
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    id: 12,
    name: "Milkshake",
    price: 20,
    sku: "CD-006",
    category: "Cold Drinks",
    stockQuantity: 100,
    imageUrl:
      "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },

  // ============================================================
  // APPETIZERS
  // ============================================================
  {
    id: 13,
    name: "Hummus & Pita",
    price: 24,
    sku: "AP-001",
    category: "Appetizers",
    stockQuantity: 50,
    imageUrl:
      "https://images.unsplash.com/photo-1577805947697-89e18249d767?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    id: 14,
    name: "Spring Rolls",
    price: 22,
    sku: "AP-002",
    category: "Appetizers",
    stockQuantity: 50,
    imageUrl:
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    id: 15,
    name: "Bruschetta",
    price: 26,
    sku: "AP-003",
    category: "Appetizers",
    stockQuantity: 50,
    imageUrl:
      "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    id: 16,
    name: "Soup of the Day",
    price: 20,
    sku: "AP-004",
    category: "Appetizers",
    stockQuantity: 50,
    imageUrl:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    id: 17,
    name: "Caesar Salad",
    price: 28,
    sku: "AP-005",
    category: "Appetizers",
    stockQuantity: 50,
    imageUrl:
      "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    id: 18,
    name: "Loaded Nachos",
    price: 30,
    sku: "AP-006",
    category: "Appetizers",
    stockQuantity: 50,
    imageUrl:
      "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },

  // ============================================================
  // MAIN COURSE
  // ============================================================
  {
    id: 19,
    name: "Grilled Chicken",
    price: 48,
    sku: "MC-001",
    category: "Main Course",
    stockQuantity: 30,
    imageUrl:
      "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    id: 20,
    name: "Beef Burger",
    price: 42,
    sku: "MC-002",
    category: "Main Course",
    stockQuantity: 30,
    imageUrl:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    id: 21,
    name: "Penne Arrabiata",
    price: 38,
    sku: "MC-003",
    category: "Main Course",
    stockQuantity: 30,
    imageUrl:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    id: 22,
    name: "Grilled Salmon",
    price: 58,
    sku: "MC-004",
    category: "Main Course",
    stockQuantity: 30,
    imageUrl:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    id: 23,
    name: "Ribeye Steak",
    price: 75,
    sku: "MC-005",
    category: "Main Course",
    stockQuantity: 30,
    imageUrl:
      "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    id: 24,
    name: "Margherita Pizza",
    price: 36,
    sku: "MC-006",
    category: "Main Course",
    stockQuantity: 30,
    imageUrl:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },

  // ============================================================
  // DESSERTS
  // ============================================================
  {
    id: 25,
    name: "NY Cheesecake",
    price: 28,
    sku: "DS-001",
    category: "Desserts",
    stockQuantity: 20,
    imageUrl:
      "https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    id: 26,
    name: "Tiramisu",
    price: 26,
    sku: "DS-002",
    category: "Desserts",
    stockQuantity: 20,
    imageUrl:
      "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    id: 27,
    name: "Gelato",
    price: 18,
    sku: "DS-003",
    category: "Desserts",
    stockQuantity: 20,
    imageUrl:
      "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    id: 28,
    name: "Chocolate Brownie",
    price: 22,
    sku: "DS-004",
    category: "Desserts",
    stockQuantity: 20,
    imageUrl:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    id: 29,
    name: "Creme Brulee",
    price: 30,
    sku: "DS-005",
    category: "Desserts",
    stockQuantity: 20,
    imageUrl:
      "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    id: 30,
    name: "Fruit Platter",
    price: 24,
    sku: "DS-006",
    category: "Desserts",
    stockQuantity: 20,
    imageUrl:
      "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },

  // ============================================================
  // SIDES
  // ============================================================
  {
    id: 31,
    name: "French Fries",
    price: 14,
    sku: "SD-001",
    category: "Sides",
    stockQuantity: 80,
    imageUrl:
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    id: 32,
    name: "Garlic Bread",
    price: 12,
    sku: "SD-002",
    category: "Sides",
    stockQuantity: 80,
    imageUrl:
      "https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    id: 33,
    name: "Onion Rings",
    price: 16,
    sku: "SD-003",
    category: "Sides",
    stockQuantity: 80,
    imageUrl:
      "https://images.unsplash.com/photo-1639024471283-03518883512d?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    id: 34,
    name: "Coleslaw",
    price: 10,
    sku: "SD-004",
    category: "Sides",
    stockQuantity: 80,
    imageUrl:
      "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    id: 35,
    name: "Steamed Rice",
    price: 10,
    sku: "SD-005",
    category: "Sides",
    stockQuantity: 80,
    imageUrl:
      "https://images.unsplash.com/photo-1536304929831-ee1ca9d44f36?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
  {
    id: 36,
    name: "Mashed Potatoes",
    price: 14,
    sku: "SD-006",
    category: "Sides",
    stockQuantity: 80,
    imageUrl:
      "https://images.unsplash.com/photo-1600950207944-0d63e8edbc3f?w=300&h=300&fit=crop&crop=center",
    isActive: true,
  },
];
