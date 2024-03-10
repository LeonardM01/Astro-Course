import { computed, map } from "nanostores";
import type { CartItem, ShopItem } from "../types/types";

export const $cart = map<Record<number, CartItem>>({});

/**
 * Adds an item to the cart.
 * If the item already exists in the cart, the quantity is incremented by 1.
 * If the item does not exist in the cart, a new entry is created with a quantity of 1.
 * @param item - The item to be added to the cart.
 */
export function addItemToCart(item: ShopItem) {
  const cartItem = $cart.get()[item.id];
  const quantity = cartItem ? cartItem.quantity + 1 : 1;

  $cart.setKey(item.id, {
    item,
    quantity,
  });
}

/**
 * Removes an item from the cart.
 * @param itemId - The ID of the item to be removed.
 */
export function removeItemFromCart(itemId: number) {
  // @ts-ignore
  $cart.setKey(itemId, undefined);
}

/**
 * Calculates the subtotal of the cart based on the entries.
 * @param entries - The entries in the cart.
 * @returns The subtotal of the cart.
 */
export const $subtotal = computed($cart, (entries) => {
  let subtotal = 0;

  Object.values(entries).forEach((entry) => {
    if (!entry) return;

    subtotal += entry.item.price * entry.quantity;
  });

  return subtotal;
});
