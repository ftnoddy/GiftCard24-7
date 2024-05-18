import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";


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
    // const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();

    const cart = useSelector((state) => state.cart);
    console.log("PAYPAL cart", cart[0]);
    const formattedCart = cart?.map(item => ({
        productId: item?.product.productId,
        name: item?.product.name,
        price: item?.price
        // Add other keys as needed
    }));

    const handleApprove = (data, actions) => {
        setLoading(true); // Set loading state while processing the payment
        
        // Calculate the itemsPrice based on the prices of items in the cart
        const itemsPrice = formattedCart.reduce((total, item) => total + parseFloat(item.price), 0);
    
        return actions.order.capture().then(function (details) {
            console.log("Transaction completed by " + details.payer.name.given_name);
            console.log("Order details:", details);
    
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
                setLoading(false); // Reset loading state
                // history.push("/"); // Redirect to the home page
            }).catch((error) => {
                console.error("Error sending order details to backend:", error);
                setLoading(false); // Reset loading state
            });
        });
    };

    return (
        <div className="App">
            <PayPalScriptProvider options={initialOptions}>
                <PayPalButtons style={style}  onApprove={handleApprove} disabled={loading} />
            </PayPalScriptProvider>
            {loading && <p>Loading...</p>}
        </div>
    );
}
