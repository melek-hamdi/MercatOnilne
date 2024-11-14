import React, { useEffect, useState } from 'react'
import { CartItemsList, CartTotals, SectionTitle } from '../components'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';

const Cart = () => {
  
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.userId);
  const connectedUser= JSON.parse(user)
  const { cartItems } = useSelector((state) => state.cart);
  console.log("hhhhhhhhhey",cartItems,connectedUser.id)
  const addProduct = (newProduct) => {
    setProducts(prevProducts => [...prevProducts, newProduct]);
  };
  const getProductsIds =()=>{
    cartItems.forEach(element => {
      addProduct(element.id)
    });
  }
  useEffect(() => {
    getProductsIds()
  }, [cartItems])
  const newProduct = async () => {
    for (const prod of cartItems) {
      console.log(prod)
      await updateProduct(prod.id, prod, prod.amount);
    }
  };
  const updateProduct =async (id,product,amount)=>{
    console.log("barcha",id,product,amount,product.productQuantity)
    const check = (product.productQuantity - amount) <= 0;

    let updatedProduct = { 
      name: product.title, 
      id: product.id, 
      imageUrl: product.image, 
      price: product.price, 
      quantity: check ? 0 : product.productQuantity - amount,
      brand: product.brandName,
      stock: !check  // Assign true if check is false, and false if check is true
    };
    console.log("finalprod",updatedProduct)
    try {
      const {data} = await axios.put(`http://localhost:5139/api/Product/${id}`,updatedProduct);
      console.log("=============",data)
    } catch (error) {
      console.error('error:', error.message);
      throw error;
    }
  }
  const purchaseProducts = async () => {
    try {
      const {data} = await axios.post('http://localhost:5139/api/User/PurchaseProducts',{
        "userId": connectedUser.id,
        "productIds": products,
      });
      // Check if the response is successful
      console.log("=============",data)
      
      // Return the user data
  } catch (error) {
      // Handle errors, such as network errors or failed login attempts
      console.error('error:', error.message);
      throw error;
  }
}
  const isCartEmpty = () => {
    if(cartItems.length === 0){
      toast.error("Your cart is empty");
    }else{
      purchaseProducts()
      newProduct()
      navigate("/thank-you");
    }
  }

  return (
    <>
    <SectionTitle title="Cart" path="Home | Cart" />
    <div className='mt-8 grid gap-8 lg:grid-cols-12 max-w-7xl mx-auto px-10'>
        <div className='lg:col-span-8'>
          <CartItemsList />
        </div>
        <div className='lg:col-span-4 lg:pl-4'>
          <CartTotals />
          {loginState ? (
            <button onClick={isCartEmpty} className='btn bg-blue-600 hover:bg-blue-500 text-white btn-block mt-8'>
              order now
            </button>
          ) : (
            <Link to='/login' className='btn bg-blue-600 hover:bg-blue-500 btn-block text-white mt-8'>
              please login
            </Link>
          )}
        </div>
      </div>
    </>
  )
}

export default Cart