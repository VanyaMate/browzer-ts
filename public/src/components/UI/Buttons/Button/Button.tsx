import React from 'react';
import css from './Button.module.scss';

const Button = (props: any) => {
    return (
        <div className={[css.button, props.active ? css.active : ''].join(' ')}>
            {props.children}
        </div>
    );
};

export default Button;