import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { baseApi } from "./apis/baseApi";
import authModalReducer from "./slices/authModalSlice";

export const store = configureStore({
  reducer: {
    authModal: authModalReducer,

    // APIs
    [baseApi.reducerPath]: baseApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({})
      .concat(baseApi.middleware)
})

setupListeners(store.dispatch)