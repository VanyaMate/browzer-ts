"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useInputValue = void 0;
const react_1 = require("react");
const useInputValue = (initialValue, validator) => {
    const [value, setValue] = (0, react_1.useState)(initialValue !== null && initialValue !== void 0 ? initialValue : '');
    const [valid, setValid] = (0, react_1.useState)(validator ? validator(value) : true);
    const [empty, setEmpty] = (0, react_1.useState)(value === '');
    (0, react_1.useEffect)(() => {
        setValid(validator ? validator(value) : true);
        setEmpty(value === '');
    }, [value]);
    return { value, setValue, valid, empty };
};
exports.useInputValue = useInputValue;
