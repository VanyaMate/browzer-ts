import React from 'react';
import css from './BrowzerHeaderItem.module.scss';

const BrowzerHeaderItem = (props: any) => {
    return (
        <div className={[css.container, props.nbg ? css.nbg : ''].join(' ')}>
            { props.children }
        </div>
    );
};

export default BrowzerHeaderItem;