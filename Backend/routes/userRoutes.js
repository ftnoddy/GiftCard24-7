import express from "express";
const router = express.Router();

import {
  authUser,
  logoutUser,
  registerUser,
  submitKycVerification,
  getUsers,
  getKycVerification,
  getXoxodayData
} from "../controller/userController.js";

router.post("/", registerUser);
router.get("/", getUsers);
router.post("/login", authUser);
router.post("/logout", logoutUser);
router.post("/kyc-verification", submitKycVerification);
router.get("/kyc-verification", getKycVerification);
router.get('/accessories', getXoxodayData, (req, res) => {
  // Pass the Xoxoday data to your Accessories component
  res.render('accessories', { xoxodayData: req.xoxodayData });
});

export default router;
