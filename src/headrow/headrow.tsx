import { NavLink, useLocation } from "react-router-dom";
import styles from "./headrow.module.scss";
import logo from "./../assets/StoreIcon.jpg";
import cartlogo from "./../assets/cart.png";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../store/store";
import { StateForSelector } from "../store/types";
import { setCategory } from "../store/pizzaSlice";
import Sort from "./sort";
import SearchRow from "./searchrow";
const Headrow: React.FC = () => {
    const state: StateForSelector = useSelector((state: StateForSelector) => state);
    const dispatch = useAppDispatch();
    const location = useLocation();
    const CategoryPack = state.pizzaSlice.categories.map((category, i) => {
        return <div key={category} className={i === state.pizzaSlice.category.index ? styles.activecategory : styles.category} onClick={() => dispatch(setCategory({ name: category, index: i }))}>{category}</div>;
    });

    if (location.pathname === "/cart") {
        return (
            <div className={styles.headrowWrap}>
                <div className={styles.logo}><NavLink to={""}><img alt={"LogoImg"} src={logo} /></NavLink></div>
                <div className={styles.cart}><NavLink to={"/cart"}><img alt={"CartImg"} src={cartlogo} /><div className={styles.totalPrice}>{state.cartSlice.totalPrice} ₽</div></NavLink></div>
            </div>
        );
    };
    return (
        <div className={styles.headrowWrap}>
            <div className={styles.logo}><NavLink to={""}><img alt={"LogoImg"} src={logo} /></NavLink></div>
            <div className={styles.categories}>{CategoryPack}</div>
            <div className={styles.search}><SearchRow dispatch={dispatch} search={state.pizzaSlice.search} /></div>
            <div className={styles.sortContainer}>
                <Sort CurrentSort={state.pizzaSlice.sortBy} dispatch={dispatch} />
            </div>
            <div className={styles.cart}><NavLink to={"/cart"}><img alt={"CartImg"} src={cartlogo} /><div className={styles.totalPrice}>{state.cartSlice.totalPrice} ₽</div></NavLink></div>
        </div>
    );
};
export default Headrow;// 