import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import sendVerificationEmail from "../utils/mailSender.js";
import invoiceMailSender from "../utils/invoiceMailSender.js";
import sendContactUsEmail from "../utils/contactMailSender.js";
import jwt from "jsonwebtoken";
import KycVerification from "../models/kycModel.js";
import OTP from "../models/otpModel.js";
import EmailVerification from "../models/emailModel.js";
import Order from "../models/orderModel.js";
import PlaceOrder from "../models/placeOrders.js";
import crypto from "crypto";
import twilio from 'twilio';
import { validationResult } from "express-validator";
import generateToken from "../utils/generateToken.js";
import axios from "axios";
import dotenv from 'dotenv';



dotenv.config();
const bearerToken = process.env.BEARER_TOKEN;
// console.log("token",bearerToken);


const getVouchers = async (req, res) => {
  const searchQuery = req.query.query || ''; // Get search query from request parameters

  // Ensure that bearerToken is defined
  if (!bearerToken) {
    return res.status(400).json({ error: "Bearer token is not defined" });
  }

  const options = {
    method: 'POST',
    url: 'https://accounts.xoxoday.com/chef/v1/oauth/api/',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${bearerToken}` 
    },
    data: {
      query: 'plumProAPI.mutation.getVouchers',
      tag: 'plumProAPI',
      variables: {
        data: {
          limit: 200,
          page: 1,
          exchangeRate: 1,
          sort: { field: 'name', order: 'ASC' },
          filters: searchQuery ? { name: { contains: searchQuery } } : {} // Include search filter
        }
      }
    }
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch vouchers' });
  }
};


  const placeOrder = async (req, res) => {
    try {
        const { userId, productId, quantity, denomination, email, contact, poNumber, userName } = req.body;

        if ( !userName|| !userId || !productId || !quantity || !denomination || !email || !poNumber) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        console.log("user", userId);
        console.log("name",userName);

        const options = {
            method: 'POST',
            url: 'https://accounts.xoxoday.com/chef/v1/oauth/api/',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                authorization: `Bearer ${process.env.BEARER_TOKEN}`
            },
            data: {
                query: 'plumProAPI.mutation.placeOrder',
                tag: 'plumProAPI',
                variables: {
                    data: {
                        productId,
                        quantity,
                        denomination,
                        email,
                        contact,
                        poNumber,
                        notifyReceiverEmail: 1,
                        notifyAdminEmail: 0
                    }
                }
            }
        };

        const response = await axios.request(options);

        console.log('API Response:', response.data);

        const placeOrderResponse = response.data.data.placeOrder.data;

        if (!placeOrderResponse) {
            throw new Error('Invalid response from placeOrder API');
        }

        const {
            orderId,
            orderTotal,
            orderDiscount,
            discountPercent,
            currencyCode,
            currencyValue,
            amountCharged,
            orderStatus,
            deliveryStatus,
            tag,
            quantity: responseQuantity,
            vouchers = [],
            voucherDetails = []
        } = placeOrderResponse;

        if (!orderId) {
            throw new Error('Missing orderId in response');
        }

        const newOrder = new PlaceOrder({
            userId,
            orderId,
            orderTotal,
            orderDiscount,
            discountPercent,
            currencyCode,
            currencyValue,
            amountCharged,
            orderStatus,
            deliveryStatus,
            tag,
            quantity: responseQuantity,
            vouchers: vouchers.map(voucher => ({
                productId: voucher.productId,
                orderId: voucher.orderId,
                voucherCode: voucher.voucherCode,
                pin: voucher.pin,
                validity: voucher.validity,
                amount: voucher.amount,
                currency: voucher.currency,
                country: voucher.country,
                type: voucher.type,
                currencyValue: voucher.currencyValue
            })),
            voucherDetails: voucherDetails.map(detail => ({
                orderId: detail.orderId,
                productId: detail.productId,
                productName: detail.productName,
                currencyCode: detail.currencyCode,
                productStatus: detail.productStatus,
                denomination: detail.denomination
            }))
        });

        await newOrder.save();

        // Send invoice email
        const emailContent = {
          email,
          userName: userName || 'Customer',
          purchaseAmount: denomination, // Use the provided user name or a default value
          paymentMethod: 'Credit Card', // Or the actual payment method
          orderItems: vouchers.map(voucher => {
            const detail = voucherDetails.find(detail => detail.productId === voucher.productId);
            return {
              name: detail?.productName || 'Unknown Product',
              productAmount: detail?.denomination,
              status: detail?.productStatus,
              voucherCode: voucher.voucherCode,
              validity: voucher.validity
            };
          })
        };
    
        await invoiceMailSender(email, emailContent.userName, emailContent.purchaseAmount, emailContent.paymentMethod, emailContent.orderItems);
    

        res.status(200).json(newOrder);
    } catch (error) {
        console.error('Error placing order:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

  
const getPlaceOrderById = async (req, res) => {
  try {
    // Extract orderId from request params and convert it to a number

    const userId = req.params.userId
    
    // console.log('Received orderId param:', orderIdParam);  // Debug log
    console.log('Converted orderId to number:', userId);  // Debug log

   

    // Find the order by orderId
    const order = await PlaceOrder.find({ userId }).select(
        'orderId voucherDetails.productId voucherDetails.productName voucherDetails.currencyCode deliveryStatus voucherDetails.denomination vouchers.voucherCode vouchers.validity vouchers.type'
    );

    if (!order) {
        return res.status(404).json({ message: 'Order not found' });
    }

    // Map the response to include the required fields
    const result = order.map((order) => {return{
      orderId: order.orderId,
      productDetails: order.voucherDetails.map(detail => ({
          productId: detail.productId,
          productName: detail.productName,
          currencyCode: detail.currencyCode,
          denomination: detail.denomination,
      })),
      vouchers: order.vouchers.map(voucher => ({
          voucherCode: voucher.voucherCode,
          validity: voucher.validity,
          type: voucher.type
      })),
      deliveryStatus: order.deliveryStatus
  };
  })
    
    res.status(200).json(result);
} catch (error) {
    console.error('Error getting place order:', error.message);
    res.status(500).json({ message: 'Internal server error' });
}
};




// `Bearer ${process.env.BEARER_TOKEN}`

// import bcrypt from 'bcryptjs';

const submitKycVerification = async (req, res) => {
  try {
    // Extract data from request body
    const { userName, dob, email, idProofType, idProofNo } = req.body;
    const idProofImage = req.file.path;

    // Create a new KYC verification document
    const kycVerification = new KycVerification({
      userName,
      dob,
      email,
      idProofType,
      idProofNo,
      idProofImage,
     
    });

    // Save the KYC verification document to the database
    const savedKycVerification = await kycVerification.save();

    // Respond with success message and saved KYC verification data
    res.status(201).json(savedKycVerification);
  } catch (error) {
    // If an error occurs, respond with error status and message
    res.status(500).json({ message: "KYC verification submission failed", error: error.message });
  }
};

const getKycVerification = asyncHandler(async (req, res) => {
  const kycData = await KycVerification.find({});
  res.json(kycData);
});


export const contactUs = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await sendContactUsEmail(name, email, message);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error.message);
    res.status(500).json({ message: 'Error sending email' });
  }
};

// @desc    Auth user & get token
// @route   POST/ api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      // generateToken(res, user._id);
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: token,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @desc    Register a user
// @route   POST/ api/users
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Generate email token
    const emailToken = crypto.randomBytes(32).toString("hex");

    // Create the user with email token
    const user = await User.create({
      name,
      email,
      password,
      emailToken, // Save email token to the user document
    });



    // Generate JWT token
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send verification email
    await sendVerificationEmail(email, user._id, emailToken);

    // Respond with user data and token
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const emailToken = req.body.emailToken;
    if (!emailToken) return res.status(404).json("Email token is not found");

    // Find user by emailToken
    const user = await User.findOne({ emailToken });

    if (user) {
      // Mark user as verified
      user.isVerified = true;
      await user.save();

      // Generate JWT token for the user
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      // Respond with user data and token
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token,
        isVerified: user.isVerified,
        message: "Email verification successful",
      });
    } else {
      res.status(404).json("Email verification failed, invalid token");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const sendOtp = async (req, res) => {
  const { mobile } = req.body;

  try {
    // Generate OTP (you can use a library like otp-generator)
    const generateOTP = () => {
      // Generate a random 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000);
      return otp.toString(); // Convert OTP to string
    };

    // Generate the OTP
    const otp = generateOTP();

    // Initialize Twilio client
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioClient = twilio(accountSid, authToken);

    // Send OTP to the mobile number
    await twilioClient.messages.create({
      body: `Your OTP is: ${otp}`,
      from: process.env.TWILIO_PH_NO, // Twilio phone number
      to: mobile,
    });

    // Save OTP to the database
    await OTP.create({ mobile, otp });

    res.status(200).json({ otp });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
};

const checkout = async (req, res) => {
  try {
    // Extract order details from the request body
    const { orderItems, paymentMethod, itemsPrice, taxPrice, totalPrice, user } = req.body;
    console.log(req.body)

    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Create a new order object
    const order = new Order({
      user: user._id, // Assuming authenticated user's ID is stored in req.user
      orderItems,
      paymentMethod,
      itemsPrice,
      taxPrice,
      totalPrice,
    });

     // Send invoice email


    // Save the order to the database
    await order.save();
    // await invoiceMailSender(user.email, user.name, totalPrice, paymentMethod, orderItems);


    // Respond with success message
    res.status(200).json({ message: "Order placed successfully", orderId: order._id });
  } catch (error) {
    console.error("Error handling checkout:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({}).lean();
    // console.log("orders", orders);

    // Respond with the fetched orders
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


const getOrderByUserId = asyncHandler(async (req, res) => {
  try {
    // Extract order ID from request parameters
    const orderId = req.user._id

    // Query the database for the order by order ID
    const order = await Order.find({user: orderId}).lean();

    // If order is found, respond with the order data
    if (order) {
      res.status(200).json(order);
    } else {
      // If order is not found, respond with 404 Not Found
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    console.error("Error fetching order by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});





// @desc    Logout a user / clear the cookie
// @route   POST/ api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
});

// @desc    Get user profile
// @route   GET/ api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404).json({ message: "User not found" });
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   PUT/ api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404).json({ message: "User not found" });
    throw new Error("User not found");
  }
});

// @desc    Get users
// @route   GET/ api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(404).json({ message: "User not found" });
    throw new Error("User not found");
  }
});


// @desc    Get users by ID
// @route   GET/ api/users/:id
// @access  Private/Admin
const getUsersByID = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User not found" });
    throw new Error("User Not Found");
  }
});


// @desc    Delete users
// @route   DELETE/ api/users/:id
// @access  Private/Admin
const deleteUsers = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    if (user.isAdmin) {
      res.status(400).json({ message: "Cannot delete admin user" });
      throw new Error("Cannot delete admin user");
    }
    await User.deleteOne({ _id: user._id });
    res.status(200).json({ message: "User deleted successfully" });
  } else {
    res.status(404).json({ message: "User not found" });
    throw new Error("User not found");
  }
});

// @desc    Update users
// @route   PUT/ api/users/:id
// @access  Private/Admin
const updateUsers = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    (user.name = req.body.name || user.name)  ,
      (user.email = req.body.email || user.email);
    user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save();  

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404).json({ message: "User not found" });
    throw new Error("User not found");
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUsersByID,
  deleteUsers,
  updateUsers,
  submitKycVerification,
  getKycVerification,
  getVouchers ,
  verifyEmail ,
  sendOtp,
  checkout,
  getOrders,
  placeOrder,
  getOrderByUserId,
  getPlaceOrderById,
  
};