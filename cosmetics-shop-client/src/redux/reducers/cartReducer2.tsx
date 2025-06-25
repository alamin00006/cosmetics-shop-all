// src/app/redux/reducers/cartReducer2.tsx
import toast from "react-hot-toast";

interface Product {
  id: string;
  configId: string;
  size: string;
  color: string;
  price: number;
  discountPrice: number;
  quantity: number;
  adjustment: number;
  paidAmount: number;
  fulldesc: string;
  photos: { src: string }[];
}

export interface CartItem {
  product: Product[];
  name: string;
  vendorId?: string;
}

interface CartState {
  cart: CartItem[];
}

interface PartialCartItem {
  product?: Array<{
    id?: string;
    configId?: string;
    size?: string;
    color?: string;
    price?: number;
    discountPrice?: number;
    quantity?: number;
    adjustment?: number;
    paidAmount?: number;
    fulldesc?: string;
    photos?: { src: string }[];
  }>;
  name?: string;
  vendorId?: string;
}

// Action Types
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const UPDATE_QUANTITY = "UPDATE_QUANTITY";

interface AddToCartAction {
  type: typeof ADD_TO_CART;
  payload: CartItem;
}

interface RemoveFromCartAction {
  type: typeof REMOVE_FROM_CART;
  payload: { itemId: string; size: string; color: string };
}

interface UpdateQuantityAction {
  type: typeof UPDATE_QUANTITY;
  payload: { itemId: string; size: string; color: string; quantity: number };
}

type CartActionTypes =
  | AddToCartAction
  | RemoveFromCartAction
  | UpdateQuantityAction;

// Load initial state from localStorage
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
              item.name != null &&
              item.product != null &&
              Array.isArray(item.product) &&
              item.product.every(
                (p) =>
                  p.id != null &&
                  p.configId != null &&
                  p.size != null &&
                  p.color != null &&
                  p.price != null &&
                  p.discountPrice != null &&
                  p.quantity != null &&
                  p.adjustment != null &&
                  p.paidAmount != null &&
                  p.fulldesc != null &&
                  p.photos != null &&
                  Array.isArray(p.photos)
              )
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

const initialState: CartState = {
  cart: loadCartFromStorage(),
};

// Save cart to localStorage
const saveCartToStorage = (cart: CartItem[]) => {
  try {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    }
  } catch (error) {
    console.error("Failed to save cart to localStorage:", error);
  }
};

const cartReducer2 = (
  state = initialState,
  action: CartActionTypes
): CartState => {
  let newState: CartState;
  switch (action.type) {
    case ADD_TO_CART: {
      const newProduct = action.payload.product[0];
      const existingCartItem = state.cart.find((cartItem) =>
        cartItem.product.some((p) => p.id === newProduct.id)
      );

      if (existingCartItem) {
        const updatedProducts = [...existingCartItem.product];
        const existingProductIndex = updatedProducts.findIndex(
          (p) =>
            p.id === newProduct.id &&
            p.size === newProduct.size &&
            p.color === newProduct.color
        );

        if (existingProductIndex !== -1) {
          updatedProducts[existingProductIndex].quantity += newProduct.quantity;
        } else {
          updatedProducts.push(newProduct);
        }

        newState = {
          ...state,
          cart: state.cart.map((cartItem) =>
            cartItem.product.some((p) => p.id === newProduct.id)
              ? { ...cartItem, product: updatedProducts }
              : cartItem
          ),
        };
      } else {
        newState = {
          ...state,
          cart: [...state.cart, action.payload],
        };
      }
      saveCartToStorage(newState.cart);
      return newState;
    }

    case REMOVE_FROM_CART: {
      const { itemId, size, color } = action.payload;
      newState = {
        ...state,
        cart: state.cart
          .map((item) => ({
            ...item,
            product: item.product.filter(
              (p) => !(p.id === itemId && p.size === size && p.color === color)
            ),
          }))
          .filter((item) => item.product.length > 0),
      };
      saveCartToStorage(newState.cart);
      return newState;
    }

    case UPDATE_QUANTITY: {
      const { itemId, size, color, quantity } = action.payload;
      try {
        newState = {
          ...state,
          cart: state.cart.map((item) => ({
            ...item,
            product: item.product.map((p) =>
              p.id === itemId && p.size === size && p.color === color
                ? { ...p, quantity: Math.max(0, quantity) }
                : p
            ),
          })),
        };
        saveCartToStorage(newState.cart);
        toast.success("Quantity updated successfully!");
      } catch (error) {
        console.error("Failed to update quantity:", error);
        toast.error("Failed to update quantity. Please try again.");
        return state;
      }
      return newState;
    }

    default:
      return state;
  }
};

export default cartReducer2;
