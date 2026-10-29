// import type { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";
// import  asyncHandler  from "../utils/asyncHandler.js";
// import CustomError from "../utils/customError.js";
// import config from "../config/config.js";

// export const verifyAccessToken = asyncHandler(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const authorization = req.headers.authorization;

//     if (!authorization?.startsWith("Bearer ")) {
//       throw new CustomError("Access token is missing", 401);
//     }

//     const token = authorization.split(" ")[1];

//     if (!token) {
//       throw new CustomError("Access token is missing", 401);
//     }

//     const decoded = jwt.verify(token, config.JWT_SECRET);

   


//     if (!decoded || typeof decoded !== "object") {
//       throw new CustomError("Invalid access token", 401);
//     }

//     req.userId = decoded;

//     next();
//   }
// );

import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import CustomError from "../utils/customError.js";
import config from "../config/config.js";

export const verifyAccessToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;

    if (!authorization?.startsWith("Bearer ")) {
      throw new CustomError("Access token is missing", 401);
    }

    const token = authorization.split(" ")[1];

    if (!token) {
      throw new CustomError("Access token is missing", 401);
    }

    let decoded: string | jwt.JwtPayload;

    try {
      decoded = jwt.verify(token, config.JWT_SECRET);
    } catch (error) {
      if (
        error instanceof jwt.TokenExpiredError
      ) {
        throw new CustomError("Access token expired", 401);
      }

      if (error instanceof jwt.JsonWebTokenError) {
        throw new CustomError("Invalid access token", 401);
      }

      throw error;
    }

    if (typeof decoded !== "object" || decoded === null) {
      throw new CustomError("Invalid access token", 401);
    }

    req.userId = decoded;

    next();
  }
);
