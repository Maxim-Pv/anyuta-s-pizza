import { calcTotalPizzaPrice } from "./calc-total-pizza-price";
import { Ingredient, ProductItem } from "@prisma/client";
import { PizzaSize, PizzaType, mapPizzaSize, mapPizzaType } from "../constants/pizza";

export const getPizzaDetails = (
  type: PizzaType,
  size: PizzaSize,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const totalPrice = calcTotalPizzaPrice(type, size, items, ingredients, selectedIngredients);
  const pizzaDetails = `${size} см, ${mapPizzaSize[size].toLowerCase()}, ${mapPizzaType[type]} пицца`;

  return { totalPrice, pizzaDetails };
};
