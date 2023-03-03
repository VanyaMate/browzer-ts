import React, {memo, useEffect, useRef, useState} from 'react';
import css from './ClickInput.module.scss';
import {useInputValue} from "../../../../hooks/useInputValue";
import Input from "../Input/Input";
import {validComponentName} from "../../../../../../utils/validationMethods";

const ClickInput = memo((props: any) => {
    const inputName = useInputValue(props.value, validComponentName);
    const [redactMod, setRedactMod] = useState(false);
    const [previousTimer, setPreviousTimer] = useState(Date.now());
    const [previousName, setPreviousName] = useState(props.value);
    const inputRef = useRef<HTMLInputElement>();

    useEffect(() => {
        if (!redactMod) {
            if (inputName.valid) {
                setPreviousName(inputName.value);
            } else {
                inputName.setValue(previousName);
            }
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