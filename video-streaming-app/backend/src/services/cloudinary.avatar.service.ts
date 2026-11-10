import { v2 as cloudinary, v2 } from 'cloudinary'
import { Config } from '../config/config.js';


cloudinary.config({ 
  cloud_name: Config.CLOUDINARY_NAME, 
  api_key: Config.CLOUDINARY_API_KEY, 
  api_secret: Config.CLOUDINARY_API_SECRET
});


function uploadAvatarToCloudinary(svg:string){
if(!svg) return null
    const file = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
    try {
        const result = cloudinary.uploader.upload(file, { resource_type: "image", folder : "youtube/avatars" })
        return result
    } catch (error) {
        console.log(error)
   throw error     
    }


}
export default uploadAvatarToCloudinary