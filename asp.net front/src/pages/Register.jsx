import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SectionTitle } from "../components";
import { toast } from "react-toastify";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("Customer");
  const [imageUrl, setImageUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  console.log("======>",role,name)
  const navigate = useNavigate();

  const isValidate = () => {
    let isProceed = true;
    let errorMessage = "";

    if (name.length === 0) {
      isProceed = false;
      errorMessage = "Please enter the value in username field";
    }  else if (email.length === 0) {
      isProceed = false;
      errorMessage = "Please enter the value in email field";
    }  else if (password.length < 6) {
      isProceed = false;
      errorMessage = "Please enter a password longer than 6 characters";
    } else if (confirmPassword.length < 6) {
      isProceed = false;
      errorMessage = "Please enter a confirm password longer than 6 characters";
    } else if (password !== confirmPassword) {
      isProceed = false;
      errorMessage = "Passwords must match";
    }

    if (!isProceed) {
      toast.warn(errorMessage);
    }

    return isProceed;
  };
  useEffect(() => {
    if (selectedFile) {
      uploadPic();
    }
  }, [selectedFile]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let regObj = {
      name,
      email,
      role,
      password,
      imageUrl
    };
   
    if (isValidate()) {
      const response = await axios.post('http://localhost:5139/api/User', regObj);
    if (response.data ) {
      toast.success("Register successful");
      navigate("/login");
    }else {
      toast.warn("Register Error");
    }
    }
  };
  const uploadPic = async () => {
    const formData = new FormData();
    formData.append('imageFile', selectedFile);
    try {
      console.log("object",imageUrl,formData,selectedFile)
      const response = await axios.post('http://localhost:5139/api/Product/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data) {
        console.log("object",response.data)
        setImageUrl(response.data)
        toast.success("Image uploaded successfully");
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
      <SectionTitle title="Register" path="Home | Register" />
      <div className="flex flex-col justify-center sm:py-12">
        <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
          <div className="bg-dark border border-gray-600 shadow w-full rounded-lg divide-y divide-gray-200">
            <form className="px-5 py-7" onSubmit={handleSubmit}>
              <label className="font-semibold text-sm pb-1 block text-accent-content">
                Name
              </label>
              <input
                type="text"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={true}
              />
              
              <label className="font-semibold text-sm pb-1 block text-accent-content">
                E-mail
              </label>
              <input
                type="email"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={true}
              />
              
              <label className="font-semibold text-sm pb-1 block text-accent-content">
                    Role
                  </label>
                  <select
                    className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required={true}
                  >
                    <option value="Customer">Customer</option>
                    <option value="Admin">Admin</option>
                  </select>
              <label className="font-semibold text-sm pb-1 block text-accent-content">
                Password
              </label>
              <input
                type="password"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={true}
              />
              <label className="font-semibold text-sm pb-1 block text-accent-content">
                Repeat Password
              </label>
              <input
                type="password"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required={true}
              />
               <div className="form-control w-full lg:max-w-xs">
            <label className="label">
            <label className="font-semibold text-sm pb-1 block text-accent-content">
                Image
              </label>
            </label>
            <input
              type="file"
              className="input input-bordered w-full lg:max-w-xs"
              onChange={onFileChange}
            />
          </div>
              <button
                type="submit"
                className="transition duration-200 bg-blue-600 hover:bg-blue-500 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
              >
                <span className="inline-block mr-2">Register</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4 inline-block"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </form>
          </div>
          <div className="py-5 text-center">
            <Link
              to="/login"
              className="btn btn-neutral text-white"
              onClick={() => window.scrollTo(0, 0)}
            >
              Already have an account? Please login.
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
