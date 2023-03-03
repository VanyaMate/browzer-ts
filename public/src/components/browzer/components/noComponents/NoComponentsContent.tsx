import React, {useState} from 'react';
import Button from "../../../UI/Buttons/Button/Button";
import {ComponentType} from "../../../../../../enums/blocks";
import {useBrowzerBlocks} from "../../../../hooks/useBrowzerBlocks";
import css from './NoComponentsContent.module.scss';
import ComponentSelector from "../../UI/ComponentSelector";

const NoComponentsContent = (props: { index: number }) => {
    return (
        <div className={css.container}>
            <ComponentSelector hide={false} index={props.index}/>
        </div>
    );
};

export default NoComponentsContent;