import { configureStore } from '@reduxjs/toolkit';
import isDesktopSlice from './slices/isDesktop';

// config the store 
const store= configureStore({
   reducer: {
      isDesktop: isDesktopSlice.reducer,
   }
});

// export default the store 
export default store;

// export the action
export const isDesktopAction = isDesktopSlice.actions;