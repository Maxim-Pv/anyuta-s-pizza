import { create } from "zustand";
import { Api } from "../services/api-client";
import { getCartDetails } from "../lib";
import { CartStateItem } from "../lib/get-cart-details";
import { CreateCartItemValues } from "../services/dto/cart.dto";

export interface CartState {
  loading: boolean;
  error: boolean;
  initializing?: boolean;
  pendingById?: Set<number>;

  totalAmount: number;
  items: CartStateItem[];
  /* Получение товаров из корзины */
  fetchCartItems: () => Promise<void>;
  /* Запрос на обновление количества товара */
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;
  /* Запрос на добавление товара в корзину */
  addCartItem: (values: CreateCartItemValues) => Promise<void>;
  /* Запрос на удаление товара из корзины */
  removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  error: false,
  loading: true,
  initializing: true,
  pendingById: new Set<number>(),
  totalAmount: 0,

  fetchCartItems: async () => {
    try {
      set({ initializing: true, error: false });
      const data = await Api.cart.getCart();
      set({ ...getCartDetails(data), initializing: false, loading: false });
    } catch (error) {
      console.error(error);
      set({ error: true, initializing: false });
    }
  },

  updateItemQuantity: async (id: number, quantity: number) => {
    const prevItems = get().items;
    set((state) => ({
      items: state.items.map((item) => (item.id === id ? { ...item, quantity } : item)),
      pendingById: new Set(state.pendingById).add(id),
      error: false,
    }));

    try {
      const data = await Api.cart.updateItemQuantity(id, quantity);
      set((state) => ({
        ...getCartDetails(data),
        pendingById: (() => {
          const next = new Set(state.pendingById);
          next.delete(id);
          return next;
        })(),
      }));
    } catch (error) {
      console.error(error);
      set((state) => ({
        items: prevItems,
        error: true,
        pendingById: (() => {
          const next = new Set(state.pendingById);
          next.delete(id);
          return next;
        })(),
      }));
    }
  },

  removeCartItem: async (id: number) => {
    const prevItems = get().items;
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
      pendingById: new Set(state.pendingById).add(id),
      error: false,
    }));

    try {
      const data = await Api.cart.removeCartItem(id);
      set((state) => ({
        ...getCartDetails(data),
        pendingById: (() => {
          const next = new Set(state.pendingById);
          next.delete(id);
          return next;
        })(),
      }));
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set((state) => ({
        items: prevItems,
        error: true,
        pendingById: (() => {
          const next = new Set(state.pendingById);
          next.delete(id);
          return next;
        })(),
      }));
    }
  },

  addCartItem: async (values: CreateCartItemValues) => {
    try {
      set({ error: false, loading: true });
      const data = await Api.cart.addCartItem(values);
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
}));
