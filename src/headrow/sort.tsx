import { useEffect, useRef, useState } from "react";
import { setSort } from "../store/pizzaSlice";
import styles from "./sort.module.scss";

const Sort: React.FC<any> = (props) => {

    let [activeShow, setSortState] = useState(false);
    const sortRef = useRef<HTMLDivElement>(null);
    const SortBy = [{ name: "Популярности", sort: "rating" }, { name: "Цене", sort: "price" }, { name: "Алфавиту", sort: "name" }];
    useEffect(() => {
        const clickOutside = (event: MouseEvent) => {
            if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
                setSortState(false);
            };
        };
        document.body.addEventListener('click', clickOutside);
        return () => document.body.removeEventListener('click', clickOutside);
    }, []);

    return (
        <div className={styles.sort} ref={sortRef} >
            <div className={styles.label}>

                <b >Сортировка по:</b>
                <span onClick={() => setSortState(!activeShow)}>
                    {SortBy.map((element) => {
                        if (element.sort === props.CurrentSort)
                            return element.name;
                        return null;
                    }
                    )}</span>
            </div>
            {activeShow ? <div className={styles.sortpopup}>
                <ul>
                    {SortBy.map((element: { name: string, sort: string }, i) => {
                        return <li
                            onClick={() => {
                                setSortState(!activeShow);
                                props.dispatch(setSort(element.sort));
                            }}
                            key={element.name}
                            className={props.CurrentSort === element.name ? "active" : undefined}>
                            {element.name}
                        </li>
                    })}
                </ul>
            </div> : null
            }
        </div >
    )
};
export default Sort;