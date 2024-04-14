import React from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../components/Layouts/MainLayout";
import products from "../Array/ProductsArray";

const SignleProductScreen = () => {
  // Get the product ID from the URL parameters
  const { id } = useParams();

  // Find the product with the matching ID
  const product = products.find((product) => product.id === parseInt(id));

  // If the product is not found, display a message
  if (!product) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold">Product not found</h1>
        </div>
      </MainLayout>
    );
  }

  // Render the product details within a card-like layout
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-lg mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
          <img src={product.image} alt={product.name} className="w-full" />
          <div className="p-4">
            <h1 className="text-xl font-semibold mb-2">{product.name}</h1>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-lg font-semibold text-gray-800">Price: ${product.price}</p>
            <p className="text-lg font-semibold text-gray-800">Rating: {product.rating}</p>
            <p className="text-lg font-semibold text-gray-800">Brand: {product.brand}</p>
            <p className="text-lg font-semibold text-gray-800">Category: {product.category}</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SignleProductScreen;
