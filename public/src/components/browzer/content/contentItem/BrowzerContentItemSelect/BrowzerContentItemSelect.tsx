import React, {useMemo, useState} from 'react';
import {IBlock, IComponent} from "../../../../../../../interfaces/block";
import css from './BrowzerContentItemSelect.module.scss';
import {useBrowzerBlocks} from "../../../../../hooks/useBrowzerBlocks";
import ShowedOptions from "./ShowedOptions/ShowedOptions";
import ControlButtons from "./ControlButtons/ControlButtons";
import HiddenOptions from "./HiddenOptions/HiddenOptions";

const BrowzerContentItemSelect = (props: { block: IBlock, index: number, active: string, setActive: (id: string) => void }) => {
    const blocks = useBrowzerBlocks();
    const [showedOptions, hiddenOptions] = useMemo(() => {
        const components = [[], []] as IComponent[][];

        for (let i = 0; i < props.block.components.length; i++) {
            components[i < 3 ? 0 : 1].push(props.block.components[i]);
        }

        return components;
    }, [props.block.components])
    const [dropdownHidden, setDropdownHidden] = useState(true);

    return (
        <div className={css.container}>
            <ShowedOptions
                showedOptions={showedOptions}
                active={props.active}
                setActive={props.setActive}
                index={props.index}
            />
            <ControlButtons
                index={props.index}
                setDropdownHidden={setDropdownHidden}
                componentsAmount={props.block.components.length}
            />
            {
                props.block.components.length > 3 ? <HiddenOptions
                    dropdownHidden={dropdownHidden}
                    hiddenOptions={hiddenOptions}
                    setDropdownHidden={setDropdownHidden}
                    index={props.index}
                    active={props.active}
                    setActive={props.setActive}
                /> : ''
            }
        </div>
    );
};

export default BrowzerContentItemSelect;