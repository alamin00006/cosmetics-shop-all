import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./reducers/cartSlice";
import { baseApi } from "./api/baseApi";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    // pagination: paginationSlice,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
