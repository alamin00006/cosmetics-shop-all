import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Shade {
  name: string;
  color: string;
  image_url: string;
}

interface Product {
  name: string;
  price: number;
  currency: string;
  points_earned: number;
  available_shades: Shade[];
  description: string;
  features: string[];
  ingredients: string[];
  country_of_origin: string;
  manufacturer: string;
  address_of_manufacturer: string;
  how_to_use: string;
  shelf_life: string;
  product_code: string;
}

interface BrandInfo {
  founded: number;
  followers: string;
  locations: string;
  orders: string;
}

interface Certifications {
  authentic: string;
  shipping: string;
  payment: string;
}

interface CartItem {
  _id: string;
  price: number;
  quantity: number;
  cartQuantity: number;
  singleCartTotal: number;
  selectedShade: Shade;
  product: Product;
  brand_info: BrandInfo;
  certifications: Certifications;
  [key: string]: any;
}

interface CartState {
  cartItems: CartItem[];
  cartTotalQuantity: number;
  cartTotalAmount: number;
}

const initialState: CartState = {
  cartItems:
    typeof window !== "undefined" && localStorage.getItem("cartItems")
      ? (JSON.parse(localStorage.getItem("cartItems")!) as CartItem[])
      : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state: CartState, action: PayloadAction<CartItem>) {
      const productIndex = state.cartItems.findIndex(
        (item) =>
          item._id === action.payload._id &&
          item.selectedShade.name === action.payload.selectedShade.name
      );
      if (productIndex === -1) {
        // Only add if the product with the same shade doesn't exist
        const tempProduct: CartItem = {
          ...action.payload,
          cartQuantity: action.payload.cartQuantity || 1,
          singleCartTotal:
            action.payload.price * (action.payload.cartQuantity || 1),
        };
        state.cartItems.push(tempProduct);
        if (typeof window !== "undefined") {
          localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        }
      }
      // If product exists, do nothing (no quantity increase)
    },

    removeFromCart(state: CartState, action: PayloadAction<CartItem>) {
      state.cartItems = state.cartItems.filter(
        (cartItem) =>
          !(
            cartItem._id === action.payload._id &&
            cartItem.selectedShade.name === action.payload.selectedShade.name
          )
      );
      if (typeof window !== "undefined") {
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },

    decreaseCart(state: CartState, action: PayloadAction<CartItem>) {
      const productIndex = state.cartItems.findIndex(
        (item) =>
          item._id === action.payload._id &&
          item.selectedShade.name === action.payload.selectedShade.name
      );

      if (productIndex >= 0) {
        if (state.cartItems[productIndex].cartQuantity > 1) {
          state.cartItems[productIndex].cartQuantity -= 1;
          state.cartItems[productIndex].singleCartTotal =
            action.payload.price * state.cartItems[productIndex].cartQuantity;
        } else {
          // Remove item if quantity would be 0
          state.cartItems = state.cartItems.filter(
            (cartItem) =>
              !(
                cartItem._id === action.payload._id &&
                cartItem.selectedShade.name ===
                  action.payload.selectedShade.name
              )
          );
        }
        if (typeof window !== "undefined") {
          localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        }
      }
    },

    incrementCart(state: CartState, action: PayloadAction<CartItem>) {
      const productIndex = state.cartItems.findIndex(
        (item) =>
          item._id === action.payload._id &&
          item.selectedShade.name === action.payload.selectedShade.name
      );
      if (productIndex >= 0) {
        if (
          state.cartItems[productIndex].cartQuantity < action.payload.quantity
        ) {
          state.cartItems[productIndex].cartQuantity += 1;
          state.cartItems[productIndex].singleCartTotal =
            action.payload.price * state.cartItems[productIndex].cartQuantity;
        }
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },

    addByIncrement(
      state: CartState,
      action: PayloadAction<{ product: CartItem; cartQuantity: number }>
    ) {
      const productIndex = state.cartItems.findIndex(
        (item) =>
          item._id === action.payload.product._id &&
          item.selectedShade.name === action.payload.product.selectedShade.name
      );
      if (productIndex >= 0) {
        state.cartItems[productIndex].cartQuantity +=
          action.payload.cartQuantity;
        state.cartItems[productIndex].singleCartTotal =
          action.payload.product.price *
          state.cartItems[productIndex].cartQuantity;
      } else {
        const cartQuantity =
          action.payload.cartQuantity === 1 ? 1 : action.payload.cartQuantity;
        const tempProduct: CartItem = {
          ...action.payload.product,
          cartQuantity,
          singleCartTotal: action.payload.product.price * cartQuantity,
        };
        state.cartItems.push(tempProduct);
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },

    getTotals(state: CartState) {
      let { total, quantity } = state.cartItems.reduce(
        (
          cartTotal: { total: number; quantity: number },
          cartItem: CartItem
        ) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  decreaseCart,
  incrementCart,
  getTotals,
  addByIncrement,
} = CartSlice.actions;

export const cartReducer = CartSlice.reducer;
