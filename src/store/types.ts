export type PizzaType = {
    name: string,
    imageUrl: string,
    sizes: number[],
    types: number[],
    category: number[],
    price: number,
    rating: number
};
export type PizzaInCartType = {
    name: string,
    imageUrl: string,
    sizes: number,
    types: number,
    price: number,
    category: number[],
    rating: number,
    count: number
};
export type CartSliceType = {
    pizzas: PizzaInCartType[],
    totalPrice: number
}
export type PizzaSliceType = {
    pizzas: PizzaType[],
    category: { name: string, index: number },
    sortBy: string,
    categories: string[],
    search: string,
    loading: boolean
};
export type StateForSelector = {
    pizzaSlice: PizzaSliceType,
    cartSlice: CartSliceType
};
export type ReceivePizzaParams = {
    category: number,
    sortby: string,
    search: string
};
export type pizzaItemProps = {
    pizza: PizzaType,
    dispatch: any,
    count: number
};
export type cartItemPropsType = {
    item: PizzaInCartType,
    dispatch: any
};
export type URLstring = {
    category: string,
    sortBy: string,
    search: string
};

