import { useContext, useEffect, useState } from "react";
import React from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { add, remove } from "../Redux/Slices/cartSlice";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { AuthContext } from "../context/AuthContext";

function ProductCard({ product, addToCart, removeFromCart }) {
  const Denominations = product.valueDenominations.split(',');
  const [selectedValue, setSelectedValue] = useState(Denominations[0]);

  return (
    <div
      key={product.productId}
      className="card w-full bg-base-100 shadow-xl carousel-item transform transition duration-300 hover:scale-105 hover:shadow-md"
    >
      <Link to={`/product/${product.productId}`}>
        <figure>
          <img src={product.imageUrl} alt={product.name} />
        </figure>
      </Link>
      <div className="card-body">
        <h2 className="card-title">
          {product.name}
          <div className="badge badge-secondary">NEW</div>
        </h2>

        <p>
          Price:{' '}
          <select
            value={selectedValue}
            onChange={(e) => setSelectedValue(e.target.value)}
          >
            {Denominations.map((value, index) => (
              <option key={index} value={value}>
                {product.currencyCode} {value}
              </option>
            ))}
          </select>
        </p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={() => addToCart(product, selectedValue)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

const Accessories = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]); // Use state to store products

  useEffect(() => {
    // Function to fetch data from the API
    const fetchProducts = async () => {
      try {
        console.log('Fetching products...');
        const response = await axios.get('http://localhost:5002/api/users/get-data');
        console.log('Response from API:', response);

        // Debugging: Log the structure of the response
        console.log('Response data structure:', response.data);

        if (response.data && response.data.data && response.data.data.getVouchers && response.data.data.getVouchers.data) {
          console.log('Setting products:', response.data.data.getVouchers.data);
          setProducts(response.data.data.getVouchers.data); // Update state with fetched data
        } else {
          console.log('Unexpected response structure:', response.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts(); // Fetch data when component mounts
  }, []);

  useEffect(() => {
    console.log('Products state updated:', products);
  }, [products]);

  const addToCart = (product, price) => {
    if (user) {
      dispatch(add({ product, price }));
      enqueueSnackbar(`Item added to your cart successfully`, {
        variant: 'success',
        autoHideDuration: 3000,
      });
    } else {
      enqueueSnackbar(`Please sign up or log in to add items to your cart`, {
        variant: 'warning',
        autoHideDuration: 3000,
      });
    }
  };

  const removeFromCart = (product) => {
    dispatch(remove(product.productId));
    enqueueSnackbar(`Item removed from your cart!`, {
      variant: 'warning',
      autoHideDuration: 3000,
    });
  };

  return (
    <div className="p-4 md:p-8">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center w-full gap-4">
        {products.length === 0 ? (
          <p>No products available</p>
        ) : (
          products.map((product) => (
            <ProductCard
              key={product.productId}
              product={product}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Accessories;
