import React, {memo, useEffect, useRef, useState} from 'react';
import css from './ClickInput.module.scss';
import {useInputValue} from "../../../../hooks/useInputValue";
import Input from "../Input/Input";
import {validComponentName} from "../../../../../../utils/validationMethods";

const ClickInput = memo((props: {
    value: string,
    successHandler?: (value: string) => void,
    errorHandler?: () => void
}) => {
    const inputName = useInputValue(props.value, validComponentName);
    const [redactMod, setRedactMod] = useState(false);
    const [previousTimer, setPreviousTimer] = useState(Date.now());
    const [previousName, setPreviousName] = useState(props.value);
    const inputRef = useRef<HTMLInputElement>();
    const [makeHandler, setMakeHandler] = useState(false);

    useEffect(() => {
        if (!redactMod && makeHandler) {
            if (inputName.valid) {
                setPreviousName(inputName.value);
                props.successHandler && props.successHandler(inputName.value);
            } else {
                inputName.setValue(previousName);
                props.errorHandler && props.errorHandler();
            }

            setMakeHandler(false);
        }
    }, [redactMod]);

    const enterHandler = function (e: KeyboardEvent) {
        if (e.key === 'Enter') {
            setRedactMod(false);
            window.removeEventListener('keydown', enterHandler);
        }
    }

    const clickHandler = function () {
        if (redactMod) return;

        setPreviousTimer(prev => {
            if ((Date.now() - prev) < 300 && !redactMod) {
                setRedactMod(true);
                setPreviousName(inputName.value);
                setMakeHandler(true);
                window.addEventListener('keydown', enterHandler);
                setTimeout(() => {
                    inputRef.current?.focus();
                })
            }

            return Date.now()
        })
    }

    return (
        <div className={css.container} onClick={() => clickHandler()}>
            {
                redactMod ? <Input reff={inputRef} hook={inputName} className={css.input}/> : <div>{ previousName }</div>
            }
        </div>
    );
});

export default ClickInput;