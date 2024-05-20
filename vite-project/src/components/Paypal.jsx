import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

export default function Checkout({ amount }) {
    const initialOptions = {
        clientId: import.meta.env.PAYPAL_CLIENT_ID
        // Add other options as needed
    };

    const style = {
        color: 'blue',
        disableMaxWidth: true,
        // label: 'checkout',
    };

    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();


    const cart = useSelector((state) => state.cart);
    const formattedCart = cart?.map(item => ({
        name: item?.product.name,
        unit_amount: {
            currency_code: 'USD', // Replace with your currency code if different
            value: parseFloat(item?.price).toFixed(2)
        },
        quantity: '1' // Adjust quantity as needed
    }));

    const handleApprove = async (data, actions) => {
        setLoading(true); // Set loading state while processing the payment

        return actions.order.capture().then(function (details) {
            console.log("Transaction completed by " + details.payer.name.given_name);
            console.log("Order details:", details);

            // Calculate the itemsPrice based on the prices of items in the cart
            const itemsPrice = formattedCart.reduce((total, item) => total + parseFloat(item.unit_amount.value), 0);

            // Send order details to your backend
            axios.post("http://localhost:5002/api/users/checkout", {
                orderItems: formattedCart,
                paymentMethod: "PayPal",
                itemsPrice: itemsPrice, // Set the calculated itemsPrice
                taxPrice: 10, // Adjust tax and shipping prices as needed
                totalPrice: itemsPrice + 10, // Calculate totalPrice by adding itemsPrice and taxPrice
                user
            }).then((response) => {
                console.log("Order details sent to backend:", response.data);
                enqueueSnackbar("Order placed successfully!", { variant: "success" });
                setLoading(false);
                navigate("/order-success")
                // history.push("/"); // Redirect to the home page
            }).catch((error) => {
                console.error("Error sending order details to backend:", error);
                enqueueSnackbar("Failed to place order. Please try again.", { variant: "error" });
                setLoading(false); // Reset loading state
            });
        });
    };

    return (
        <div className="App">
            <PayPalScriptProvider options={initialOptions}>
                <PayPalButtons
                    style={style}
                    disabled={loading}
                    createOrder={(data, actions) => {
                        const itemsPrice = formattedCart.reduce((total, item) => total + parseFloat(item.unit_amount.value), 0);
                        return actions.order.create({
                            purchase_units: [{
                                amount: {
                                    currency_code: 'USD', // Replace with your currency code if different
                                    value: (itemsPrice + 10).toFixed(2), // Ensure the amount is correctly formatted
                                    breakdown: {
                                        item_total: { currency_code: 'USD', value: itemsPrice.toFixed(2) },
                                        tax_total: { currency_code: 'USD', value: '10.00' }, // Adjust tax as needed
                                        shipping: { currency_code: 'USD', value: '0.00' } // Adjust shipping as needed
                                    }
                                },
                                items: formattedCart
                            }]
                        });
                    }}
                    onApprove={handleApprove}
                />
            </PayPalScriptProvider>
            {loading && <p>Loading...</p>}
        </div>
    );
}







// clientId: import.meta.env.PAYPAL_CLIENT_ID