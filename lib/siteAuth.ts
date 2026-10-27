
const COOKIE_LIFETIME = 60 * 60 * 24 * 30;

function toHex(bytes: ArrayBuffer): string {
  return Array.from(new Uint8Array(bytes))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function sign(value: string): Promise<string> {
  const secret = process.env.SITE_PASSWORD;

  if (!secret) {
    throw new Error("SITE_PASSWORD is not configured");
  }

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(value)
  );

  return toHex(signature);
}

export async function createAccessToken(): Promise<string> {
  const expires = Math.floor(Date.now() / 1000) + COOKIE_LIFETIME;
  const payload = String(expires);
  const signature = await sign(payload);

  return `${payload}.${signature}`;
}

export async function verifyAccessToken(
  token: string | undefined
): Promise<boolean> {
  if (!token) return false;

  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [payload, signature] = parts;
  const expires = Number(payload);

  if (
    !/^\d+$/.test(payload) ||
    !Number.isSafeInteger(expires) ||
    expires <= Math.floor(Date.now() / 1000)
  ) {
    return false;
  }

  const expected = await sign(payload);

  if (signature.length !== expected.length) return false;

  let difference = 0;

  for (let i = 0; i < expected.length; i++) {
    difference |= signature.charCodeAt(i) ^ expected.charCodeAt(i);
  }

  return difference === 0;
}
