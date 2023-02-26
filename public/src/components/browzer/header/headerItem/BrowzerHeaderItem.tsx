import React from 'react';
import css from './BrowzerHeaderItem.module.scss';

const BrowzerHeaderItem = (props: any) => {
    return (
        <div className={css.container}>
            { props.children }
        </div>
    );
};

export default BrowzerHeaderItem;