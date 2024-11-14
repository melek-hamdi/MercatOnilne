import React, { useEffect, useState } from "react";
import "../styles/Landing.css";
import { Hero, ProductElement, Stats } from "../components";
import { useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";

export const landingLoader = async () => {
  const response = await axios(
    `http://localhost:8080/products?_page=1&_limit=8`
  );
  const data = response.data;

  return { products: data };
};

const Landing = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProduct()
  }, [])
  const navigate = useNavigate();
  const getProduct = async () => {
    try {
      const {data} = await axios.get('http://localhost:5139/api/Product');
      // Check if the response is successful
      console.log("=============",data)
      setProducts(data)
      // Return the user data
  } catch (error) {
      // Handle errors, such as network errors or failed login attempts
      console.error('error:', error.message);
      throw error;
  }
  }
  return (
    <main>
      <Hero />
      <Stats />

      <div className="selected-products">
        <h2 className="text-6xl text-center my-12 max-md:text-4xl text-accent-content">
          Trending Products
        </h2>
        <div className="selected-products-grid max-w-7xl mx-auto">
        {products?.map((product) => (
              <ProductElement
                key={product.id}
                id={product.id}
                title={product.name}
                image={product.imageUrl}
                price={product.price}
                brandName={product.brand}
                quantity={product.quantity}
                
              />
            ))}
        </div>
      </div>
    </main>
  );
};

export default Landing;
