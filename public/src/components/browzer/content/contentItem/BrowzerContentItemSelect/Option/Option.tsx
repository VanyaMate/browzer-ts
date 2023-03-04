import React, {memo, useCallback, useState} from 'react';
import ClickInput from "../../../../../UI/Inputs/ClickInput/ClickInput";
import AbsoluteButton from "../../../../../UI/Buttons/AbsoluteButton/AbsoluteButton";
import Button from "../../../../../UI/Buttons/Button/Button";
import {IComponent} from "../../../../../../../../interfaces/block";
import {useBrowzerBlocks} from "../../../../../../hooks/useBrowzerBlocks";
import css from './Option.module.scss';

const Option = (props: {
    option: IComponent,
    setActive: (v: string) => void,
    active: string,
    index: number
}) => {
    const [removeFetching, setRemoveFetching] = useState(false);
    const blocks = useBrowzerBlocks();

    return (
        <Button
            onClick={() => props.setActive(props.option.id)}
            active
            always={props.active === props.option.id}
            style={{position: 'relative'}}
            className={removeFetching ? css.removeFetch : ''}
        >
            <ClickInput
                value={props.option.name}
                successHandler={(name: string) => {
                    blocks.renameComponent(props.index, props.option.id, name);
                }}
                errorHandler={() => {}}
            />
            <AbsoluteButton
                onClick={(e: Event) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setRemoveFetching(true);
                    blocks.removeComponent(props.index, props.option.id)
                }}
                style={{ top: -5, right: -5, }}
            >
                X
            </AbsoluteButton>
        </Button>
    );
};

export default Option;