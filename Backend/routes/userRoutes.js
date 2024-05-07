import express from "express";
const router = express.Router();

import {
  authUser,
  logoutUser,
  submitKycVerification,
  getUsers,
  getKycVerification,
  getXoxodayData
} from "../controller/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

// Import the registerUser and verifyEmail functions from the controller
import { registerUser, verifyEmail } from "../controller/userController.js";

// Import the sendVerificationEmail function
import sendVerificationEmail from "../utils/mailSender.js";

router.post("/", async (req, res) => {
  try {
    // Call the registerUser function from the controller
    await registerUser(req, res);

    // Extract email from the request body
    const { email } = req.body;

    // Send verification email
    await sendVerificationEmail(email, "Verify Your Email", "Click the link to verify your email.");

    // No need to send response here, as registerUser function already handles it
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route for verifying email
router.get("/:id/verify/:token", verifyEmail);

router.get("/", getUsers);
router.post("/login", authUser);
router.post("/logout", logoutUser);
router.post("/kyc-verification", submitKycVerification);
router.get("/kyc-verification", getKycVerification);
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
  res.render('accessories', { xoxodayData: req.xoxodayData });
});

export default router;
