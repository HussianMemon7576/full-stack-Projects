
import { randomBytes, createHash } from "node:crypto";

export const generateResetToken = () => {
  // Original token: email link mein jayega
  const token = randomBytes(32).toString("hex");

  // Hashed token: database mein store hoga
  const tokenHash = createHash("sha256")
    .update(token)
    .digest("hex");

  return { token, tokenHash };
};

export const hashResetToken = (token: string) => {
  return createHash("sha256")
    .update(token)
    .digest("hex");
};
