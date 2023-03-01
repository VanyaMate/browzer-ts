import React, {memo} from 'react';
import css from './Button.module.scss';

const Button = memo((props: any) => {
    console.log(props.css?.active);

    return (
        <div
            className={[
                props.css ? props.css.button : css.button,
                props.active ? (props.css?.active || css.active) : '',
                props.always ? (props.css?.always || css.always) : '',
            ].join(' ')}
            onClick={props.onClick}
        >
            {props.children}
        </div>
    );
});

export default Button;