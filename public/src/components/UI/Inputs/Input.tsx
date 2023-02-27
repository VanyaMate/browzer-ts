import React, {useEffect, useState} from 'react';
import css from './Input.module.scss';

const Input = (props: any) => {
    const { value, setValue, valid, empty } = props.hook;

    return (
        <div className={[
            css.container,
            empty ? '' : valid ? css.valid : css.noValid
        ].join(' ')}>
            <input
                className={css.input}
                type={props.type || 'text'}
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder={props.placeholder}
            />
        </div>
    );
};

export default Input;