import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    _id :"",
    name : "",
    carNo :"",
    category : "",
    price :"",
    color :"",
    image :""
}

const carSlice = createSlice({
    name :"car",

    initialState,

    reducers :{
        
        setCar :(state, action) => {
            const { _id, name , carNo, category, price, color, image } = action.payload ;
            
            state._id = _id;
            state.name = name ;
            state.carNo = carNo ;
            state.category = category;
            state.price = price ;
            state.color = color ;
            state.image = image ;
        },
        removeCar :(state) => {
            state._id = "";
            state.name = "" ;
            state.carNo = "";
            state.category = "";
            state.price = "" ;
            state.color = "" ;
            state.image = "" ;
            
        },
        
       
    }
});

export const { setCar, removeCar } = carSlice.actions ;
export default carSlice.reducer;