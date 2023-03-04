import React from 'react';
import css from './SmallTitle.module.scss';

const SmallTitle = (props: any) => {
    return (
        <div className={css.title}>
            {props.children}
        </div>
    );
};

export default SmallTitle;