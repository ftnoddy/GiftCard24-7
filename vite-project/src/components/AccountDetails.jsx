// src/AccountDetails.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const AccountDetails = () => {
    const [visible, setVisible] = useState(true);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const accountDetails = {
        accountHolderName: "Iwebgenics Private Limited",
        accountNumber: "8335166144",
        achRoutingNumber: "026073150",
        fedwireRoutingNumber: "026073008",
        accountType: "Business checking account",
        bankName: "Community Federal Savings Bank",
        paymentMethod: "ACH or Fedwire",
        currency: "USD Only",
        bankAddress: "810 Seventh Avenue, New York, NY 10019, US"
    };

    const copyToClipboard = () => {
        const details = `
            Account Holder Name: ${accountDetails.accountHolderName}
            Account Number: ${accountDetails.accountNumber}
            ACH Routing Number: ${accountDetails.achRoutingNumber}
            Fedwire Routing Number: ${accountDetails.fedwireRoutingNumber}
            Account Type: ${accountDetails.accountType}
            Bank Name: ${accountDetails.bankName}
            Payment Method: ${accountDetails.paymentMethod}
            Currency: ${accountDetails.currency}
            Bank Address: ${accountDetails.bankAddress}
        `;
        navigator.clipboard.writeText(details).then(() => {
            enqueueSnackbar('Account details copied to clipboard', { variant: 'success' });
        }).catch(err => {
            console.error('Failed to copy: ', err);
            enqueueSnackbar('Failed to copy account details', { variant: 'error' });
        });
    };

    const handleClose = () => {
        setVisible(false);
        navigate('/');
    };

    if (!visible) {
        return null;
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg shadow-2xl rounded-3xl p-8 w-full max-w-4xl transform transition-all hover:scale-105">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-center">Account Details</h2>
                    <button
                        onClick={handleClose}
                        className="bg-red-500 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
                    >
                        X
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(accountDetails).map(([key, value]) => (
                        <div key={key} className="border p-4 rounded-xl bg-gray-100 bg-opacity-30 shadow-md hover:bg-gray-200 hover:bg-opacity-40 transition-colors">
                            <h3 className="text-xs text-gray-500">{key.split(/(?=[A-Z])/).join(" ")}</h3>
                            <p className="text-base font-medium text-gray-700">{value}</p>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-8">
                    <button
                        onClick={copyToClipboard}
                        className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-800 transition-colors"
                    >
                        Copy account details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AccountDetails;
