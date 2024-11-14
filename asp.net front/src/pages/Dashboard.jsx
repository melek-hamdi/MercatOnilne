import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ProductElement, SectionTitle } from '../components';
  
  const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    useEffect(() => {
      getUers()
      getProduct()
    }, [])
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
  const getUers = async () => {
      try {
        const {data} = await axios.get('http://localhost:5139/api/User');
        // Check if the response is successful
        console.log("=============",data)
        setUsers(data)
        // Return the user data
    } catch (error) {
        // Handle errors, such as network errors or failed login attempts
        console.error('error:', error.message);
        throw error;
    }
    }
    const handleDate =(time)=>{
        const date = new Date(time);
        const hour = date.getHours();
        const minute = date.getMinutes();
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-based, so add 1
        const year = date.getFullYear();

        const formattedDate = `${hour}:${minute} on ${day}/${month}/${year}`;
        return formattedDate
    }
    return (
      <div className="container mx-auto p-4">
        <SectionTitle title="Dashboard" path="" />
        <h1 className="text-2xl font-bold mb-4">Users</h1>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">CreatedAt</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td className="border px-4 py-2">{user.id}</td>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">{user.role}</td>
                  <td className="border px-4 py-2">{handleDate(user.dateCreated)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h1 className="text-2xl font-bold mb-4">Products</h1>
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
                error={product.quantity<5 ??true}
              />
            ))}
        </div>
      </div>
    );
  };
  
  export default Dashboard;