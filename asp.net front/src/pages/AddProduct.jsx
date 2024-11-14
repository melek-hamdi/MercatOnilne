import React, { useEffect, useState } from "react";
import { SectionTitle } from "../components";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [userFormData, setUserFormData] = useState({
    name: "",
    brand: "",
    stock: true,
    price: 0,
    quantity: 0,
    imageUrl: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedFile) {
      uploadPic();
    }
  }, [selectedFile]);

  const addProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5139/api/Product', userFormData);
      if (response.data) {
        toast.success("Product added successfully");
        navigate("/");
      } else {
        toast.warn("Error adding product");
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const uploadPic = async () => {
    const formData = new FormData();
    formData.append('imageFile', selectedFile);
    try {
      const response = await axios.post('http://localhost:5139/api/Product/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data) {
        setUserFormData({ ...userFormData, imageUrl: response.data });
      } else {
        toast.warn("Error uploading image");
      }
    } catch (error) {
      console.log(error.response);
      toast.error("An error occurred during the upload");
    }
  };

  const onFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <>
      <SectionTitle title="Add Product" path="Home | Add Product" />
      <form className="max-w-7xl mx-auto text-center px-10" onSubmit={addProduct}>
        <div className="grid grid-cols-3 max-lg:grid-cols-1">
          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.name}
              onChange={(e) => setUserFormData({ ...userFormData, name: e.target.value })}
            />
          </div>

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Brand</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.brand}
              onChange={(e) => setUserFormData({ ...userFormData, brand: e.target.value })}
            />
          </div>

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Stock</span>
            </label>
            <select
              className="select select-bordered w-full lg:max-w-xs"
              value={userFormData.stock.toString()} // Convert boolean to string
              onChange={(e) => setUserFormData({ ...userFormData, stock: e.target.value === 'true' })}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              type="number"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.price}
              onChange={(e) => setUserFormData({ ...userFormData, price: parseFloat(e.target.value) })}
            />
          </div>

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Quantity</span>
            </label>
            <input
              type="number"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.quantity}
              onChange={(e) => setUserFormData({ ...userFormData, quantity: parseInt(e.target.value) })}
            />
          </div>

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Upload Image</span>
            </label>
            <input
              type="file"
              className="input input-bordered w-full lg:max-w-xs"
              onChange={onFileChange}
            />
          </div>
        </div>
        <button
          className="btn btn-lg bg-blue-600 hover:bg-blue-500 text-white mt-10"
          type="submit"
        >
          Add Product
        </button>
      </form>
    </>
  );
};

export default Profile;
