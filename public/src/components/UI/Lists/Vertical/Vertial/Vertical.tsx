import React from 'react';
import css from './Vertical.module.scss';

const Vertical = (props: any) => {
    return (
        <div
            className={[
                css.container,
                props.className || '',
                props.type === 'bottom' ? css.bottom : css.top
            ].flat().join(' ')}
             style={props.style}
        >
            {props.children}
        </div>
    );
};

export default Vertical;