import React, {memo, useState} from 'react';
import css from './ControlButtons.module.scss';
import IconButton from "../../../../../UI/Buttons/IconButton/IconButton";
import {ComponentType} from "../../../../../../../../enums/blocks";
import {useBrowzerBlocks} from "../../../../../../hooks/useBrowzerBlocks";

const ControlButtons = memo((props: {
    index: number,
    setDropdownHidden: (v: boolean | ((prev: boolean) => boolean) ) => void,
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
                    setAdding(true);
                    blocks.addComponent(props.index, 'Component', ComponentType.CONVERSATIONS, (error) => {
                        setAdding(false);
                    })
                    props.setDropdownHidden(false);
                }}
            >
                +
            </IconButton>
            {
                props.componentsAmount > 3 ? <IconButton
                    active
                    onClick={() => {
                        props.setDropdownHidden(prev => !prev);
                    }}
                >
                    =
                </IconButton> : ''
            }
        </div>
    );
});

export default ControlButtons;