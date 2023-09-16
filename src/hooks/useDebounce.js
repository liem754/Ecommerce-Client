import { useEffect, useState } from "react";

const useDebounce = (value, ms) => {
    const [debounceValue, setDebounceValue] = useState("");
    useEffect(() => {
        const time = setTimeout(() => {
            setDebounceValue(value);
        }, ms);
        return () => {
            clearTimeout(time);
        };
    }, [value, ms]);
    return debounceValue;
};

export default useDebounce;
