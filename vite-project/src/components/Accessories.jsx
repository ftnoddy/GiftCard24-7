import React from "react";
import { Link } from "react-router-dom";
import products from "../Array/ProductsArray";
import { add, remove } from "../Redux/Slices/cartSlice";
import { setCredentials } from "../Redux/Slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";


const Accessories = () => {
  const cart = useSelector((state) => state.cart);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Assuming you have a slice for authentication status

  const addToCart = (product) => {
    if (isAuthenticated) {
      dispatch(add(product));
      enqueueSnackbar(`Item added to your cart successfully`, {
        variant: "success",
        autoHideDuration: 3000,
      });
    } else {
      enqueueSnackbar(`Please sign up or log in to add items to your cart`, {
        variant: "warning",
        autoHideDuration: 3000,
      });
    }
  };

  const removeFromCart = (product) => {
    dispatch(remove(product.productId));
    enqueueSnackbar(`Item removed from your cart!`, {
      variant: "warning",
      autoHideDuration: 3000,
    });
  };

  return (
    <>
      <div className="p-4 md:p-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center w-full gap-4">
          {products.map((product) => (
            <div key={product.productId} className="card w-full bg-base-100 shadow-xl carousel-item transform transition duration-300 hover:scale-105 hover:shadow-md">
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
                
                <p>Price: {product.currencyCode} {product.valueDenominations.split(',')[0]}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary" onClick={() => addToCart(product)}>Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </>
  );
};

export default Accessories;
