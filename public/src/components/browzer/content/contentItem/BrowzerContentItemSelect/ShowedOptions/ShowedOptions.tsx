import React, {memo} from 'react';
import css from './ShowedOptions.module.scss';
import {IComponent} from "../../../../../../../../interfaces/block";
import Button from "../../../../../UI/Buttons/Button/Button";
import ClickInput from "../../../../../UI/Inputs/ClickInput/ClickInput";
import AbsoluteButton from "../../../../../UI/Buttons/AbsoluteButton/AbsoluteButton";
import {useBrowzerBlocks} from "../../../../../../hooks/useBrowzerBlocks";
import Option from "../Option/Option";

const ShowedOptions = memo((props: {
    showedOptions: IComponent[],
    index: number,
    active: string,
    setActive: (v: string) => void }
) => {
    const { showedOptions, ...other } = props;

    return (
        <div className={css.container}>
            {
                props.showedOptions.map((option) => {
                    return <Option key={option.id} option={option} {...other}/>
                })
            }
        </div>
    );
});

export default ShowedOptions;