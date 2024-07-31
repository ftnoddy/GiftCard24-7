import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('https://giftcards247.shop/api/users/get-all-orders');
        setOrders(response.data);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="text-center text-xl">Loading orders...</p>;
  if (error) return <p className="text-center text-xl text-red-500">Error fetching orders: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">All Orders</h1>
      <p className="text-lg mb-8 text-center">Total Orders: {orders.length}</p>
      {orders.length === 0 ? (
        <p className="text-center text-lg">No orders available</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {orders.map(order => (
            <div key={order._id} className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
              <h2 className="text-2xl font-semibold mb-2">Order ID: {order.orderId}</h2>
              {order.userId ? (
                <p className="text-lg">User: {order.userId.name} <span className="text-gray-500">({order.userId.email})</span></p>
              ) : (
                <p className="text-lg">User: <span className="text-gray-500">Unknown</span></p>
              )}
              <p className="text-lg">Order Total: <span className="font-medium">{order.orderTotal} {order.currencyCode}</span></p>
              <p className="text-lg">Amount Charged: <span className="font-medium">{order.amountCharged} {order.currencyCode}</span></p>
              <p className="text-lg">Order Status: <span className={`font-medium ${order.orderStatus === 'complete' ? 'text-green-500' : 'text-red-500'}`}>{order.orderStatus}</span></p>
              <p className="text-lg">Delivery Status: <span className={`font-medium ${order.deliveryStatus === 'delivered' ? 'text-green-500' : 'text-red-500'}`}>{order.deliveryStatus}</span></p>
              <p className="text-lg mb-4">Quantity: <span className="font-medium">{order.quantity}</span></p>
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">Vouchers:</h3>
                {order.vouchers.map((voucher, index) => (
                  <div key={index} className="ml-4 mb-2 bg-gray-100 p-2 rounded">
                    <p>Product ID: {voucher.productId}</p>
                    <p>Voucher Code: {voucher.voucherCode}</p>
                    <p>Amount: {voucher.amount} {voucher.currency}</p>
                    <p>Validity: {new Date(voucher.validity).toLocaleDateString()}</p>
                    <p>Country: {voucher.country}</p>
                    <p>Type: {voucher.type}</p>
                  </div>
                ))}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Voucher Details:</h3>
                {order.voucherDetails.map((detail, index) => (
                  <div key={index} className="ml-4 mb-2 bg-gray-100 p-2 rounded">
                    <p>Product Name: {detail.productName}</p>
                    <p>Denomination: {detail.denomination} {detail.currencyCode}</p>
                    <p>Status: {detail.productStatus}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllOrders;
