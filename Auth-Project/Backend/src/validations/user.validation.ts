
import { z } from "zod";

export const userSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username cannot exceed 20 characters"),
email: z
  .email({
    error: "Please enter a valid email address",
  })
  .trim()
  .toLowerCase(),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(72, "Password cannot exceed 72 characters"),
});




export const loginSchema = z.object({
email: z
  .email({
    error: "Please enter a valid email address",
  })
  .trim()
  .toLowerCase(),

  password: z
    .string()
  
    .min(8, "Password must be at least 8 characters long")
    .max(72, "Password cannot exceed 72 characters"),

});






export const verifyOtpSchema = z.object({

  email: z
  .email({
    error: "Please enter a valid email address",
  })
  .trim()
  .toLowerCase(),

  otp: z
    .string()
    .trim()
    .length(4, "OTP must be exactly 4 digits")
    .regex(/^\d{4}$/, "OTP must contain only digits"),
});



export const verifyuserName = z.object({
  newUserName: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username cannot exceed 20 characters"),

});




export const changePasswordSchema = z.object({
  oldPassword: z.string().min(1, "Old password is required"),

  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "One uppercase letter required")
    .regex(/[a-z]/, "One lowercase letter required")
    .regex(/[0-9]/, "One number required"),
});




export const resetPasswordSchema = z
  .object({
    
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[a-z]/, "Password must contain a lowercase letter")
      .regex(/[A-Z]/, "Password must contain an uppercase letter")
      .regex(/[0-9]/, "Password must contain a number"),

    confirmPassword: z
      .string()
      .min(1, "Confirm password is required"),
  })
  .refine(
    (data) => data.newPassword === data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

