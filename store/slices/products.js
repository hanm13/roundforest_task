import { createSlice } from '@reduxjs/toolkit';

// create a slice 
export default createSlice({
name:"products",
initialState:{
     value: []
},
reducers:{
     setProducts:(state, payload)=>{
        state.value = payload.payload;
     },
     deleteProduct:(state, payload)=>{
      const currentProductsDuplicate = JSON.parse(JSON.stringify(state.value));
      let matchedProductIndex = null;

      for (let index = 0; index < currentProductsDuplicate.length; index++) {
         const product = currentProductsDuplicate[index];
         if(product.ASIN == payload.payload.ASIN && product.Locale == payload.payload.Locale){
            matchedProductIndex = index;
         }
      }
      currentProductsDuplicate.splice(matchedProductIndex, 1);
      state.value = currentProductsDuplicate;
   },
   }
});