import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
    const initialOptions = {
        clientId: import.meta.env.PAYPAL_CLIENT_ID,
        currency: "USD",
    };

    const style = {
        color: 'blue',
        disableMaxWidth: true,
    };

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
            const response = await axios.get(`http://localhost:5002/api/users/place-orders/${orderId}`);
            console.log('Order details:', response.data);
        } catch (error) {
            console.error('Error getting order details:', error);
        }
    };

    const handleApprove = async (data, actions) => {
        setLoading(true);

        try {
            const details = await actions.order.capture();
            console.log("Transaction completed by " + details.payer.name.given_name);
            console.log("Order details:", details);

            const orderId = details.id; // Extract the PayPal order ID to use as poNumber

            const response = await axios.post("http://localhost:5002/api/users/place-orders", {
                productId: formattedCart[0].productId,
                quantity: formattedCart[0].quantity,
                denomination: formattedCart[0].denomination,
                email: formattedCart[0].email,
                poNumber: orderId
            });

            console.log("Order details sent to backend:", response.data);

            // Now get the order details dynamically using the orderId
            await handleOrderPlacement(orderId);

            enqueueSnackbar("Order placed successfully!", { variant: "success" });
            navigate("/order-success");
        } catch (error) {
            console.error("Error capturing order or sending details to backend:", error);
            enqueueSnackbar("Failed to place order. Please try again.", { variant: "error" });
        } finally {
            setLoading(false);
        }
    };

    const createOrder = async (data, actions) => {
        const itemsPrice = formattedCart.reduce((total, item) => total + parseFloat(item.denomination) * parseInt(item.quantity), 0);
        const purchase_units = [{
            amount: {
                currency_code: 'USD',
                value: (itemsPrice + 10).toFixed(2),
                breakdown: {
                    item_total: { currency_code: 'USD', value: itemsPrice.toFixed(2) },
                    tax_total: { currency_code: 'USD', value: '10.00' },
                    shipping: { currency_code: 'USD', value: '0.00' }
                }
            },
            items: formattedCart.map(item => ({
                name: item.productId,
                unit_amount: { currency_code: 'USD', value: item.denomination },
                quantity: item.quantity
            }))
        }];

        console.log("Creating order with payload:", purchase_units);

        return actions.order.create({
            purchase_units: purchase_units
        }).then(orderId => {
            console.log("Created order with ID:", orderId);
            return orderId;
        }).catch(error => {
            console.error('Error creating order:', error);
            throw error;
        });
    };

    return (
        <div className="App">
            <PayPalScriptProvider options={initialOptions}>
                <PayPalButtons
                    style={style}
                    disabled={loading}
                    createOrder={createOrder}
                    onApprove={handleApprove}
                    onError={(err) => {
                        console.error('PayPal Checkout onError', err);
                        enqueueSnackbar("Failed to create order. Please try again.", { variant: "error" });
                    }}
                />
            </PayPalScriptProvider>
            {loading && <p>Loading...</p>}
        </div>
    );
}
