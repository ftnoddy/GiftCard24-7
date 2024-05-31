// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
// import ModalLayout from "../components/Layouts/ModalLayout";

// const PaymentMethodScreen = () => {
//   const location = useLocation();
//   const totalAmount = location.state.totalAmount;

//   // State to store payment method selection
//   const [paymentMethod, setPaymentMethod] = useState("creditCard");

//   // State to store card details
//   const [cardDetails, setCardDetails] = useState({
//     cardNumber: "",
//     expiryDate: "",
//     cvv: "",
//   });

//   // Handle input changes for card details
//   const handleCardInputChange = (e) => {
//     const { name, value } = e.target;
//     setCardDetails({ ...cardDetails, [name]: value });
//   };

//   // Handle payment method selection
//   const handlePaymentMethodChange = (method) => {
//     setPaymentMethod(method);
//   };

//   // Function to handle payment submission
//   const handlePaymentSubmit = () => {
//     // Implement payment submission logic here
//     console.log("Payment submitted:", cardDetails);
//   };

//   return (
//     <ModalLayout>
//     <div className="container mx-auto px-4 py-8 flex justify-center items-center h-full">
//       <div className="max-w-md w-full bg-white shadow-md rounded-lg px-6 py-8">
//         <h1 className="text-2xl font-bold mb-4">Payment Method</h1>
//         <div className="mb-4">
//           <p className="text-gray-700 font-semibold">Total Amount:</p>
//           <p className="text-lg">${totalAmount}</p>
//         </div>
//         <div className="mb-4">
//           <p className="text-gray-700 font-semibold">Select Payment Method:</p>
//           <div className="flex items-center space-x-4">
//             <label htmlFor="creditCard" className="cursor-pointer">
//               <input
//                 type="radio"
//                 id="creditCard"
//                 name="paymentMethod"
//                 value="creditCard"
//                 checked={paymentMethod === "creditCard"}
//                 onChange={() => handlePaymentMethodChange("creditCard")}
//                 className="mr-2"
//               />
//               Credit Card
//             </label>
//             <label htmlFor="debitCard" className="cursor-pointer">
//               <input
//                 type="radio"
//                 id="debitCard"
//                 name="paymentMethod"
//                 value="debitCard"
//                 checked={paymentMethod === "debitCard"}
//                 onChange={() => handlePaymentMethodChange("debitCard")}
//                 className="mr-2"
//               />
//               Debit Card
//             </label>
//           </div>
//         </div>
//         {paymentMethod && (
//           <>
//             <div className="mb-4">
//               <label htmlFor="cardNumber" className="block text-gray-700 font-semibold mb-2">
//                 Card Number:
//               </label>
//               <input
//                 type="text"
//                 id="cardNumber"
//                 name="cardNumber"
//                 value={cardDetails.cardNumber}
//                 onChange={handleCardInputChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
//               />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="expiryDate" className="block text-gray-700 font-semibold mb-2">
//                 Expiry Date (MM/YY):
//               </label>
//               <input
//                 type="text"
//                 id="expiryDate"
//                 name="expiryDate"
//                 value={cardDetails.expiryDate}
//                 onChange={handleCardInputChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
//               />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="cvv" className="block text-gray-700 font-semibold mb-2">
//                 CVV:
//               </label>
//               <input
//                 type="text"
//                 id="cvv"
//                 name="cvv"
//                 value={cardDetails.cvv}
//                 onChange={handleCardInputChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
//               />
//             </div>
//           </>
//         )}
//         <button
//           onClick={handlePaymentSubmit}
//           className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 w-full"
//         >
//           Pay Now
//         </button>
//       </div>
//     </div>
//     </ModalLayout>
//   );
// };

// export default PaymentMethodScreen;
