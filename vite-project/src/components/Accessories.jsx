import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { AuthContext } from "../context/AuthContext";
import { add, remove } from "../Redux/Slices/cartSlice";
import Navbar from "./Navbar";
import FilterComponent from "./FilterProducts";

function ProductCard({ product, addToCart, removeFromCart }) {
  const Denominations = product.valueDenominations.split(',');
  const [selectedValue, setSelectedValue] = useState(Denominations[0]);

  return (
    <div
      key={product.productId}
      className="card w-full bg-base-100 shadow-xl carousel-item transform transition duration-300 hover:scale-105 hover:shadow-md mt-16"
    >
      <Link to={`/product/${product.productId}`}>
        <figure>
          <img src={product.imageUrl} alt={product.name} />
        </figure>
      </Link>
      <div className="card-body">
        <h2 className="flex">
          {product.name}
          <div className=" bg-gradient-to-tr to-orange-600 from-yellow-400 px-2 text-white rounded-full text-xs flex justify-center items-center ml-2">NEW</div>
        </h2>
        <p className="text-sm">
          Price:{' '}
          <select
            value={selectedValue}
            onChange={(e) => setSelectedValue(e.target.value)}
          >
            {Denominations.map((value, index) => (
              <option key={index} value={value}>
                {product.currency} {value}
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
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState({})

  const fetchProducts = async (filters, page) => {
    setLoading(true);
    try {
      const response = await axios.get('https://giftcards247.shop/api/users/get-vouchers', {
        params: {
          query: searchQuery,
          country: filters.country,
          currencyCode: filters.currencyCode,
          price: filters.price,
          page,
          limit: 20,  // Adjust limit as needed
        },
      });

      const fetchedProducts = Array.isArray(response.data.data.getVouchers.data)
        ? response.data.data.getVouchers.data
        : [];

      if (page === 1) {
        setProducts(fetchedProducts);
      } else {
        setProducts(prevProducts => [...prevProducts, ...fetchedProducts]);
      }

      setHasMore(fetchedProducts.length > 0);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    setPage(1);
    fetchProducts(filters, 1);
  }, [searchQuery, filters]);

  useEffect(() => {
    if (page > 1) {
      fetchProducts(filters, page);
    }
  }, [page]);

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

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight || loading) return;
    if (hasMore) setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar onSearch={setSearchQuery} />
      <div className="pt-20 pb-4 px-4 md:px-8">
        <div className="mb-5">
          <FilterComponent onApplyFilters={setFilters} />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center w-full gap-4">
          {filteredProducts.length === 0 ? (
            <p>No products available</p>
          ) : (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.productId}
                product={product}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
              />
            ))
          )}
        </div>
        {loading && <p>Loading more products...</p>}
        {!hasMore && <p>No more products to load.</p>}
      </div>
    </>
  );
};

export default Accessories;
