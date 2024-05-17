import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

//Protect routes
const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization
  const token = authHeader.split(' ')[1]
  console.log('token', token)

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async(err, user) => {
      if (err) {
          return res.status(401).json({ message: 'Unauthorized' });
      }
      const userInfo = await User.findOne({email: user.email})
      req.user = userInfo;
      next();
  });
  } else {
    res.status(401).json({message: 'Unauthorized'});
  }
});

//Admin middleware
const admin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not Authenticated, not admin");
  }
});

export { protect, admin };