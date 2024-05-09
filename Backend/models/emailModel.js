import mongoose from "mongoose";

const emailVerificationSchema = new mongoose.Schema(
  {
    emailToken: { type: String, required: true, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isVerified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const EmailVerification = mongoose.model("EmailVerification", emailVerificationSchema);

export default EmailVerification;
