import React, {useEffect, useState} from 'react';
import css from './Input.module.scss';

const Input = (props: any) => {
    return (
        <div className={[
            css.container,
            props.empty ? '' : props.valid ? css.valid : css.noValid
        ].join(' ')}>
            <input
                className={css.input}
                type="text"
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
            />
        </div>
    );
};

export default Input;