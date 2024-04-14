import express from "express";
const router = express.Router();

import { authUser, logoutrUser, registerUser } from "../controller/userController.js";

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/logout").post(logoutrUser);

export default router;
