import { eq } from "drizzle-orm";
import { db, schema } from "@/db/client";

export const dynamic = "force-dynamic";

export async function GET(_request, { params }) {
  const { reference } = await params;
  const [row] = await db.select({
    paymentStatus: schema.orders.paymentStatus,
    status: schema.orders.status,
  }).from(schema.orders).where(eq(schema.orders.reference, reference)).limit(1);
  if (!row) return Response.json({ error: "Not found." }, { status: 404 });
  return Response.json({ paymentStatus: row.paymentStatus, status: row.status });
}
