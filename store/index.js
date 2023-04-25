import { configureStore } from '@reduxjs/toolkit';
import isDesktopSlice from './slices/isDesktop';
import products from './slices/products';

// config the store 
const store= configureStore({
   reducer: {
      isDesktop: isDesktopSlice.reducer,
      products: products.reducer,
   }
});

// export default the store 
export default store;

// export the action
export const isDesktopAction = isDesktopSlice.actions;

// export the action
export const productsAction = products.actions;