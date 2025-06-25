import { combineReducers } from "redux";

// Import your individual reducers
import cartReducer from "./cartReducer"; // Example reducer
import initReducer from "./initReducer"; // Example init reducer
import loadingReducer from "./loadingReducer"; // Example loading reducer
// import cartReducer2 from "./cartReducer2";

const rootReducer = combineReducers({
  INIT: initReducer, // Handles categories and other INIT state
  LOADING: loadingReducer, // Handles loading state
  cart: cartReducer, // Handles cart-related state
  // cart2: cartReducer2,
  // Add other reducers here as needed
});

// This infers the type of the entire Redux store state
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
