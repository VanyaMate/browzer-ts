import React, {memo, useState} from 'react';
import css from './ControlButtons.module.scss';
import IconButton from "../../../../../UI/Buttons/IconButton/IconButton";
import {ComponentType} from "../../../../../../../../enums/blocks";
import {useBrowzerBlocks} from "../../../../../../hooks/useBrowzerBlocks";

const ControlButtons = memo((props: {
    index: number,
    setDropdownHidden: (v: boolean | ((prev: boolean) => boolean) ) => void,
    setAddComponentMenuHidden: (v: boolean | ((prev: boolean) => boolean) ) => void,
    activeHiddenOption: boolean,
    componentsAmount: number
}) => {
    const blocks = useBrowzerBlocks();
    const [adding, setAdding] = useState(false);

    return (
        <div className={css.container}>
            <IconButton
                active
                loading={adding}
                onClick={() => {
                    props.setAddComponentMenuHidden(prev => !prev);
                    props.setDropdownHidden(true);
                }}
            >
                +
            </IconButton>
            {
                props.componentsAmount > 3 ? <IconButton
                    active
                    always={props.activeHiddenOption}
                    onClick={() => {
                        props.setDropdownHidden(prev => !prev);
                        props.setAddComponentMenuHidden(true);
                    }}
                >
                    =
                </IconButton> : ''
            }
        </div>
    );
});

export default ControlButtons;