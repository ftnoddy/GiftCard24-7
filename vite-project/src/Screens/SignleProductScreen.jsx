import React from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../components/Layouts/MainLayout";
import products from "../Array/ProductsArray";

const SignleProductScreen = () => {
  const { id } = useParams();

  const product = products.find(
    (product) => product.productId === parseInt(id)
  );


  // useEffect(() => {
  //   const handleProducts = async () => {
  //     try {
  //       const product = products.find(
  //         (product) => product.productId === parseInt(id)
  //       );
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   handleProducts();
  // }, []);

  if (!product) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold">Product not found</h1>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 grid grid-cols-2 gap-8 mt-16">
        {/* Product Details */}
        <div>
          <div className="max-w-lg bg-white rounded-lg overflow-hidden shadow-lg">
            <img src={product.imageUrl} alt={product.name} className="w-full" />
            <div className="p-4">
              <h1 className="text-xl font-semibold mb-2">{product.name}</h1>
              <p className="text-gray-700 mb-4">{product.description}</p>
              <p className="text-lg font-semibold text-gray-800">
                Price: ${product.valueDenominations}
              </p>
              <p className="text-lg font-semibold text-gray-800">
                Country: {product.countryName}
              </p>
              <p className="text-lg font-semibold text-gray-800">
                Categories: {product.categories}
              </p>
              <p className="text-lg font-semibold text-gray-800">
                Validity: {product.expiryAndValidity}
              </p>
            </div>
          </div>
        </div>
        {/* Redemption Instructions */}
        <div>
          <div className="max-w-lg bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Redemption Instructions:
              </h2>
              {/* Render HTML content using dangerouslySetInnerHTML */}
              <div
                dangerouslySetInnerHTML={{
                  __html: product.redemptionInstructions,
                }}
              />

              <h2 className="text-lg font-semibold text-gray-800 mt-6">
                Terms & Conditions Instructions:
              </h2>
              <div
                className="text-sm mt-1"
                dangerouslySetInnerHTML={{
                  __html: product.termsAndConditionsInstructions,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SignleProductScreen;
