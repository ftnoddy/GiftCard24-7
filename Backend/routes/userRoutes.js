import express from "express";
const router = express.Router();

import {
  authUser,
  logoutUser,
  registerUser,
  submitKycVerification,
  getUsers,
  getKycVerification,
  getXoxodayData,
  verifyEmail,
  sendOtp
} from "../controller/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";




router.post("/", registerUser);
router.get("/", getUsers);
router.post("/login", authUser);
router.post("/logout", logoutUser);
router.post("/kyc-verification", submitKycVerification);
router.post("/email-verification", verifyEmail);
router.post("/send-otp",sendOtp );
router.route('/me').get(protect, async (req, res) => {
  if(req.user){
    res.status(200).json({user: req.user})
  }
  else{
    res.status(404).json({message: 'Unauthorized'})
  }
})
router.get('/accessories', getXoxodayData, (req, res) => {
  // Pass the Xoxoday data to your Accessories component
  res.status(200).json({ xoxodayData: req.xoxodayData });
});




export default router;
