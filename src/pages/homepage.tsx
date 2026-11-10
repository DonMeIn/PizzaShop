import { useSelector } from "react-redux";
import styles from "./pages.module.scss";
import PizzaItem from "../pizzas/pizzaitem";
import { PizzaType, StateForSelector, URLstring } from "../store/types";
import { useAppDispatch } from "../store/store";
import { ReceivePizza } from "../store/APIs";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { parse } from "qs";
import loadingImg from "./../assets/loading.gif";
import { setCategory, setSearch, setSort } from "../store/pizzaSlice";

const Homepage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isMounted = useRef(false);
    const isChangingState = useRef(false);
    const StateMain: StateForSelector = useSelector((state: StateForSelector) => state);

    const PizzasPack = StateMain.pizzaSlice.pizzas.map((item: PizzaType) => {
        let onepizzaCount = 0;
        onepizzaCount = StateMain.cartSlice.pizzas.reduce((sum: any, obj) => {
            if (item.name === obj.name) {
                return (1 * obj.count) + sum;
            };
            return sum;
        }, 0);
        return <PizzaItem key={item.name} pizza={item} count={onepizzaCount} dispatch={dispatch} />
    });

    const SetPizza = async () => {
        await dispatch(ReceivePizza({ category: StateMain.pizzaSlice.category.index, sortby: StateMain.pizzaSlice.sortBy, search: StateMain.pizzaSlice.search }));
    };

    useEffect(() => {
        if (window.location.search) {
            const params = parse(window.location.search.substring(1)) as URLstring;
            params.category && dispatch(setCategory({ name: StateMain.pizzaSlice.categories[Number(params.category)], index: Number(params.category) }));
            params.sortBy && dispatch(setSort(params.sortBy));
            params.sortBy && dispatch(setSearch(params.search))
            isChangingState.current = true;
        };
    }, []);
    //naverhu chekayem adresnuyu stroku i skidivayem dannie v redux
    useEffect(() => {
        if (isMounted.current) {
            navigate(`?sortBy=${StateMain.pizzaSlice.sortBy}&category=${StateMain.pizzaSlice.category.index}${StateMain.pizzaSlice.search ? `&search=${StateMain.pizzaSlice.search}` : ""}`);
        };
        isMounted.current = true;
    }, [StateMain.pizzaSlice.category, StateMain.pizzaSlice.sortBy, StateMain.pizzaSlice.search]);
    //naverxu smena adresnoi stroki
    useEffect(() => {
        if (!isChangingState.current) {
            SetPizza();
        };
        isChangingState.current = false;
    }, [StateMain.pizzaSlice.category, StateMain.pizzaSlice.sortBy, StateMain.pizzaSlice.search]);
    //naverhu proverka na zagruzku filtrov iz adresnoi stroki,esli zagruzka v processe cod ne vipolnitsya

    /*useEffect(() => {
        if (!isMounted.current) {
            debugger
            if (window.location.search) {
                const params = parse(window.location.search.substring(1)) as URLstring
                dispatch(setCategory({ name: StateMain.pizzaSlice.categories[Number(params.category)], index: Number(params.category) }));
                dispatch(setSort(params.sortBy));
                //dispatch(ReceivePizza({ category: Number(params.category), sortby: params.sortBy, search: StateMain.pizzaSlice.search }));

            }
            else {
                navigate(`?sortBy=${StateMain.pizzaSlice.sortBy}&category=${StateMain.pizzaSlice.category.index}`);
                dispatch(ReceivePizza({ category: StateMain.pizzaSlice.category.index, sortby: StateMain.pizzaSlice.sortBy, search: StateMain.pizzaSlice.search }));
            }
        }
        else {
            dispatch(ReceivePizza({ category: StateMain.pizzaSlice.category.index, sortby: StateMain.pizzaSlice.sortBy, search: StateMain.pizzaSlice.search }));
            navigate(`?sortBy=${StateMain.pizzaSlice.sortBy}&category=${StateMain.pizzaSlice.category.index}`);
        }
        isMounted.current = true;
    }, [StateMain.pizzaSlice.category, StateMain.pizzaSlice.sortBy, StateMain.pizzaSlice.search])*/

    return (
        <div className={styles.content}>
            {StateMain.pizzaSlice.loading ? <div className={styles.loading}><img alt={"loading"} src={loadingImg} /></div> : <div className={styles.pizzas}>{PizzasPack}</div>}
        </div>
    );

};
export default Homepage;