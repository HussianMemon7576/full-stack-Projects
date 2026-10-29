import nodemailer from "nodemailer"

import config from "../config/config.js";
import { sendPasswordResetEmail } from "../utils/otpHelper.js";

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: config.GOOGLE_USER,
    clientId: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    refreshToken: config.GOOGLE_REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});



export async function sendotpEmail(
  email: string,
  otpHtml: string
): Promise<void> {
  await transporter.sendMail({
    from: config.GOOGLE_USER,
    to: email,
    subject: "Your OTP Verification Code",
    html: otpHtml,
  });
}
export async function sendresetPasswordToEmail(
  email: string,
  resetUrl: string
): Promise<void> {
  await transporter.sendMail({
    from: config.GOOGLE_USER,
    to: email,
    subject: "Reset Your Password",
    html: sendPasswordResetEmail(resetUrl),
  });
}
