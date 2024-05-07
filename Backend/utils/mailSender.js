// import nodemailer from "nodemailer";

// const sendVerificationEmail = async (email, userId) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       secure: true, // Use SSL/TLS
//       auth: {
//         user: "atindramohandas353@gmail.com",
//         pass: "pvmqweuhjferjjjk",
//       },
//       // Configure your email transport options (e.g., SMTP, Gmail, etc.)
//     });

//     // Generate a verification token (could be a JWT token or any unique identifier)
//     const verificationToken = generateVerificationToken(userId);

//     // Construct the verification email message
//     const mailOptions = {
//       from: "atindramohandas353@gmail.com",
//       to: email,
//       subject: "Email Verification",
//       text: `Please click on the following link to verify your email: https://giftcards247.shop/api/users/verify-email?token=${verificationToken}`,
//     };

//     // Send the email
//     await transporter.sendMail(mailOptions);
//   } catch (error) {
//     console.error("Error sending verification email:", error);
//     throw new Error("Failed to send verification email");
//   }
// };

// const generateVerificationToken = (userId) => {
//   // Generate a unique verification token for the user (e.g., using JWT)
//   // You can use any method you prefer to generate the token
// };

// export default sendVerificationEmail;
import nodemailer from "nodemailer";

const sendVerificationEmail = async (email, subject, text) => {
	try {
		const transporter = nodemailer.createTransport({
			host: smtp.gmail.com,
			service: "gmail",
			port: 587,
      secure: true,

			auth: {
				user: "atindramohandas353@gmail.com",
        pass: "pvmqweuhjferjjjk",
			},
		});

		await transporter.sendMail({
			from: "atindramohandas353@gmail.com",
			to: email,
			subject: subject,
			text: text,
		});
		console.log("email sent successfully");
	} catch (error) {
		console.log("email not sent!");
		console.log(error);
		return error;
	}
};
export default sendVerificationEmail;