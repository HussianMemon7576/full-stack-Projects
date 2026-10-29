
import type {
  Request,
  Response,
  NextFunction,
} from "express";

import { verifyRefreshToken } from "../utils/Tokens.js";
import CustomError from "../utils/customError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const verifyRefreshTokenMiddleware = asyncHandler(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const token = req.cookies?.RefreshToken;

    if (!token) {
      throw new CustomError("Refresh token is required", 401);
    }

    const decoded = verifyRefreshToken(token);

    res.locals.refreshToken = token;
    res.locals.decodedRefreshToken = decoded;

    next();
  }
);

