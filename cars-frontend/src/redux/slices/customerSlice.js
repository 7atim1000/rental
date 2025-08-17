import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orderId :"",
    customerId :"",
    customerName : "",
    email :"",
    contactNo : "",
    idnumber :"",
    licenseNo :"",
    address :"",
    balance :'',
    service: null
}

const customerSlice = createSlice({
    name :"customer",

    initialState,

    reducers :{
        
        setCustomer :(state, action) => {
            const { customerId, customerName , email, contactNo, idnumber, licenseNo, address, balance } = action.payload ;
            state.orderId = `${Date.now()}`;

            state.customerId = customerId;
            state.customerName = customerName ;
            state.email = email ;
            state.contactNo = contactNo;
            state.idnumber = idnumber ;
            state.licenseNo = licenseNo;
            state.address = address;
            state.balance = balance;
        },
        removeCustomer :(state) => {
            state.customerId = "";
            state.customerName = "" ;
            state.email = "";
            state.contactNo = "";
            state.idnumber = "" ;
            state.licenseNo = "";
            state.address = "";
            state.balance = "";

            state.service = null;
        },
        
        updateService :(state, action) => {
            state.service = action.payload.service;
        }
    }
});

export const { setCustomer, removeCustomer, updateService } = customerSlice.actions ;
export default customerSlice.reducer;