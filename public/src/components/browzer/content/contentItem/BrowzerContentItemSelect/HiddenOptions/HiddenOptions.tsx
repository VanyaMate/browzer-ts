import React, {memo} from 'react';
import Vertical from "../../../../../UI/Lists/Vertical/Vertial/Vertical";
import Button from "../../../../../UI/Buttons/Button/Button";
import ClickInput from "../../../../../UI/Inputs/ClickInput/ClickInput";
import AbsoluteButton from "../../../../../UI/Buttons/AbsoluteButton/AbsoluteButton";
import DropdownAbsolute from "../../../../../UI/Dropdowns/DropdownAbsolute";
import {IComponent} from "../../../../../../../../interfaces/block";
import {useBrowzerBlocks} from "../../../../../../hooks/useBrowzerBlocks";
import Option from "../Option/Option";

const HiddenOptions = memo((props: {
    dropdownHidden: boolean,
    hiddenOptions: IComponent[],
    setDropdownHidden: (v: boolean | ((prev: boolean) => boolean) ) => void,
    index: number,
    active: string,
    setActive: (v: string) => void
}) => {
    const {dropdownHidden, hiddenOptions, setDropdownHidden, ...other} = props;

    return (
        <DropdownAbsolute
            hide={props.dropdownHidden}
            style={{
                top: '100%',
                right: 0,
                marginTop: 5,
                width: '150px'
            }}
        >
            <Vertical type={'bottom'}>
                {
                    props.hiddenOptions.map((option) => {
                        return <Option key={option.id} option={option} {...other}/>
                    })
                }
            </Vertical>
        </DropdownAbsolute>
    );
});

export default HiddenOptions;