import React from 'react';
import BrowzerHeaderItem from "./headerItem/BrowzerHeaderItem";
import css from './BrowzerHeader.module.scss';

const BrowzerHeader = () => {
    return (
        <div className={css.container}>
            <BrowzerHeaderItem>[ BrowzerHeaderItem #1 ]</BrowzerHeaderItem>
            <BrowzerHeaderItem>[ BrowzerHeaderItem #2 ]</BrowzerHeaderItem>
            <BrowzerHeaderItem>[ BrowzerHeaderItem #3 ]</BrowzerHeaderItem>
        </div>
    );
};

export default BrowzerHeader;