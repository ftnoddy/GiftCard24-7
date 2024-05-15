import nodemailer from "nodemailer";


const sendVerificationEmail = async (email, userId, emailToken) => {
    try {
        const verificationLink = `http://localhost:5173/verify-email:email?token=${emailToken}`;

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

        await transporter.sendMail({
            from: "atindramohandas353@gmail.com",
            to: email,
            subject: "Email Verification",
            text: `Please click on the following link to verify your email: ${verificationLink}`,
        });

        console.log("Email sent successfully");
    } catch (error) {
        console.error("Email not sent:", error);
        throw error;
    }
};
export default sendVerificationEmail;