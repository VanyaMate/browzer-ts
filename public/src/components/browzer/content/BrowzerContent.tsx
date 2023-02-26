import React from 'react';
import BrowzerContentItem from "./contentItem/BrowzerContentItem";
import css from './BrowzerContent.module.scss';

const BrowzerContent = () => {
    return (
        <div className={css.container}>
            <BrowzerContentItem>[ BrowzerContentItem #1 ]</BrowzerContentItem>
            <BrowzerContentItem>[ BrowzerContentItem #2 ]</BrowzerContentItem>
            <BrowzerContentItem>[ BrowzerContentItem #3 ]</BrowzerContentItem>
        </div>
    );
};

export default BrowzerContent;