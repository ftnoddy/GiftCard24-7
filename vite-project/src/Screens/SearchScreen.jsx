import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const SearchVouchers = () => {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  const query = new URLSearchParams(location.search).get('query') || '';

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5002/api/users/get-data', {
          params: { query }
        });

        if (response.data && response.data.data && response.data.data.getVouchers && response.data.data.getVouchers.data) {
          setVouchers(response.data.data.getVouchers.data);
        } else {
          setVouchers([]);
        }
      } catch (error) {
        console.error('Failed to fetch vouchers:', error);
        setError('Failed to fetch vouchers');
      } finally {
        setLoading(false);
      }
    };

    fetchVouchers();
  }, [query]);

  return (
    <div className="accessories-page">
      <h1>Vouchers</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && vouchers.length === 0 && <p>No vouchers found.</p>}
      <div className="voucher-list">
        {vouchers.map((voucher) => (
          <div key={voucher.productId} className="voucher-item">
            <h2>{voucher.productName}</h2>
            <p>Currency: {voucher.currencyCode}</p>
            <p>Denomination: {voucher.denomination}</p>
            <p>Type: {voucher.type}</p>
            <p>Validity: {new Date(voucher.validity).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchVouchers;
