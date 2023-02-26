import React from 'react';
import css from './BigButton.module.scss';

const BigButton = (props: any) => {
    return (
        <div
            className={[
                css.button,
                props.active ? css.active : '',
                props.always ? css.always : ''
            ].join(' ')}
            onClick={props.onClick}
        >
            {props.children}
        </div>
    );
};

export default BigButton;