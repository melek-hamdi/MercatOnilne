import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  QuantityInput,
  SectionTitle,
  SelectSize,
  SingleProductRating,
  SingleProductReviews,
} from "../components";
import { FaHeart } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import {
  updateWishlist,
  removeFromWishlist,
} from "../features/wishlist/wishlistSlice";
import { toast } from "react-toastify";
import { store } from "../store";

const SingleProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(0);
  const { productId } = useParams();
  const user = useSelector((state) => state.auth.userId);
  const userConnected = JSON.parse(user)?.role
  console.log("aaaaaaaaaaaaaaaaa",userConnected)
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const [rating, setRating] = useState([
    "empty star",
    "empty star",
    "empty star",
    "empty star",
    "empty star",
  ]);
  console.log("quantityquantity",quantity)
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`http://localhost:5139/api/Product/GetProductById/${productId}`);
        setProductData(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProductData();
  }, [productId]);
console.log(productData)
  const product = {
    id: productData?.id ,
    title: productData?.name,
    image: productData?.imageUrl,
    price: productData?.price,
    brandName: productData?.brand,
    productQuantity:productData?.quantity,
    stock:productData?.stock,
    amount: quantity ,
    selectedSize: size || 4,
  };
 

  for (let i = 0; i < productData?.rating; i++) {
    rating[i] = "full star";
  }

  const addToWishlistHandler = async (product) => {
    try {
      const getResponse = await axios.get(
        `http://localhost:8080/user/${localStorage.getItem("id")}`
      );
      const userObj = getResponse.data;

      userObj.userWishlist = userObj.userWishlist || [];

      userObj.userWishlist.push(product);

      const postResponse = await axios.put(
        `http://localhost:8080/user/${localStorage.getItem("id")}`,
        userObj
      );

      store.dispatch(updateWishlist({ userObj }));
      toast.success("Product added to the wishlist!");
    } catch (error) {
      console.error(error);
    }
  };

  const removeFromWishlistHandler = async (product) => {
    const getResponse = await axios.get(
      `http://localhost:8080/user/${localStorage.getItem("id")}`
    );
    const userObj = getResponse.data;

    userObj.userWishlist = userObj.userWishlist || [];

    const newWishlist = userObj.userWishlist.filter(
      (item) => product.id !== item.id
    );

    userObj.userWishlist = newWishlist;

    const postResponse = await axios.put(
      `http://localhost:8080/user/${localStorage.getItem("id")}`,
      userObj
    );

    store.dispatch(removeFromWishlist({ userObj }));
    toast.success("Product removed from the wishlist!");
  };

  return (
    <>
      {productData && (
        <>
          <SectionTitle title="Product page" path="Home | Shop | Product page" />
          <div className="grid grid-cols-2 max-w-7xl mx-auto mt-5 max-lg:grid-cols-1 max-lg:mx-5">
            <div className="product-images flex flex-col justify-center max-lg:justify-start">
              <img
                src={`http://localhost:5139/images/${productData.imageUrl}`}
                className="w-96 text-center border border-gray-600 cursor-pointer"
                alt={productData.name}
             
                />
             
              </div>
              <div className="single-product-content flex flex-col gap-y-5 max-lg:mt-2">
                <h2 className="text-5xl max-sm:text-3xl text-accent-content">
                  {productData?.name}
                </h2>
                <p className="text-3xl text-error">
                  ${productData?.price}
                </p>
                <div className="text-xl max-sm:text-lg text-accent-content">
                  {productData?.brandName}
                </div>
                <div>
                  <label htmlFor="Quantity" className="sr-only">
                    {" "}
                    Quantity{" "}
                  </label>
                  <div className="flex items-center gap-1">
                    <QuantityInput quantity={quantity} setQuantity={setQuantity} max={productData?.quantity} />
                  </div>
                </div>
               
                <div className="flex flex-row gap-x-2 max-sm:flex-col max-sm:gap-x">
                  <button
                    className="btn bg-blue-600 hover:bg-blue-500 text-white"
                    onClick={() => {
                      if (loginState) {
                        dispatch(addToCart(product));
                      } else {
                        toast.error(
                          "You must be logged in to add products to the cart"
                        );
                      }
                    }}
                  >
                    <FaCartShopping className="text-xl mr-1" />
                    Add to cart
                  </button>
                </div>
                <div className="other-product-info flex flex-col gap-x-2">
                  <div className="badge bg-gray-700 badge-lg font-bold text-white p-5 mt-2">
                    Brand: {productData?.brand}
                  </div>
                  
                  <div
                    className={
                      productData?.isInStock
                        ? "badge bg-gray-700 badge-lg font-bold text-white p-5 mt-2"
                        : "badge bg-gray-700 badge-lg font-bold text-white p-5 mt-2"
                    }
                  >
                    In Stock: {productData?.stock ? "Yes" : "No"}
                  </div>
                </div>
              </div>
            </div>
  
          
          </>
        )}
      </>
    );
  };
  
  export default SingleProduct;
  