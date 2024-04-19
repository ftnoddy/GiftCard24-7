import express from "express";
const router = express.Router();

import { authUser, logoutrUser, registerUser, submitKycVerification } from "../controller/userController.js";

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/logout").post(logoutrUser);
router.route("/kyc-verification").post(submitKycVerification);


export default router;
