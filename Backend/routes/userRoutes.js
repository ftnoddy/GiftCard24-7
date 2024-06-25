import express from "express";
const router = express.Router();
import upload from "../upload/multerConfig.js";

import {
  authUser,
  logoutUser,
  registerUser,
  submitKycVerification,
  getUsers,
  getKycVerification,
  verifyEmail,
  sendOtp,
  placeOrder,
  getVouchers,
  getPlaceOrderById,
  contactUs,
  getFilters,
  placeOrderRazorpay,
  createRazorpayOrder,
  getAllOrders,
  sendOtpMail
  
} from "../controller/userController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

// User registration and login
router.post("/", registerUser);
router.post("/login", authUser);
router.post("/logout", logoutUser);

// KYC Verification
router.post("/kyc-verification", upload.single('idProofImage'), submitKycVerification);
router.get("/getkyc-verification", getKycVerification);

// Email verification
router.post("/email-verification", verifyEmail);

// OTP
router.post("/send-otp", sendOtp);
router.post("/send-otp-mail", sendOtpMail);


// Checkout and Orders
router.post("/place-orders", placeOrder);
router.get("/get-all-orders", getAllOrders);
router.get("/place-orders/:userId", getPlaceOrderById);
router.post("/place-orders-razorpay", placeOrderRazorpay);
router.post("/razorpay/create-order", createRazorpayOrder);

// Vouchers
router.get("/get-vouchers", getVouchers);
router.get("/get-filters", getFilters);


// Contact Us
router.post("/contact-us", contactUs);

// Get user profile
router.route('/me').get(protect, async (req, res) => {
  if (req.user) {
    res.status(200).json({ user: req.user });
  } else {
    res.status(404).json({ message: 'Unauthorized' });
  }
});

// Admin routes
router.get("/", getUsers);

export default router;
