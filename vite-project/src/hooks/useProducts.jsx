import React, { useState, useEffect } from 'react';
import axios from 'axios';

function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('your_api_endpoint_here');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchProducts();

    // Cleanup function
    return () => {
      // Any cleanup code if needed
    };
  }, []); // Empty dependency array to run effect only once when component mounts

  return { products, loading, error };
}

export default useProducts;
