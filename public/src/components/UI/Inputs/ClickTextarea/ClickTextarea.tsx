import React, {memo, useEffect, useRef, useState} from 'react';
import css from './ClickTextarea.module.scss';
import {useInputValue} from "../../../../hooks/useInputValue";
import TextArea from "../Textarea/TextArea";

const ClickTextarea = memo((props: {
    value: string,
    successHandler?: (value: string) => void,
    errorHandler?: () => void,
    className?: string[],
    validator?: (v: string) => boolean
}) => {
    const inputValue = useInputValue(props.value, props.validator);
    const [redactMod, setRedactMod] = useState(false);
    const [previousTimer, setPreviousTimer] = useState(Date.now());
    const [previousName, setPreviousName] = useState(props.value);
    const inputRef = useRef<HTMLInputElement>();
    const [makeHandler, setMakeHandler] = useState(false);

    useEffect(() => {
        if (!redactMod && makeHandler) {
            if (inputValue.valid) {
                setPreviousName(inputValue.value);
                props.successHandler && props.successHandler(inputValue.value);
            } else {
                inputValue.setValue(previousName);
                props.errorHandler && props.errorHandler();
            }

            setMakeHandler(false);
        }
    }, [redactMod]);

    const enterHandler = function (e: KeyboardEvent) {
        if (e.key === 'Enter' && !e.shiftKey) {
            setRedactMod(false);
            window.removeEventListener('keydown', enterHandler);
        }
    }

    const clickHandler = function () {
        if (redactMod) return;

        setPreviousTimer(prev => {
            if ((Date.now() - prev) < 300 && !redactMod) {
                setRedactMod(true);
                setPreviousName(inputValue.value);
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
                redactMod ? <TextArea
                    reff={inputRef}
                    hook={inputValue}
                    className={[css.input, props.className ?? ''].flat().join(' ')}
                /> : <div className={css.value} dangerouslySetInnerHTML={{__html: previousName.replace(/\n/g, '<br>')}}/>
            }
        </div>
    );
});

export default ClickTextarea;