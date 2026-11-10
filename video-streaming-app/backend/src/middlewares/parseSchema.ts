
import { ZodType } from "zod";
import type  { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError.js";

export const parseSchema = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req.files
      ? { ...req.body, files: req.files }
      : req.body;

    const result = schema.safeParse(data);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      return next(
        new ApiError(400, "Validation failed", errors)
      );
    }

    req.body = result.data;

    next();
  };
};
