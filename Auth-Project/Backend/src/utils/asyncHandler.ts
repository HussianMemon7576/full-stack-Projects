
import type {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express";

import type { AsyncController } from "../types/asyncHandler.types.js";

const asyncHandler = (fn: AsyncController): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default asyncHandler;
