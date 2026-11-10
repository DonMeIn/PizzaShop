import { addPizza, deletePizza, minusPizza } from "../store/cartSlice";
import { cartItemPropsType, } from "../store/types";
import styles from "./cart.module.scss";
import remove from "./../assets/remove.png";

const CartItem: React.FC<cartItemPropsType> = (props) => {

    return (<div className={styles.item}>
        <div className={styles.img}><img alt={"imagePizzaCart"} src={props.item.imageUrl} /></div>
        <div className={styles.name}>{props.item.name}</div>
        <div className={styles.type}>{props.item.types === 0 ? "Тонкое" : "Толстое"},{props.item.sizes} см</div>
        <div className={styles.counts}><button onClick={props.item.count === 1 ? () => props.dispatch(deletePizza(props.item)) : () => props.dispatch(minusPizza(props.item))}>-</button><b>{props.item.count}</b><button onClick={() => props.dispatch(addPizza(props.item))}>+</button></div>
        <div className={styles.remove}><img alt={"imageRemovePizza"} src={remove} onClick={() => props.dispatch(deletePizza(props.item))} /></div>
    </div>);
};
export default CartItem;