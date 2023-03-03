import React, {memo} from 'react';
import css from './Button.module.scss';

const Button = memo((props: any) => {
    const {css: usedCss, active, always, loading, className, ...other} = props;

    return (
        <div
            className={[
                usedCss ? usedCss.button : css.button,
                active ? (usedCss?.active || css.active) : '',
                always ? (usedCss?.always || css.always) : '',
                loading ? (usedCss?.loading || css.loading) : '',
                className ? className : ''
            ].flat().join(' ')}
            {...other}
        >
            {props.children}
        </div>
    );
});

export default Button;