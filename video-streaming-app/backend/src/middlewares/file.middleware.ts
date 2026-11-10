
import multer from "multer";
import path from "node:path";
import type { Request } from "express";
import type { FileFilterCallback } from "multer";


const allowedMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "video/mp4",
  "video/webm",
  "video/quicktime",
];

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, "public/temp/images");
    } else if (file.mimetype.startsWith("video/")) {
      cb(null, "public/temp/videos");
    } else {
      cb(new Error("Only images and videos are allowed"), "");
    }
  },

  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round( Math.random() * 1e9 )}${path.extname(file.originalname).toLowerCase()}`;

    cb(null, uniqueName);
  },
});

const fileFilter = (req: Request, file: Express.Multer.File,cb: FileFilterCallback) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid image or video format"));
  }
};


export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024,
    files: 2,
  },
});
