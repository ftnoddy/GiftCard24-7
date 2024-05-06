import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();

const sendCongratulatoryEmail = async (email, name) => {
  try {
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // Email message options
    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Welcome to Our Platform!",
      text: `Hello ${name},\n\nCongratulations on signing up for our platform! We're excited to have you on board.\n\nBest regards,\nThe Team`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    console.log(`Congratulatory email sent to ${email}`);
  } catch (error) {
    console.error("Error sending congratulatory email:", error);
    throw new Error("Failed to send congratulatory email");
  }
};

export { sendCongratulatoryEmail };

// host: process.env.MAIL_HOST,
// user: process.env.MAIL_USER,
//         pass: process.env.MAIL_PASS,