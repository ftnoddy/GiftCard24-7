import {useContext} from "react";
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import products from "../Array/ProductsArray";
import { add, remove } from "../Redux/Slices/cartSlice";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { AuthContext } from "../context/AuthContext";


 function ProductCard({product,addToCart,removeFromCart}) {
  const [selectedValue, setSelectedValue] = useState(''); 
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
          {product.valueDenominations.split(',').map((value, index) => (
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
  )
}


const Accessories = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
   // Default value

  const { user } = useContext(AuthContext);

  const addToCart = (product,price) => {
    if (user) {
      dispatch(add({product,price}));
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
    <>
      <div className="p-4 md:p-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center w-full gap-4">
          {products.map((product) => (
          <ProductCard 
            key={product.id}
            product={product}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
          ))}
        </div>
      </div>
    </>
  );
};

export default Accessories;