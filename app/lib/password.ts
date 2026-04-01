import { createHash, randomBytes, timingSafeEqual } from "crypto";

// Using crypto for password hashing (bcrypt alternative that works in Edge runtime)
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const hash = createHash("sha256")
    .update(password + salt)
    .digest("hex");
  return `${salt}:${hash}`;
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  const [salt, storedHash] = hashedPassword.split(":");
  const hash = createHash("sha256")
    .update(password + salt)
    .digest("hex");
  
  try {
    return timingSafeEqual(Buffer.from(hash), Buffer.from(storedHash));
  } catch {
    return false;
  }
}
