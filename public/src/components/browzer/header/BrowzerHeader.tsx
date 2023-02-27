import React from 'react';
import BrowzerHeaderItem from "./headerItem/BrowzerHeaderItem";
import css from './BrowzerHeader.module.scss';
import {useActions} from "../../../hooks/redux";
import Button from "../../UI/Buttons/Button/Button";

const BrowzerHeader = () => {
    const {resetAuth} = useActions();

    return (
        <div className={css.container}>
            <BrowzerHeaderItem>[ BrowzerHeaderItem #1 ]</BrowzerHeaderItem>
            <BrowzerHeaderItem>[ BrowzerHeaderItem #2 ]</BrowzerHeaderItem>
            <BrowzerHeaderItem>[ BrowzerHeaderItem #3 ]<Button onClick={() => {
                resetAuth();
            }} active={true}>Выйти</Button></BrowzerHeaderItem>
        </div>
    );
};

export default BrowzerHeader;