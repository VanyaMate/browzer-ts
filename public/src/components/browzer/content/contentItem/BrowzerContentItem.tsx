import React from 'react';
import css from './BrowzerContentItem.module.scss';

const BrowzerContentItem = (props: any) => {
    return (
        <div className={css.container}>
            { props.children }
        </div>
    );
};

export default BrowzerContentItem;