import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ProductElement = ({ id, title, image, price, brandName,quantity,error }) => {
  const product = {
    id, title, image, price, brandName,quantity, amount: 1,error
  };
  const formattedDecimal = price.toFixed(2);
  if (error){
    toast.error(`${title} product quantity is low`);
  }
  return (
    <div className="max-w-2xxl">
      <div className="shadow-md rounded-lg max-w-sm bg-base-100">
        <Link to={`/shop/product/${id}`} onClick={() => window.scrollTo(0, 0)}>
          <img
            className="rounded-t-lg p-8"
            src={`http://localhost:5139/images/${image}`}
            alt="product image"
            style={{ height: '300px', width: '300px' }}
          />
        </Link>
        <div className="px-5 pb-5">
          <Link to={`/shop/product/${id}`} onClick={() => window.scrollTo(0, 0)}>
            <h3 className="font-semibold text-xl tracking-tight mb-5 text-accent-content">
              {title}
            </h3>
          </Link>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-accent-content">${formattedDecimal}</span>
            <span className="text-3xl font-bold text-accent-content">{quantity} Pices</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductElement;
