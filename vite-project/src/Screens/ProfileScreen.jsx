import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Avatar,List, ListItem, ListItemText } from '@mui/material'; // Import Avatar component from Material-UI
import { AuthContext } from '../context/AuthContext';

function ProfileScreen() {
  const location = useLocation();
  const { user: userInfo } = useContext(AuthContext);
  const [user, setUser] = useState();
  const [orders, setOrders] = useState([]);
  const authToken = userInfo.token || '';

  useEffect(() => {
    // Function to handle email verification
    const verifyEmail = async () => {
      try {
        const token = new URLSearchParams(location.search).get('token'); // Get token from query parameters
        if (token) {
          // If token exists, send request to backend to verify email
          await axios.post('http://localhost:5002/email-verification', { token });
          // Redirect to profile page after email verification
          window.location.href = '/profile';
        }
      } catch (error) {
        console.error('Error verifying email:', error);
      }
    };

    verifyEmail(); // Call verifyEmail function when component mounts
  }, [location.search]);

  // Destructure user information
  const { name: userName, email: userEmail } = userInfo;

  // Function to extract first two letters of a string
  const getInitials = (name) => {
    if (!name) return ''; // Check if name is undefined
    const words = name.split(' ');
    return words.length > 1 ? (words[0][0] + words[1][0]).toUpperCase() : words[0][0].toUpperCase();
  };

  // Function to generate background color based on user's name
  const getBackgroundColor = (name) => {
    if (!name) return '#000'; // Default color if name is undefined
    const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#ff9800', '#ff5722', '#795548', '#607d8b'];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  // Get first two letters of user's name
  const initials = getInitials(userName);

  // Get background color based on user's name
  const backgroundColor = getBackgroundColor(userName);


  useEffect(() => {
    // Fetch orders when component mounts
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/users/get-user-order', {
          headers: {
            Authorization: `Bearer ${authToken}` // Include the authorization token in the request headers
          },
          // params: {
          //   userId: userInfo._id // Pass the user's ID as a query parameter
          // }
        });
        console.log('+++++++',response.data)
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders(); // Call fetchOrders function when component mounts
  }, [authToken]);


  return (
    <div className="flex justify-center items-center h-screen bg-gray-100" >
      <div className="bg-white p-8 rounded-lg shadow-md text-center border border-gray-400 style={{ width: '90%' }}">
        <Avatar sx={{ width: 120, height: 120, fontSize: 56, backgroundColor: 'blue' }}>{userInfo.name[0]}</Avatar>
        <h2 className="text-4xl font-bold mt-6 mb-4 text-blue-700">{userInfo.name}</h2>
        <p className="text-lg text-gray-700">{userInfo.email}</p>
  
        <h3 className="text-2xl font-bold mt-8 mb-4 text-blue-700">Order History</h3>
        <div className="overflow-y-auto max-h-72">
          <List>
            {orders.map(order => (
              <ListItem key={order._id} className="mb-4 p-4 rounded-lg shadow-md border border-gray-300">
                <ListItemText
                  primary={`Order ID: ${order._id}`}
                  secondary={
                    <>
                      <div className="flex justify-between">
                        <div>
                          <p className="text-base font-semibold text-blue-700">Order Items:</p>
                          <ul className="list-disc pl-6">
                            {order.orderItems.map(item => (
                              <li key={item._id} className="text-sm text-gray-700">{item.name} - ${item.price}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-base font-semibold text-blue-700">Payment Method:</p>
                          <p className="text-sm text-gray-700">{order.paymentMethod}</p>
                        </div>
                        <div>
                          <p className="text-base font-semibold text-blue-700">Order Date:</p>
                          <p className="text-sm text-gray-700">{new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <p className="text-base mt-2 text-blue-700">Total Price: ${order.totalPrice}</p>
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