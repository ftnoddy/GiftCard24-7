import express from "express";
const router = express.Router();

import {
  authUser,
  logoutrUser,
  registerUser,
  submitKycVerification,
  getUsers,
  getKycVerification
} from "../controller/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(registerUser)
router.route("/").get(getUsers);
router.route("/login").post(authUser);
router.route("/logout").post(logoutrUser);
router.route("/kyc-verification").post(protect, submitKycVerification);
router.route("/kyc-verification").get(getKycVerification);
router.route('/me').get(protect, async (req, res) => {
  if(req.user){
    res.status(200).json({user: req.user})
  }
  else{
    res.status(404).json({message: 'Unauthorized'})
  }
})

// router
//   .route("/:id")
//   .delete(protect, admin, deleteUsers)
//   .get(protect, admin, getUsersByID)
//   .put(protect, admin, updateUsers);

export default router;
