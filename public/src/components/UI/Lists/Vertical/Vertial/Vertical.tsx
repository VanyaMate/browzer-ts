import React from 'react';
import css from './Vertical.module.scss';

const Vertical = (props: any) => {
    return (
        <div className={[
            css.container,
            props.type === 'bottom' ? css.bottom : css.top
        ].join(' ')}>
            {props.children}
        </div>
    );
};

export default Vertical;