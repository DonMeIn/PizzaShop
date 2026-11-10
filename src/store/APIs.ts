import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ReceivePizzaParams } from "./types";

export const ReceivePizza = createAsyncThunk('/pizza/receivePizza',
    async (params: ReceivePizzaParams) => {

        const response = await axios.get(`https://6980a70a6570ee87d50ff142.mockapi.io/demopizza/items2?${params.search ? `name=${params.search}&` : ""}category=${params.category}&sortBy=${params.sortby}`);
        return response.data;
    }
);