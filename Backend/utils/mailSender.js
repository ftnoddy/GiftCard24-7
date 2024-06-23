import nodemailer from "nodemailer";

const sendVerificationEmail = async (email, otpCode) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "gmail",
      port: 587,
      secure: true,
      auth: {
        user: "atindramohandas353@gmail.com",
        pass: "pvmqweuhjferjjjk",
      },
    });

    const mailOptions = {
      from: "atindramohandas353@gmail.com",
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otpCode}. It will expire in 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`OTP email sent to ${email}`);
  } catch (error) {
    console.error('Error sending OTP email:', error);
    throw new Error('Failed to send OTP email');
  }
};

export default sendVerificationEmail;
