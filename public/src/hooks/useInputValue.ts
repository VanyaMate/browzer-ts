import {useEffect, useState} from "react";

export interface IUserInputValue {
    value: string,
    setValue: (v: string) => void,
    valid: boolean,
    empty: boolean
}

export const useInputValue = (initialValue?: string, validator?: (v: string) => boolean): IUserInputValue => {
    const [value, setValue] = useState(initialValue ?? '');
    const [valid, setValid] = useState(validator ? validator(value) : true);
    const [empty, setEmpty] = useState(value === '');

    useEffect(() => {
        setValid(validator ? validator(value) : true);
        setEmpty(value === '');
    }, [value])

    return { value, setValue, valid, empty };
}