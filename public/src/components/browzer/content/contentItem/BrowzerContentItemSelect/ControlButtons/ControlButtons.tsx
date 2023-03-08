import React, {memo, useState} from 'react';
import css from './ControlButtons.module.scss';
import IconButton from "../../../../../UI/Buttons/IconButton/IconButton";
import {useBrowzerBlocks} from "../../../../../../hooks/useBrowzerBlocks";
import SmallIcon from "../../../../../UI/Icons/SmallIcon/SmallIcon";
import {serverAssetsUrl} from "../../../../../../common/consts";

const ControlButtons = memo((props: {
    index: number,
    setDropdownHidden: (v: boolean | ((prev: boolean) => boolean) ) => void,
    setAddComponentMenuHidden: (v: boolean | ((prev: boolean) => boolean) ) => void,
    activeHiddenOption: boolean,
    addComponentMenuHidden: boolean,
    componentsAmount: number
}) => {
    const blocks = useBrowzerBlocks();
    const [adding, setAdding] = useState(false);

    return (
        <div className={css.container}>
            <IconButton
                active
                always={!props.addComponentMenuHidden}
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
                    <SmallIcon
                        src={`${serverAssetsUrl}/icons/list.png`}
                        className={[css.icon, props.activeHiddenOption ? css.active : '']}
                    />
                </IconButton> : ''
            }
        </div>
    );
});

export default ControlButtons;