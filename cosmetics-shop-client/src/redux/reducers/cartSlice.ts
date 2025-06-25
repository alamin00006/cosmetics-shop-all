import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  _id: string;
  price: number;
  quantity?: number;
  cartQuantity: number;
  singleCartTotal: number;
  [key: string]: any;
}

interface CartState {
  cartItems: CartItem[];
  cartTotalQuantity: number;
  cartTotalAmount: number;
}

const initialState: CartState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems")!)
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const updateLocalStorage = (cartItems: CartItem[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const productIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );
      if (productIndex >= 0) {
        state.cartItems[productIndex].cartQuantity += 1;
        state.cartItems[productIndex].singleCartTotal =
          action.payload.price * state.cartItems[productIndex].cartQuantity;
      } else {
        const tempProduct = {
          ...action.payload,
          cartQuantity: 1,
          singleCartTotal: action.payload.price,
        };
        state.cartItems.push(tempProduct);
      }
      updateLocalStorage(state.cartItems);
    },

    removeFromCart(state, action: PayloadAction<{ _id: string }>) {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      updateLocalStorage(state.cartItems);
    },

    allRemoveFromCart(state) {
      state.cartItems = [];
      state.cartTotalQuantity = 0;
      state.cartTotalAmount = 0;
      localStorage.removeItem("cartItems");
    },

    decreaseCart(state, action: PayloadAction<CartItem>) {
      const productIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );
      if (productIndex >= 0 && state.cartItems[productIndex].cartQuantity > 1) {
        state.cartItems[productIndex].cartQuantity -= 1;
        state.cartItems[productIndex].singleCartTotal =
          action.payload.price * state.cartItems[productIndex].cartQuantity;
        updateLocalStorage(state.cartItems);
      }
    },

    incrementCart(state, action: PayloadAction<CartItem>) {
      const productIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );
      if (productIndex >= 0) {
        const currentQuantity = state.cartItems[productIndex].cartQuantity;
        const maxQuantity = action.payload.quantity ?? Infinity;
        if (currentQuantity < maxQuantity) {
          state.cartItems[productIndex].cartQuantity += 1;
          state.cartItems[productIndex].singleCartTotal =
            action.payload.price * state.cartItems[productIndex].cartQuantity;
          updateLocalStorage(state.cartItems);
        }
      } else {
        const tempProduct = {
          ...action.payload,
          cartQuantity: 1,
          singleCartTotal: action.payload.price,
        };
        state.cartItems.push(tempProduct);
        updateLocalStorage(state.cartItems);
      }
    },

    addByIncrement(
      state,
      action: PayloadAction<{ product: CartItem; cartQuantity: number }>
    ) {
      const productIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload.product._id
      );
      if (productIndex >= 0) {
        state.cartItems[productIndex].cartQuantity +=
          action.payload.cartQuantity;
        state.cartItems[productIndex].singleCartTotal =
          action.payload.product.price *
          state.cartItems[productIndex].cartQuantity;
      } else {
        const tempProduct = {
          ...action.payload.product,
          cartQuantity: action.payload.cartQuantity || 1,
          singleCartTotal:
            action.payload.product.price * (action.payload.cartQuantity || 1),
        };
        state.cartItems.push(tempProduct);
      }
      updateLocalStorage(state.cartItems);
    },

    getTotals(state) {
      const { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;
          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;
          return cartTotal;
        },
        { total: 0, quantity: 0 }
      );
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = parseFloat(total.toFixed(2));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  allRemoveFromCart,
  decreaseCart,
  incrementCart,
  getTotals,
  addByIncrement,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
