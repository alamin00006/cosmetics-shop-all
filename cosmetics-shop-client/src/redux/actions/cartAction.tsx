import {
  CartItem,
  CartActionTypes,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  DELETE_FROM_CART,
  CLEAR_CART,
  UPDATE_QUANTITY,
} from "../types";

export const add_item = (item: CartItem): CartActionTypes => ({
  type: ADD_TO_CART,
  payload: item,
});

export const remove_item = (
  productId: string,
  configId: string
): CartActionTypes => ({
  type: REMOVE_FROM_CART,
  payload: { productId, configId },
});

export const delete_item = (
  productId: string,
  configId: string
): CartActionTypes => ({
  type: DELETE_FROM_CART,
  payload: { productId, configId },
});

export const clear_cart = (): CartActionTypes => ({
  type: CLEAR_CART,
});

export const update_quantity = (
  productId: string,
  configId: string,
  quantity: number
): CartActionTypes => ({
  type: UPDATE_QUANTITY,
  payload: { productId, configId, quantity },
});
