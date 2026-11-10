import PizzaSlice from "./pizzaSlice";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import CartSlice from "./cartSlice";

const store = configureStore(
    {
        reducer: {
            pizzaSlice: PizzaSlice.reducer,
            cartSlice: CartSlice.reducer
        }

    });
export type RootStateStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export default store;