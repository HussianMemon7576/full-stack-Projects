import type { NextFunction, Request, Response } from "express";

export type AsyncFunction = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<any>;


export interface UploadOptionsTOCLOUDINARY {
  resourceType: "image" | "video";
  folder: string;
}
