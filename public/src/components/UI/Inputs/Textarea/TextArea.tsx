import React, {memo, useEffect, useRef} from 'react';
import css from "./TextArea.module.scss";

const TextArea = memo((props: any) => {
    const { value, setValue, valid, empty } = props.hook;
    const { reff } = props;
    const textarea = useRef<HTMLTextAreaElement>(null);

    const authHeight = function (element: HTMLElement) {
        element.style.height = '19px';
        element.style.height = (element.scrollHeight || 19) + 'px';
    }

    useEffect(() => {
        authHeight(textarea.current as HTMLElement)
    }, [value])

    return (
        <div className={[
            css.container,
            empty ? '' : valid ? css.valid : css.noValid,
            props.className ? props.className : ''
        ].join(' ')}>
            <textarea
                ref={textarea}
                className={css.textarea}
                value={value}
                placeholder={props.placeholder}
                onChange={e => {
                    setValue(e.target.value)
                    setTimeout(() => {
                        authHeight(e.target as HTMLElement);
                    }, 10)
                }}
                onInput={e => authHeight(e.target as HTMLElement)}
                onFocus={(e) => {
                    authHeight(e.target as HTMLElement);
                    props.onFocus && props.onFocus();
                }}
                onBlur={props.onBlur}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        setTimeout(() => {
                            if (value.trim().length !== 0) {
                                props.onSubmit && props.onSubmit();
                            } else {
                                setValue('');
                            }
                        });
                    }
                }}
            />
        </div>
    );
});

export default TextArea;