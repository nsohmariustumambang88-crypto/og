import { createHash } from "node:crypto";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST() {
  const session = await getSession();
  if (!session) return Response.json({ error: "Not signed in." }, { status: 401 });

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) {
    return Response.json({ error: "Cloudinary is not configured." }, { status: 500 });
  }

  const folder = `${process.env.CLOUDINARY_FOLDER || "weedmaps"}/products`;
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = createHash("sha1")
    .update(`folder=${folder}&timestamp=${timestamp}${apiSecret}`)
    .digest("hex");

  return Response.json({ cloudName, apiKey, folder, timestamp, signature });
}
