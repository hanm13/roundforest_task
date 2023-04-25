import { createSlice } from '@reduxjs/toolkit';

// create a slice 
export default createSlice({
name:"isDesktop",
initialState:{
     value: true
},
reducers:{
     setIsDesktop:(state, payload)=>{
        state.value = payload.payload;
     },
   }
});