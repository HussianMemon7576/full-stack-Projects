import Usermodel from "../models/User.js";

export async function findUserByEmail(email: string) {
  return Usermodel.findOne({ email: email.toLowerCase() });
}

export async function saveResetToken(
  userId: string,
  tokenHash: string,
  expiresAt: Date
) {
  return Usermodel.findByIdAndUpdate(userId, {
    $set: {
      passwordResetTokenHash: tokenHash,
      passwordResetExpiresAt: expiresAt,
    },
  });
}

export async function findUserByResetToken(
  tokenHash: string
) {
  return Usermodel.findOne({
    passwordResetTokenHash: tokenHash,
    passwordResetExpiresAt: { $gt: new Date() },
  });
}

export async function updatePasswordAndConsumeToken(
  userId: string,
  hashedPassword: string
) {
  return Usermodel.findOneAndUpdate(
    {
      _id: userId,
      passwordResetExpiresAt: { $gt: new Date() },
    },
    {
      $set: { password: hashedPassword },
      $unset: {
        passwordResetTokenHash: 1,
        passwordResetExpiresAt: 1,
      },
    },
    { new: true, runValidators: true }
  );
}