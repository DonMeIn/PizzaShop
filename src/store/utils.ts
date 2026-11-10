import { PizzaInCartType } from "./types";

export const TotalPriceCalculate = (params: PizzaInCartType[]) => {
    return params.reduce((sum, obj) => {
        return (obj.price * obj.count) + sum
    }, 0);
};