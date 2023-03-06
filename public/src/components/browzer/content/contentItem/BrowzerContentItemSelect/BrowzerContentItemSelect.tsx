import React, {useMemo, useState} from 'react';
import {IBlock, IComponent} from "../../../../../../../interfaces/block";
import css from './BrowzerContentItemSelect.module.scss';
import ShowedOptions from "./ShowedOptions/ShowedOptions";
import ControlButtons from "./ControlButtons/ControlButtons";
import HiddenOptions from "./HiddenOptions/HiddenOptions";
import ComponentSelector from "../../../UI/ComponentSelector";

const BrowzerContentItemSelect = (props: { block: IBlock, index: number, active: string, setActive: (id: string) => void }) => {
    const [showedOptions, hiddenOptions] = useMemo(() => {
        const components = [[], []] as IComponent[][];

        for (let i = 0; i < props.block.components.length; i++) {
            components[i < 3 ? 0 : 1].push(props.block.components[i]);
        }

        return components;
    }, [props.block.components])
    const activeHiddenOption = useMemo(() => {
        return hiddenOptions.some((option) => option.id === props.active);
    }, [hiddenOptions, props.active])
    const [dropdownHidden, setDropdownHidden] = useState(true);
    const [addComponentMenuHidden, setAddComponentMenuHidden] = useState(true);

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
                setAddComponentMenuHidden={setAddComponentMenuHidden}
                addComponentMenuHidden={addComponentMenuHidden}
                componentsAmount={props.block.components.length}
                activeHiddenOption={activeHiddenOption}
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
            <ComponentSelector
                hide={addComponentMenuHidden}
                index={props.index}
                successHandler={() => {
                    setAddComponentMenuHidden(true);
                    setDropdownHidden(false);
                }}
                errorHandler={() => {}}
            />
        </div>
    );
};

export default BrowzerContentItemSelect;