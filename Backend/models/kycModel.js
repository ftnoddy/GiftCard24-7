import mongoose from "mongoose";

const kycVerificationSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    dob: { type: Date, required: true },
    email: { type: String, required: true },
    idProofType: { type: String, required: true },
    idProofNo: { type: String }, // Making it optional by removing 'required: true'
    
    // Add any other fields specific to KYC verification
  },
  {
    timestamps: true,
  }
);

const KycVerification = mongoose.model("KycVerification", kycVerificationSchema);

export default KycVerification;
