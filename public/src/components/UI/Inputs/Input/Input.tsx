import React, {memo, useEffect, useState} from 'react';
import css from './Input.module.scss';

const Input = memo((props: any) => {
    const { value, setValue, valid, empty } = props.hook;
    const { reff } = props;

    return (
        <div className={[
            css.container,
            empty ? '' : valid ? css.valid : css.noValid,
            props.className ? props.className : ''
        ].join(' ')}>
            <input
                ref={reff}
                className={css.input}
                type={props.type || 'text'}
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder={props.placeholder}
                onFocus={props.onFocus}
                onBlur={props.onBlur}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        setTimeout(() => {
                            props.onSubmit && props.onSubmit();
                        });
                    }
                }}
            />
        </div>
    );
});

export default Input;