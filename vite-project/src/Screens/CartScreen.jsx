import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CartitemScreen from "./CartitemScreen";
import { Link, useNavigate } from 'react-router-dom';

const CartScreen = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [itemNames, setItemNames] = useState([]);
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  

  const handleCheckout = () => {
    // Navigate to PaymentMethodScreen and pass totalAmount as state
    navigate('/payment-method', { state: { totalAmount } });
  };

  useEffect(() => {
    // Calculate total amount
    const total = cart.reduce((acc, curr) => {
      let floatCurr = parseFloat(curr.price)
      if(!isNaN(floatCurr)){
        return acc + (floatCurr)
      }
    }, 0);
    setTotalAmount(total);

    // Extract item names
    const names = cart.map((item) => item.product.name);
    setItemNames(names);
  }, [cart]);

  return (
    <>
      {cart.length > 0 ? (
        <>
          <div className="min-h-[80vh] grid md:grid-cols-2 max-w-6xl mx-auto">
            <div className="flex flex-col justify-center items-between p-2">
              {cart.map((item) => {
                return <CartitemScreen key={item.productId} item={item} />; // assuming productId is unique
              })}
            </div>
            <div>
              <div className="flex flex-col justify-center items-end p-5 space-y-5 mt-14">
                <h1 className="font-semibold text-lg text-purple-800">
                  Your Cart Summary
                </h1>
                <p>
                  <span className="text-gray-700 font-semibold">
                    Item Names
                  </span>{" "}
                  : {itemNames?.join(", ")}
                </p>

                <p>
                  <span className="text-gray-700 font-semibold">
                    Total Items
                  </span>{" "}
                  : {cart.length}
                </p>
                <p>
                  <span className="text-gray-700 font-semibold">
                    Total Amount
                  </span>{" "}
                  : ${totalAmount}
                </p>
                <button onClick={handleCheckout} className="bg-purple-700 hover:bg-purple-50 rounded-lg text-white transition duration-300 ease-linear mt-5 border-2 border-purple-600 font-bold hover:text-purple-700 p-3" >
                  Checkout Payment
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="min-h-[80vh] flex flex-col items-center justify-center">
            <h1 className="text-gray-700 font-semibold text-xl mb-2">
              Your cart is empty!
            </h1>
            <Link to={"/"}>
              <button className="bg-purple-700 hover:bg-purple-50 rounded-lg text-white transition duration-300 ease-linear mt-5 border-2 border-purple-600 font-bold hover:text-purple-700 p-3">
                SHOP NOW
              </button>
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default CartScreen;
