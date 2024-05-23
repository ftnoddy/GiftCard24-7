import nodemailer from "nodemailer";

// Function to send invoice email
const sendInvoiceEmail = async (email, userName, purchaseAmount,paymentMethod,orderItems) => {
    try {
        // Create transporter
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            service: "gmail",
            port: 587,
            secure: true,
            auth: {
                user: "atindramohandas353@gmail.com", // Replace with your email address
                pass: "pvmqweuhjferjjjk", // Replace with your email password
            },
        });

        // Prepare email content
        const mailOptions = {
            from:"atindramohandas353@gmail.com", // Use environment variable for email
            to: email,
            subject: 'Invoice for Your Purchase',
            html: `
                <div style="background-color: #f2f2f2; padding: 20px;">
                    <p style="color: #333; font-size: 16px;">Hello ${userName || 'Customer'},</p>
                    <p style="color: #333; font-size: 16px;">Thank you for your purchase. Your order has been successfully placed.</p>
                    <p style="color: #333; font-size: 16px;">Purchase Amount: $${purchaseAmount || 0}</p>
                    <p style="color: #333; font-size: 16px;">Payment Method: ${paymentMethod || 'N/A'}</p>
                    <p style="color: #333; font-size: 16px;">Order Items:</p>
                    <ul>
                        ${orderItems && orderItems.length > 0
                            ? orderItems.map(item => `<li style="color: #333; font-size: 16px;">${item.name} - $${item.productAmount} - Voucher Code: ${item.voucherCode}</li>`).join('')
                            : '<li style="color: #333; font-size: 16px;">No items purchased</li>'
                        }
                    </ul>
                    <p style="color: #333; font-size: 16px;">If you have any questions or concerns, please feel free to contact us.</p>
                    <p style="color: #333; font-size: 16px;">Best regards,<br/>Giftcards247 Team</p>
                </div>
            `,
        };

        // Send email
        await transporter.sendMail(mailOptions);
        console.log(`Invoice email sent to ${email}`);
    } catch (error) {
        console.error('Error sending invoice email:', error);
        throw error;
    }
};
const invoiceMailSender = async (email, userName, purchaseAmount, paymentMethod, orderItems) => {
    try {
        // Send invoice email
        await sendInvoiceEmail(email, userName, purchaseAmount, paymentMethod, orderItems);
    } catch (error) {
        console.error('Error in invoiceMailSender:', error);
        // Handle error if needed
    }
};

export default invoiceMailSender;
