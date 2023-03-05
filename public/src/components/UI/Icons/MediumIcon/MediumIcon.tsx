import React from 'react';
import css from './MediumIcon.module.scss';

const MediumIcon = (props: {src: string, br?: boolean, alt?: string}) => {
    return (
        <img
            className={[css.img, props.br ? css.br : ''].join(' ')}
            src={props.src}
            alt={props.alt ?? ''}
        />
    );
};

export default MediumIcon;