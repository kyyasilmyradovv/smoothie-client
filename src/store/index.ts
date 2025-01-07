import { configureStore } from "@reduxjs/toolkit";
// import { apiSlice } from "./api/apiSlice";
// import authReducer from "./auth/authSlice";
import generalSlice from "./general/generalSlice";

const store = configureStore({
  reducer: {
    general: generalSlice,
  },
  //   middleware: (getDefaultMiddleware) =>
  //     getDefaultMiddleware({ serializableCheck: false }).concat(
  //       apiSlice.middleware
  //     ),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
