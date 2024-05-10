
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function Checkout({amount}) {
    const initialOptions = {
        clientId: import.meta.env.PAYPAL_CLIENT_ID
        // Add other options as needed
    };

    const style = {
        color: 'blue',
        disableMaxWidth: true,
        label: 'checkout',
    }
    const message= {
        amount: amount
    }

    /*for creating order in the backend

    const createOrder = () => {
        console.log(`${amount}`)
    } */
    return (
        <div className="App">
            <PayPalScriptProvider options={initialOptions}>
                <PayPalButtons style={style} message={message} />
            </PayPalScriptProvider>
        </div>
    );
}
