import { Delete } from "@mui/icons-material";
import { remove } from "../Redux/Slices/cartSlice";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";

const CartitemScreen = ({ item }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const removeItemFromCart = () => {
    dispatch(remove(item.product.productId)); // Assuming productId is used as the unique identifier for items in the cart
    enqueueSnackbar(`Item removed from your cart!`, {
      variant: "warning",
      autoHideDuration: 3000,
    });
  };

  return (
    <div className="p-5 justify-between bg-violet-200 mt-2 mb-2 rounded-xl">
      <div className="">
        {/* Check if item exists before accessing its properties */}
        {item && item.product && (
          <div>
            {/* Display item image */}
            <img
              src={item.product.imageUrl}
              className="w-full rounded-lg"
              alt={item.product.name}
            />
            <div className=" mt-2 ">
              {/* Display item title */}
              <h1 className="text-sm lg:text-base text-purple-700 font-semibold">
                {item.product.name}
              </h1>
              {/* Display item price */}
              <p className="text-sm">
                {item.product.currencyCode} {item.price}
              </p>{" "}
              {/* Assuming valueDenominations contains comma-separated values */}
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-end">
        <div
          onClick={removeItemFromCart}
          className="bg-purple-300 w-fit hover:bg-purple-400 transition-transform duration-300 cursor-pointer rounded-full p-3 mr-3"
        >
          <Delete className="text-gray-800" />
        </div>
      </div>
    </div>
  );
};

export default CartitemScreen;
