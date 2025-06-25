import { configureStore } from "@reduxjs/toolkit";

import paginationSlice from "./reducers/paginationSlice";
import { baseApi } from "./api/baseApi";

export const store = configureStore({
  reducer: {
    pagination: paginationSlice,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});
