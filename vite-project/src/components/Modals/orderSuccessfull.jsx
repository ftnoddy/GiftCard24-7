import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ModalLayout from "../Layouts/ModalLayout";
import { motion } from 'framer-motion'; // for animation

function OrderSuccessfull() {
  return (
    <ModalLayout>
      <motion.div
        className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-lg"
        initial={{ scale: 0 }}
        animate={{ rotate: 360, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <CheckCircleIcon className="text-green-500" style={{ fontSize: 60 }} />
        <h2 className="mt-4 text-xl font-bold text-gray-800">Order Successful!</h2>
        <p className="mt-2 text-gray-600">Thank you for your purchase.</p>
      </motion.div>
    </ModalLayout>
  );
}

export default OrderSuccessfull;
