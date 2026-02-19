import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { sales, saleItems } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

/**
 * POST /api/sales
 * Creates a new sale record in Neon DB.
 *
 * Body: Sale object with items, payment method, totals
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const db = getDb();

    // Insert the sale header
    const [newSale] = await db
      .insert(sales)
      .values({
        saleNumber: body.saleNumber,
        subtotal: String(body.subtotal),
        taxAmount: String(body.taxAmount),
        totalAmount: String(body.totalAmount),
        paymentMethod: body.paymentMethod,
        status: "completed",
      })
      .returning();

    // Insert each sale item linked to the new sale
    if (body.items && body.items.length > 0) {
      await db.insert(saleItems).values(
        body.items.map((item: {
          productId: number;
          productName: string;
          quantity: number;
          unitPrice: number;
          subtotal: number;
        }) => ({
          saleId: newSale.id,
          productId: item.productId,
          productName: item.productName,
          quantity: item.quantity,
          unitPrice: String(item.unitPrice),
          subtotal: String(item.subtotal),
        }))
      );
    }

    return NextResponse.json({ sale: newSale }, { status: 201 });
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
 * Returns recent sales from Neon DB.
 *
 * Query params:
 * - limit: number (optional, default 20)
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "20");

    const db = getDb();

    const recentSales = await db
      .select()
      .from(sales)
      .orderBy(desc(sales.createdAt))
      .limit(limit);

    return NextResponse.json({ sales: recentSales });
  } catch (error) {
    console.error("Error fetching sales:", error);
    return NextResponse.json(
      { error: "Failed to fetch sales" },
      { status: 500 }
    );
  }
}
