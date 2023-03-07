"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDebounce = void 0;
const react_1 = require("react");
const useDebounce = (value, delay) => {
    const [debounce, setDebounce] = (0, react_1.useState)(value);
    (0, react_1.useEffect)(() => {
        const timer = setTimeout(() => setDebounce(value), delay);
        return () => clearTimeout(timer);
    }, [value]);
    return debounce;
};
exports.useDebounce = useDebounce;
