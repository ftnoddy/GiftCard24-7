import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';
import { Avatar, List, ListItem, ListItemText } from '@mui/material';
import { AuthContext } from '../context/AuthContext';

function ProfileScreen() {
  const location = useLocation();
  const { user: userInfo } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const authToken = userInfo.token || '';
  const { orderId } = useParams();
  // const userId = userInfo._id;  // Directly use userInfo._id

  useEffect(() => {
    // Function to handle email verification
    const verifyEmail = async () => {
      try {
        const token = new URLSearchParams(location.search).get('token'); // Get token from query parameters
        if (token) {
          await axios.post('http://localhost:5002/email-verification', { token });
          window.location.href = '/profile';
        }
      } catch (error) {
        console.error('Error verifying email:', error);
      }
    };

    verifyEmail(); // Call verifyEmail function when component mounts
  }, [location.search]);

  useEffect(() => {
    // Fetch user's order history when component mounts
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:5002/api/users/users/${orderId}/orders`, {
          headers: {
            Authorization: `Bearer ${authToken}`, // Include the authorization token in the request headers
          },
        });

        console.log('+++++++', response.data);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrderHistory(); // Call fetchOrderHistory function when component mounts
  }, [authToken, orderId]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center border border-gray-400" style={{ width: '90%' }}>
        <Avatar sx={{ width: 120, height: 120, fontSize: 56, backgroundColor: 'blue' }}>{userInfo.name[0]}</Avatar>
        <h2 className="text-4xl font-bold mt-6 mb-4 text-blue-700">{userInfo.name}</h2>
        <p className="text-lg text-gray-700">{userInfo.email}</p>

        <h3 className="text-2xl font-bold mt-8 mb-4 text-blue-700">Order History</h3>
        <div className="overflow-y-auto max-h-72">
          <List>
            {orders.map(order => (
              <ListItem key={order.orderId} className="mb-4 p-4 rounded-lg shadow-md border border-gray-300">
                <ListItemText
                  primary={`Order ID: ${order.orderId}`}
                  secondary={
                    <>
                      <div className="flex justify-between">
                        <div>
                          <p className="text-base font-semibold text-blue-700">Order Items:</p>
                          <ul className="list-disc pl-6">
                            {order.productDetails.map((item, index) => (
                              <li key={index} className="text-sm text-gray-700">{item.productName} - {item.currencyCode} {item.denomination}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-base font-semibold text-blue-700">Delivery Status:</p>
                          <p className="text-sm text-gray-700">{order.deliveryStatus}</p>
                        </div>
                      </div>
                      <p className="text-base mt-2 text-blue-700">Vouchers:</p>
                      <ul className="list-disc pl-6">
                        {order.vouchers.map((voucher, index) => (
                          <li key={index} className="text-sm text-gray-700">{voucher.type}: {voucher.voucherCode} (valid until {new Date(voucher.validity).toLocaleDateString()})</li>
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
