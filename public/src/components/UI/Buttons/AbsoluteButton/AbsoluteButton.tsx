import React from 'react';
import css from './AbsoluteButton.module.scss';

const AbsoluteButton = (props: any) => {
    return (
        <div {...props} className={css.container}>
            { props.children }
        </div>
    );
};

export default AbsoluteButton;