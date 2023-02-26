import {useEffect, useState} from "react";

export const useInputValue = (initialValue?: string, validator?: (v: string) => boolean): [
    string, (v: string) => void, boolean, boolean
] => {
    const [value, setValue] = useState(initialValue ?? '');
    const [valid, setValid] = useState(validator ? validator(value) : true);
    const [empty, setEmpty] = useState(value === '');

    useEffect(() => {
        setValid(validator ? validator(value) : true);
        setEmpty(value === '');
    }, [value])

    return [ value, setValue, valid, empty ];
}