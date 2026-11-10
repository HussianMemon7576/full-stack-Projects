import z from "zod"

// Image Schema wrapper


const imageSchema = z.object({
  mimetype: z.enum(["image/jpeg", "image/png", "image/webp"]),
  size: z.number().max(5 * 1024 * 1024),
});




const registerSchema  = z.object({
  
    email : 
    z.email() ,
    
    password : 
    z.string()
    .min(7, "Password must be at least 7 characters")
    .max(20, "Password cannot exceed 20 characters"),

    fullName : 
    z.string()
    .min(3, "fullName must be at least 10 characters")
    .max(30, "fullName cannot exceed 30 characters"),


  })



const loginSchema  = z.object({
  
    email : 
    z.email() ,
    
    password : 
    z.string()
    .min(7, "Password must be at least 7 characters")
    .max(20, "Password cannot exceed 20 characters"),

    fullName : 
    z.string()
    .min(10, "fullName must be at least 10 characters")
    .max(30, "fullName cannot exceed 30 characters"),



    
})




export {registerSchema}