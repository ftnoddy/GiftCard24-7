import nodemailer from "nodemailer";
// import dotenv from 'dotenv';

// dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  // port: 465,
  secure: true, // Use SSL/TLS
  auth: {
    user: "atindramohandas353@gmail.com",
    pass: "pvmqweuhjferjjjk",
  },
});

async function sendMail(to, subject, text, html) {
  try {
    // Send mail with defined transport object
    const info = await transporter.sendMail({
      from: "atindramohandas353@gmail.com", // Sender address
      to, // List of receivers
      subject, // Subject line
      text, // Plain text body
      html, // HTML body
    });

    console.log("Email sent:", info.messageId);
    return info.messageId;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
}

export default sendMail;
