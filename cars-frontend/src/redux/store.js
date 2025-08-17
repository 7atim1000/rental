// npm i @reduxjs/toolkit react-redux
// set redux and do configuration in main.jsx

import { configureStore } from '@reduxjs/toolkit'
import customerSlice from './slices/customerSlice'
import cartSlice from './slices/cartSlice';
import userSlice from './slices/userSlice';

import carSlice from './slices/carSlice';

const store = configureStore({
    reducer :{
        customer :customerSlice,
        cart :cartSlice,
        user: userSlice,
        car: carSlice,
    },


    devTools: import.meta.env.NODE_ENV !== "production",
});




export default store ;

