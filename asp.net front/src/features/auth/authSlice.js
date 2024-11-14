import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  userId: localStorage.getItem('user') || null,
  isLoggedIn: localStorage.getItem('user') ? true : false,
  darkMode: true
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state) => {
      state.isLoggedIn = true;
      state.userId = localStorage.getItem('user');
        },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.userId = null;
    },
    changeMode: (state) => {
      state.darkMode = !state.darkMode;
      if(state.darkMode){
        document.querySelector('html').setAttribute('data-theme', "dark");
      }else{
        document.querySelector('html').setAttribute('data-theme', "winter");
      }
    }
  },
});

// console.log(cartSlice);
export const { loginUser, logoutUser, changeMode } = authSlice.actions;

export default authSlice.reducer;