
import bcrypt from "bcrypt"
import { randomInt } from "node:crypto";
import { convertvaluetoCrypto } from "./hashed.js";


export function createOtp(): string {
  return randomInt(0, 10000).toString().padStart(4, "0");
}


export function createOtpHtml(otp: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <body style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Email Verification</h2>
        <p>Your OTP verification code is:</p>

        <h1 style="letter-spacing: 8px; color: #2563eb;">
          ${otp}
        </h1>

        <p>This code expires in 15 minutes.</p>
        <p>If you did not request this code, ignore this email.</p>
      </body>
    </html>
  `;
}
export function sendPasswordResetEmail(
  resetUrl: string
): string {
  return `
    <!DOCTYPE html>
    <html>
      <body style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Reset Your Password</h2>

        <p>Click the button below to reset your password.</p>

        <a
          href="${resetUrl}"
          style="
            display: inline-block;
            padding: 12px 20px;
            background: #2563eb;
            color: white;
            text-decoration: none;
            border-radius: 6px;
          "
        >
          Reset Your Password
        </a>

        <p>This link expires in 15 minutes.</p>
        <p>If you did not request this, ignore this email.</p>
      </body>
    </html>
  `;
}

export async function hashOtp(otp: string): Promise<string> {
  return convertvaluetoCrypto(otp);
}