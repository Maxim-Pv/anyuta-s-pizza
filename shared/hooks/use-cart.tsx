import React from "react";
import { useShallow } from "zustand/react/shallow";

import { CartStateItem } from "../lib/get-cart-details";
import { useCartStore } from "../store";
import { CreateCartItemValues } from "../services/dto/cart.dto";

type ReturnProps = {
  totalAmount: number;
  items: CartStateItem[];
  loading: boolean;
  updateItemQuantity: (id: number, quantity: number) => void;
  removeCartItem: (id: number) => void;
  addCartItem: (values: CreateCartItemValues) => void;
  initializing?: boolean;
  pendingById?: Set<number>;
};

export const useCart = (): ReturnProps => {
  const cartState = useCartStore(
    useShallow((state) => ({
      totalAmount: state.totalAmount,
      items: state.items,
      loading: state.loading,
      updateItemQuantity: state.updateItemQuantity,
      removeCartItem: state.removeCartItem,
      addCartItem: state.addCartItem,
      initializing: state.initializing,
      pendingById: state.pendingById,
    }))
  );

  React.useEffect(() => {
    // Вызываем получение корзины один раз при монтировании
    useCartStore.getState().fetchCartItems();
  }, []);

  return cartState;
};
