import {useEffect, useState} from "react";

export const useDebounce = (value: any, delay: number) => {
    const [debounce, setDebounce] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebounce(value), delay);
        return () => clearTimeout(timer);
    }, [value]);

    return debounce;
}