import { createSlice } from "@reduxjs/toolkit";
import { CartSliceType } from "./types";
import { TotalPriceCalculate } from "./utils";
const initstate: CartSliceType = {
    pizzas: [],
    totalPrice: 0
}
const CartSlice = createSlice({
    name: "cart",
    initialState: initstate,
    reducers: {
        addPizzaToCart: (state, action) => {
            const finditem = state.pizzas.find((item) => {
                if (item.name === action.payload.name && item.sizes === action.payload.sizes && item.types === action.payload.types) {
                    return item;
                }
                else return null;
            });

            if (finditem) {
                finditem.count++
            }
            else state.pizzas.push({ ...action.payload, count: 1 })
            state.totalPrice = TotalPriceCalculate(state.pizzas);
        },
        addPizza: (state, action) => {
            const finditem = state.pizzas.find((item) => {
                if (item.name === action.payload.name && item.sizes === action.payload.sizes && item.types === action.payload.types) {
                    return item;
                }
                else return null;
            });
            if (finditem) {
                finditem.count++;
            }
            state.totalPrice = TotalPriceCalculate(state.pizzas);
        },
        minusPizza: (state, action) => {
            const finditem = state.pizzas.find((item) => {
                if (item.name === action.payload.name && item.sizes === action.payload.sizes && item.types === action.payload.types) {
                    return item;
                }
                else return null;
            });
            if (finditem) {
                finditem.count--
            };
            state.totalPrice = TotalPriceCalculate(state.pizzas);
        },
        deletePizza: (state, action) => {
            state.pizzas = state.pizzas.filter((item) => {
                if (item.name === action.payload.name && item.sizes === action.payload.sizes && item.types === action.payload.types) {
                    return null
                }
                else return item

            });
            state.totalPrice = TotalPriceCalculate(state.pizzas);
        },
        deleteAllPizzas: (state) => {
            state.pizzas = [];
            state.totalPrice = TotalPriceCalculate(state.pizzas);
        }

    },

}
);
export const { addPizzaToCart, addPizza, minusPizza, deletePizza, deleteAllPizzas } = CartSlice.actions;
export default CartSlice;