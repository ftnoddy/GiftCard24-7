import express from "express";
const router = express.Router();

import {
  authUser,
  logoutUser,
  registerUser,
  submitKycVerification,
  getUsers,
  getKycVerification,
  verifyEmail,
  sendOtp,
  checkout,
  getOrders,
  placeOrder,
  getVouchers,
  getPlaceOrderById,
  contactUs
  
} from "../controller/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";




router.post("/", registerUser);
router.get("/", getUsers);
router.post("/login", authUser);
router.post("/logout", logoutUser);
router.post("/kyc-verification", submitKycVerification);
router.get("/getkyc-verification", getKycVerification);
router.post("/email-verification", verifyEmail);
router.post("/checkout", checkout);
router.get("/get-orders", getOrders);
router.get("/place-orders/:userId", getPlaceOrderById);
router.post("/place-orders", placeOrder);
router.get("/get-data", getVouchers);
router.post("/contact-us", contactUs); 


router.post("/send-otp",sendOtp );
router.route('/me').get(protect, async (req, res) => {
  if(req.user){
    res.status(200).json({user: req.user})
  }
  else{
    res.status(404).json({message: 'Unauthorized'})
  }
})




export default router;
