import { NextResponse } from "next/server";
import { mockProducts } from "@/data/products";

/**
 * GET /api/products
 * Returns all active products. Optionally filter by category.
 *
 * Query params:
 * - category: string (optional) — filter by category name
 *
 * Currently serves mock data. When the Neon DB is connected,
 * this will query the products table instead.
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    let products = mockProducts.filter((p) => p.isActive);

    if (category && category !== "All") {
      products = products.filter((p) => p.category === category);
    }

    return NextResponse.json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
