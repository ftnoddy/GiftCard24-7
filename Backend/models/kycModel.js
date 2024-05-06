import mongoose from "mongoose";

const kycVerificationSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    dob: { type: Date, required: true },
    idProofType: { type: String, required: true },
    idProofNo: { type: String, required: true }, // Updated data type to String
    email: { type: String, required: true },
    idProofImage: { type: String, default: 'placeholder.jpg' },
    // Add any other fields specific to KYC verification
  },
  {
    timestamps: true,
  }
);

const KycVerification = mongoose.model("KycVerification", kycVerificationSchema);

export default KycVerification;
