import type { NextFunction, Request, Response } from "express"
import type { AsyncFunction } from "../types/types.js"

export const asyncHandler = (fn:AsyncFunction) => {
    return (req:Request,res:Response,next:NextFunction) => {
        Promise.resolve(fn(req,res,next)).catch((err) => next(err))
    }
}

