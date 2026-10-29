import jwt from "jsonwebtoken";
import config from "../config/config.js";
import CustomError from "./customError.js";

export function createRefreshToken(userId: string) {
  return jwt.sign(
    { userId },
    config.JWT_SECRET,
    { expiresIn: "15d" }
  );
}

export function createAccessToken(userId: string, sessionId: string) {
  return jwt.sign(
    { userId, sessionId },
    config.JWT_SECRET,
    { expiresIn: "15m" }
  );
}


export function verifyRefreshToken(token: string) {
  const secret = config.JWT_SECRET;

  if (!secret) {
    throw new Error("REFRESH_TOKEN_SECRET is missing");
  }

  try {
    return jwt.verify(token, secret);
  } catch {
    throw new CustomError(
      "Invalid or expired refresh token",
      401
    );
  }
}