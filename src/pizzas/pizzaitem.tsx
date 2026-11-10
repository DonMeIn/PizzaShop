import { useState } from "react";
import { pizzaItemProps } from "../store/types";
import styles from "./pizzasItem.module.scss";
import { addPizzaToCart } from "../store/cartSlice";


const PizzaItem: React.FC<pizzaItemProps> = (props) => {
    let [currentType, SelectType] = useState(0);
    let [currentSize, SelectSize] = useState(props.pizza.sizes[0]);
    const Types = ["Тонкое", "Толстое"];
    const SizesPack = props.pizza.sizes.map((size, i) => {

        return <div key={size} className={currentSize === size ? styles.sizeActive : styles.size} onClick={() => SelectSize(size)}>{size} см</div>
    });
    const TypePack = props.pizza.types.map((type, i) => {
        return <div key={type} className={currentType === i ? styles.typeActive : styles.type} onClick={() => SelectType(i)}>{Types[Number(type)]}</div>
    });

    const AddPizzaToCart = () => {
        props.dispatch(addPizzaToCart({ ...props.pizza, sizes: currentSize, types: currentType }));
    };

    return (
        <div className={styles.pizzaItem}>
            <div className={styles.image}><img alt={"imagePizza"} src={props.pizza.imageUrl} /></div>
            <div className={styles.name}> {props.pizza.name}</div>
            <div className={styles.wrappingTypes}>
                <div className={styles.sizes} >Размер:{SizesPack}</div>
                <div className={styles.types}>Тесто:{TypePack}</div>
            </div>
            <div className={styles.adding}><button className={styles.addtocart} onClick={() => AddPizzaToCart()}>Добавить <>{props.count}</></button> Цена:{props.pizza.price} ₽</div>
        </div>
    );
};
export default PizzaItem;