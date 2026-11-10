import styles from "./searchrow.module.scss";
import clearImg from "./../assets/clear.jpg"
import { useCallback, useRef, useState } from "react";
import { setSearch } from "../store/pizzaSlice";
import debounce from "lodash.debounce";
const SearchRow: React.FC<{ dispatch: any, search: string }> = (props) => {
    const [searchVal, changeVal] = useState(props.search);
    const inputRef = useRef<HTMLInputElement>(null);
    const Search = useCallback(
        debounce((value: string) => {
            props.dispatch(setSearch(value));
        }, 1000), []);
    return (
        <div className={styles.wrapper}>
            <input className={styles.input}
                placeholder="Поиск..."
                value={searchVal}
                ref={inputRef}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    Search(event.currentTarget.value);
                    changeVal(event.currentTarget.value);
                }} />
            {searchVal ? <img alt={"clearSearchRow"} className={styles.clearImg} onClick={() => {
                props.dispatch(setSearch(""));
                changeVal("");
            }} src={clearImg} /> : null}
        </div>);
};
export default SearchRow;