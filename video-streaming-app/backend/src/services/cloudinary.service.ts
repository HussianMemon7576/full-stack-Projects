import { v2 as cloudinary, v2 } from 'cloudinary'
import { Config } from '../config/config.js';
import type { UploadOptionsTOCLOUDINARY } from '../types/types.js';
import fs from "fs"

cloudinary.config({ 
  cloud_name: Config.CLOUDINARY_NAME, 
  api_key: Config.CLOUDINARY_API_KEY, 
  api_secret: Config.CLOUDINARY_API_SECRET
});

async function uploadFilestoCloudinary(filePath:string,options:UploadOptionsTOCLOUDINARY){
    if(!filePath) return null
    try {
   const result = await v2.uploader.upload(filePath, {
    resource_type : options.resourceType,
    folder : options.folder
   })
   return result
    } finally {
         fs.unlink(filePath, (err) => {
  if (err) throw err;
  
  console.log('path/file.txt was deleted')
}
)
    }
}
export default uploadFilestoCloudinary