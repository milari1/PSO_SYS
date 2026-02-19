import { NextResponse } from "next/server";
import { Sale } from "@/types";

/**
 * In-memory store for sales (until Neon DB is connected).
 * In production, this will be replaced with actual DB queries.
 */
const salesStore: Sale[] = [];

/**
 * POST /api/sales
 * Creates a new sale record.
 *
 * Body: Sale object with items, payment method, totals
 *
 * Currently stores in memory. When the Neon DB is connected,
 * this will insert into the sales and sale_items tables.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const sale: Sale = {
      id: salesStore.length + 1,
      saleNumber: body.saleNumber,
      subtotal: body.subtotal,
      taxAmount: body.taxAmount,
      totalAmount: body.totalAmount,
      paymentMethod: body.paymentMethod,
      status: "completed",
      items: body.items,
      createdAt: new Date().toISOString(),
    };

    salesStore.push(sale);

    return NextResponse.json({ sale }, { status: 201 });
  } catch (error) {
    console.error("Error creating sale:", error);
    return NextResponse.json(
      { error: "Failed to create sale" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/sales
 * Returns recent sales.
 *
 * Query params:
 * - limit: number (optional, default 20)
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "20");

    const recentSales = salesStore.slice(-limit).reverse();

    return NextResponse.json({ sales: recentSales });
  } catch (error) {
    console.error("Error fetching sales:", error);
    return NextResponse.json(
      { error: "Failed to fetch sales" },
      { status: 500 }
    );
  }
}
