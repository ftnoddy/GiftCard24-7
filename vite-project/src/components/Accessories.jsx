import React from "react";
import { Link } from "react-router-dom";
import products from "../Array/ProductsArray";

const Accessories = () => (
  <>
    <div className="p-4 md:p-8">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center w-full gap-4">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="card w-full bg-base-100 shadow-xl carousel-item transform transition duration-300 hover:scale-105 hover:shadow-md"
          >
            <figure>
              <img src={product.image} alt={product.name} />
            </figure>
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
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </>
);

export default Accessories;
