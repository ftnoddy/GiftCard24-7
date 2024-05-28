import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

export default function RazorpayCheckout() {
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart);
    const formattedCart = cart?.map(item => ({
        productId: item?.product?.productId,
        quantity: item?.quantity?.toString() || '1',
        denomination: parseFloat(item?.price).toFixed(2),
        email: user.email
    }));

    const handleOrderPlacement = async (orderId) => {
        try {
            const response = await axios.get(`http://localhost:5002/api/users/place-orders-razorpay/${orderId}`);
            console.log('Order details:', response.data);
        } catch (error) {
            console.error('Error getting order details:', error);
        }
    };

    const handlePaymentSuccess = async (paymentResponse) => {
        setLoading(true);

        try {
            const { razorpay_payment_id } = paymentResponse;

            const orderDetails = await axios.post("http://localhost:5002/api/users/place-orders-razorpay", {
                productId: formattedCart[0].productId,
                quantity: formattedCart[0].quantity,
                denomination: formattedCart[0].denomination,
                email: formattedCart[0].email,
                contact: user.contact,
                poNumber: razorpay_payment_id,
                userId: user._id,
                userName: user.name,
                razorpayPaymentId: razorpay_payment_id
            });

            console.log("Order details sent to backend:", orderDetails.data);

            await handleOrderPlacement(razorpay_payment_id);

            enqueueSnackbar("Order placed successfully!", { variant: "success" });
            navigate("/order-success");
        } catch (error) {
            console.error("Error capturing order or sending details to backend:", error);
            enqueueSnackbar("Failed to place order. Please try again.", { variant: "error" });
        } finally {
            setLoading(false);
        }
    };

    const initiateRazorpayPayment = async () => {
        setLoading(true);

        try {
            const itemsPrice = formattedCart.reduce((total, item) => total + parseFloat(item.denomination) * parseInt(item.quantity), 0);
            const orderAmount = (itemsPrice + 10).toFixed(2) * 100; // Amount in paise for Razorpay

            const order = await axios.post("http://localhost:5002/api/users/razorpay/create-order", { amount: orderAmount });
            const { id: order_id, currency } = order.data;

            const options = {
                key: "rzp_test_FcdFhaiHwpR0XK",
                amount: orderAmount,
                currency: currency,
                name: "Your Company Name",
                description: "Test Transaction",
                order_id: order_id,
                handler: handlePaymentSuccess,
                prefill: {
                    name: user.name,
                    email: user.email,
                    contact: user.contact
                },
                notes: {
                    address: "Razorpay Corporate Office"
                },
                theme: {
                    color: "#3399cc"
                }
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            console.error('Error initiating Razorpay payment:', error);
            enqueueSnackbar("Failed to initiate payment. Please try again.", { variant: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="App">
            <button onClick={initiateRazorpayPayment} disabled={loading} className="btn btn-primary">
                Pay with Razorpay
            </button>
            {loading && <p>Loading...</p>}
        </div>
    );
}
