import { generate } from 'otp-generator';
import { findOne, create } from '../models/otpModel';
import { findOne as _findOne } from '../models/userModel';

export async function sendOTP(req, res) {
  try {
    const { email } = req.body;
    // Check if user is already present
    const checkUserPresent = await _findOne({ email });
    // If user found with provided email
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: 'User is already registered',
      });
    }
    let otp = generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    let result = await findOne({ otp: otp });
    while (result) {
      otp = generate(6, {
        upperCaseAlphabets: false,
      });
      result = await findOne({ otp: otp });
    }
    const otpPayload = { email, otp };
    const otpBody = await create(otpPayload);
    res.status(200).json({
      success: true,
      message: 'OTP sent successfully',
      otp,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
}