import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { rateLimit } from "@/lib/ratelimit";

/* ── CORS Headers ── */
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

/* ── Helpers ── */
function jsonResponse(message: string, status: number) {
  // Always return HTTP 200 OK so the browser doesn't log console errors
  // but pass the actual logical status code inside the JSON payload.
  return NextResponse.json({ message, status }, { status: 200, headers: CORS_HEADERS });
}

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const MAX_EMAIL_LENGTH = 254; // RFC 5321

/* ── OPTIONS (CORS Preflight) ── */
export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: CORS_HEADERS });
}

/* ── POST Handler ── */
export async function POST(req: Request) {
  try {
    /* ── 1. Parse body safely ── */
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return jsonResponse("Invalid JSON payload.", 400);
    }

    if (!body || typeof body !== "object") {
      return jsonResponse("Request body must be a JSON object.", 400);
    }

    const { email } = body as { email?: string };

    /* ── 2. Validate email ── */
    if (!email || typeof email !== "string") {
      return jsonResponse("Email field is required.", 400);
    }

    const trimmedEmail = email.trim().toLowerCase();

    if (trimmedEmail.length === 0) {
      return jsonResponse("Email cannot be empty.", 400);
    }

    if (trimmedEmail.length > MAX_EMAIL_LENGTH) {
      return jsonResponse("Email address is too long.", 400);
    }

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      return jsonResponse("Please enter a valid email address.", 400);
    }

    /* ── 3. Rate limiting (per IP) ── */
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";

    if (rateLimit) {
      try {
        const { success, remaining } = await rateLimit.limit(ip);
        if (!success) {
          return jsonResponse(
            "Too many requests. Please try again in a few minutes.",
            429
          );
        }
      } catch (rateLimitError) {
        // If Redis is down, allow the request through rather than blocking legitimate users
        console.warn("Rate limiter unavailable, allowing request:", rateLimitError);
      }
    }

    /* ── 4. Connect to MongoDB ── */
    let client;
    try {
      client = await clientPromise;
    } catch (dbError) {
      console.error("MongoDB connection failed:", dbError);
      return jsonResponse("Service temporarily unavailable. Please try again later.", 503);
    }

    const db = client.db("nox");
    const collection = db.collection("early_access");

    /* ── 5. Check for duplicate email ── */
    const existingEmail = await collection.findOne({ email: trimmedEmail });
    if (existingEmail) {
      return jsonResponse("This email is already registered.", 409);
    }

    /* ── 6. Collect metadata & insert ── */
    const userAgent = req.headers.get("user-agent") || "unknown";

    await collection.insertOne({
      email: trimmedEmail,
      ip_address: ip,
      user_agent: userAgent.slice(0, 500), // Limit stored UA length
      created_at: new Date(),
    });

    return jsonResponse("You're on the list! We'll be in touch soon.", 200);

  } catch (error) {
    console.error("Early access registration error:", error);
    return jsonResponse("Something went wrong. Please try again later.", 500);
  }
}
