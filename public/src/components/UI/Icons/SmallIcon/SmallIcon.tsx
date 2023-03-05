import React from 'react';
import css from './SmallIcon.module.scss';

const SmallIcon = (props: {src: string, br?: boolean, alt?: string}) => {
    return (
        <img
            className={[css.img, props.br ? css.br : ''].join(' ')}
            src={props.src}
            alt={props.alt ?? ''}
        />
    );
};

export default SmallIcon;