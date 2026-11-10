import { createSlice } from "@reduxjs/toolkit";
import { PizzaSliceType } from "./types";
import { ReceivePizza } from "./APIs";
const initState: PizzaSliceType = {
    pizzas: [],
    category: {
        name: "Все",
        index: 0
    },
    sortBy: "rating",
    categories: ["Все", "Мясные", "Сырные", "С Овощами"],
    search: "",
    loading: false
};
const PizzaSlice = createSlice({
    name: "pizzas",
    initialState: initState,
    reducers: {
        setCategory: (state, action) => {
            state.category = action.payload
        },
        setSort: (state, action) => {
            state.sortBy = action.payload;
        },
        setSearch: (state, action) => {
            state.search = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(ReceivePizza.fulfilled, (state, action) => {
            state.loading = false;
            state.pizzas = action.payload;

        });
        builder.addCase(ReceivePizza.pending, (state, action) => {
            state.loading = true;
        })
    }


});
export const { setCategory, setSort, setSearch } = PizzaSlice.actions;
export default PizzaSlice;