import React from 'react';
import css from './AbsoluteButton.module.scss';

const AbsoluteButton = (props: any) => {
    const { className, children, ...other } = props;

    return (
        <div {...other} className={[css.container, className].join(' ')}>
            { children }
        </div>
    );
};

export default AbsoluteButton;