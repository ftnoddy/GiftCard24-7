import React from "react";
import { Link } from "react-router-dom";
import products from "../Array/ProductsArray";
import { add, remove } from "../Redux/Slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";

const Accessories = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const addToCart = (product) => {
    dispatch(add(product));
    enqueueSnackbar(`Item added to your cart successfully`, {
      variant: "success",
      autoHideDuration: 3000,
    });
  };

  const removeFromCart = (product) => {
    dispatch(remove(product.id));
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
            <div key={product.id} className="card w-full bg-base-100 shadow-xl carousel-item transform transition duration-300 hover:scale-105 hover:shadow-md">
              <Link to={`/product/${product.id}`}>
                <figure>
                  <img src={product.image} alt={product.name} />
                </figure>
              </Link>
              <div className="card-body">
                <h2 className="card-title">
                  {product.name}
                  <div className="badge badge-secondary">NEW</div>
                </h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="flex justify-between items-center mb-4">
                  <div className="text-sm font-medium">{product.name}</div>
                  <div className="text-lg font-semibold">${product.price}</div>
                </div>
                <div className="card-actions justify-end">
                  {cart.some((p) => p.id === product.id) ? (
                    <button className="btn btn-primary" onClick={() => removeFromCart(product)}>Remove from Cart</button>
                  ) : (
                    <button className="btn btn-primary" onClick={() => addToCart(product)}>Add to Cart</button>
                  )}
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
