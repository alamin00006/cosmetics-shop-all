// src/app/redux/reducers/cartReducer.tsx
import {
  CartItem,
  CartActionTypes,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  DELETE_FROM_CART,
  CLEAR_CART,
  UPDATE_QUANTITY,
} from "../types";
import toast from "react-hot-toast";

interface CartState {
  cartItems: CartItem[];
}

interface PartialCartItem {
  productId?: string;
  name?: string;
  product?: {
    id?: string;
    configId?: string;
    name?: string;
    price?: number;
    discountPrice?: number;
    quantity?: number;
    fulldesc?: string;
    photos?: { src: string }[];
  };
  quantity?: number;
  attributes?: { [key: string]: string };
  selectedImage?: string;
  price?: string;
  seller?: { name: string; id: string };
}

const STORAGE_KEY = "cart";

const loadCartFromStorage = (): CartItem[] => {
  try {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem(STORAGE_KEY);
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        if (
          Array.isArray(parsedCart) &&
          parsedCart.every(
            (item: PartialCartItem) =>
              item.productId != null &&
              item.name != null &&
              item.product != null &&
              item.quantity != null &&
              item.attributes != null &&
              item.selectedImage != null &&
              item.price != null &&
              typeof item.product === "object" &&
              item.product.id != null &&
              item.product.configId != null &&
              (!item.seller ||
                (typeof item.seller === "object" &&
                  item.seller.name != null &&
                  item.seller.id != null))
          )
        ) {
          return parsedCart as CartItem[];
        }
      }
    }
  } catch (error) {
    console.error("Failed to load cart from localStorage:", error);
    toast.error("Failed to load cart data.");
  }
  return [];
};

const saveCartToStorage = (cart: CartItem[]) => {
  try {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    }
  } catch (error) {
    console.error("Failed to save cart to localStorage:", error);
    toast.error("Failed to save cart data.");
  }
};

const initialState: CartState = {
  cartItems: loadCartFromStorage(),
};

const cartReducer = (
  state = initialState,
  action: CartActionTypes
): CartState => {
  switch (action.type) {
    case ADD_TO_CART: {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) =>
          item.productId === newItem.productId &&
          item.product.configId === newItem.product.configId
      );

      let updatedCartItems: CartItem[];
      if (existingItem) {
        updatedCartItems = state.cartItems.map((item) =>
          item.productId === newItem.productId &&
          item.product.configId === newItem.product.configId
            ? {
                ...item,
                quantity: item.quantity + newItem.quantity,
                selectedImage: newItem.selectedImage || item.selectedImage,
                product: {
                  ...item.product,
                  quantity: item.quantity + newItem.quantity,
                },
              }
            : item
        );
      } else {
        updatedCartItems = [...state.cartItems, newItem];
      }

      saveCartToStorage(updatedCartItems);
      return { ...state, cartItems: updatedCartItems };
    }

    case UPDATE_QUANTITY: {
      const { productId, configId, quantity } = action.payload;
      try {
        const updatedCartItems = state.cartItems
          .map((item) =>
            item.productId === productId && item.product.configId === configId
              ? {
                  ...item,
                  quantity: Math.max(0, quantity),
                  product: {
                    ...item.product,
                    quantity: Math.max(0, quantity),
                  },
                }
              : item
          )
          .filter((item) => item.quantity > 0);

        saveCartToStorage(updatedCartItems);
        return { ...state, cartItems: updatedCartItems };
      } catch (error) {
        console.error("Failed to update quantity:", error);
        toast.error("Failed to update quantity. Please try again.");
        return state;
      }
    }

    case REMOVE_FROM_CART: {
      const { productId, configId } = action.payload;
      const updatedCartItems = state.cartItems
        .map((item) =>
          item.productId === productId && item.product.configId === configId
            ? {
                ...item,
                quantity: item.quantity - 1,
                product: {
                  ...item.product,
                  quantity: item.quantity - 1,
                },
              }
            : item
        )
        .filter((item) => item.quantity > 0);

      saveCartToStorage(updatedCartItems);
      return { ...state, cartItems: updatedCartItems };
    }

    case DELETE_FROM_CART: {
      const { productId, configId } = action.payload;
      const updatedCartItems = state.cartItems.filter(
        (item) =>
          !(item.productId === productId && item.product.configId === configId)
      );

      saveCartToStorage(updatedCartItems);
      toast.success("Item deleted from cart!");
      return { ...state, cartItems: updatedCartItems };
    }

    case CLEAR_CART: {
      saveCartToStorage([]);
      toast.success("Cart cleared successfully!");
      return { ...state, cartItems: [] };
    }

    default:
      return state;
  }
};

export default cartReducer;
