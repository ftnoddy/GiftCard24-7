import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Avatar, List, ListItem, ListItemText, IconButton, Button } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import { useSnackbar } from 'notistack';
import { ContentCopy as CopyIcon } from '@mui/icons-material';

function ProfileScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user: userInfo } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const authToken = userInfo.token || '';
  const userId = userInfo._id; // Directly use userInfo._id
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    // Function to handle email verification
    const verifyEmail = async () => {
      try {
        const token = new URLSearchParams(location.search).get('token'); // Get token from query parameters
        if (token) {
          await axios.post('https://giftcards247.shop/email-verification', { token });
          window.location.href = '/profile';
        }
      } catch (error) {
        console.error('Error verifying email:', error);
        enqueueSnackbar('Error verifying email', { variant: 'error' });
      }
    };

    verifyEmail(); // Call verifyEmail function when component mounts
  }, [location.search, enqueueSnackbar]);

  useEffect(() => {
    // Fetch user's order history when component mounts
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get(`https://giftcards247.shop/api/users/place-orders/${userId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`, // Include the authorization token in the request headers
          },
        });

        console.log('+++++++', response.data);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        enqueueSnackbar('Error fetching orders', { variant: 'error' });
      }
    };

    fetchOrderHistory(); // Call fetchOrderHistory function when component mounts
  }, [authToken, userId, enqueueSnackbar]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    enqueueSnackbar('Voucher code copied to clipboard!', { variant: 'success' });
  };

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg shadow-2xl rounded-3xl p-6 w-full max-w-2xl transform transition-all hover:scale-105">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-center">Profile</h2>
          <Button variant="contained" color="secondary" onClick={handleClose}>
            Close
          </Button>
        </div>
        <Avatar sx={{ width: 80, height: 80, fontSize: 32, backgroundColor: 'blue', margin: '0 auto' }}>
          {userInfo.name[0]}
        </Avatar>
        <h2 className="text-xl font-bold mt-4 mb-2 text-center text-blue-700">{userInfo.name}</h2>
        <p className="text-base text-center text-gray-700 mb-4">{userInfo.email}</p>

        <h3 className="text-lg font-bold mt-4 mb-4 text-center text-blue-700">Order History</h3>
        <div className="overflow-y-auto max-h-64 px-4">
          <List>
            {orders.map(order => (
              <ListItem key={order.orderId} className="mb-3 p-3 rounded-lg bg-gray-100 bg-opacity-30 shadow-md border border-gray-300 hover:bg-gray-200 hover:bg-opacity-40 transition-colors">
                <ListItemText
                  primary={<span className="text-base font-semibold text-blue-700">Order ID: {order.orderId}</span>}
                  secondary={
                    <>
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm font-semibold text-blue-700">Order Items:</p>
                          <ul className="list-disc pl-6">
                            {order.productDetails.map((item, index) => (
                              <li key={index} className="text-xs text-gray-700">{item.productName} - {item.currencyCode} {item.denomination}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-blue-700">Delivery Status:</p>
                          <p className="text-xs text-gray-700">{order.deliveryStatus}</p>
                        </div>
                      </div>
                      <p className="text-sm mt-2 text-blue-700">Vouchers:</p>
                      <ul className="list-disc pl-6">
                        {order.vouchers.map((voucher, index) => (
                          <li key={index} className="text-xs text-gray-700 flex items-center">
                            {voucher.type}: <span className="font-semibold text-blue-700 ml-1">{voucher.voucherCode}</span> (valid until {new Date(voucher.validity).toLocaleDateString()})
                            <IconButton size="small" onClick={() => handleCopy(voucher.voucherCode)} className="ml-2">
                              <CopyIcon fontSize="small" />
                            </IconButton>
                          </li>
                        ))}
                      </ul>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
