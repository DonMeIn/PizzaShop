import { useSelector } from "react-redux";
import { StateForSelector } from "../store/types";
import CartItem from "./cartItems";
import { useAppDispatch } from "../store/store";
import styles from "./cart.module.scss";
import emptycart from "./../assets/emptycart.png";
import { deleteAllPizzas } from "../store/cartSlice";

const Cart: React.FC = () => {
    const CartState = useSelector((state: StateForSelector) => state.cartSlice)
    const dispatch = useAppDispatch();
    const PizzasPack = CartState.pizzas.map((item) => {
        return <CartItem item={item} dispatch={dispatch} />;
    });
    return (
        <div className={styles.cartWrapper}>
            {PizzasPack.length === 0 ? <div className={styles.emptycart}><b>Ничего нет</b><img alt={"emptyCart"} src={emptycart} /></div> : <div>{PizzasPack}
                <div className={styles.buttonsall}><button className={styles.deleteall} onClick={() => dispatch(deleteAllPizzas())}>Delete all</button><div className={styles.buywrap}><button className={styles.buyall}>Buy</button></div></div></div>}

        </div>
    );
};
export default Cart;