// utils/sendContactUsEmail.js
import nodemailer from "nodemailer";

const sendContactUsEmail = async (name, email, message,mobile) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            service: "gmail",
            port: 587,
            secure: true,
            auth: {
                user: "atindramohandas353@gmail.com", // Replace with your email
                pass: "pvmqweuhjferjjjk",  // Replace with your email password or app-specific password
            },
        });

        const mailOptions = {
            from: email, // Sender's email address
            to: "atindramohandas353@gmail.com", // Your email address to receive the contact messages
            subject: "New Contact Form Submission",
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message} \nMobile:${mobile} `,
        };

        await transporter.sendMail(mailOptions);
        console.log("Contact us email sent successfully");
    } catch (error) {
        console.error("Contact us email not sent:", error);
        throw error;
    }
};

export default sendContactUsEmail;
