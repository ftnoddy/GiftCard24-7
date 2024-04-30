import React from "react";
import { Delete } from "@mui/icons-material";
import { remove } from "../Redux/Slices/cartSlice";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";

const CartitemScreen = ({ item }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const removeItemFromCart = () => {
    dispatch(remove(item.productId)); // Assuming productId is used as the unique identifier for items in the cart
    enqueueSnackbar(`Item removed from your cart!`, {
      variant: "warning",
      autoHideDuration: 3000,
    });
  };

  return (
    <div className="flex items-center p-5 justify-between bg-violet-200 mt-2 mb-2 rounded-xl">
      <div className="flex p-3">
        {/* Check if item exists before accessing its properties */}
        {item && (
          <>
            {/* Display item image */}
            <img src={item.imageUrl} className="h-28 rounded-lg" alt={item.name} />
            <div className="ml-10 self-start space-y-5">
              {/* Display item title */}
              <h1 className="text-xl text-purple-700 font-semibold">
                {item.name}
              </h1>
              {/* Display item price */}
              <p>{item.currencyCode} {item.valueDenominations.split(',')[0]}</p> {/* Assuming valueDenominations contains comma-separated values */}
            </div>
          </>
        )}
      </div>
      <div
        onClick={removeItemFromCart}
        className="bg-purple-300 hover:bg-purple-400 transition-transform duration-300 cursor-pointer rounded-full p-3 mr-3"
      >
        <Delete className="text-gray-800" />
      </div>
    </div>
  );
};

export default CartitemScreen;
