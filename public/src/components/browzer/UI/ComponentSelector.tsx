import React, {useState} from 'react';
import css from './ComponentSelector.module.scss';
import DropdownAbsolute from "../../UI/Dropdowns/DropdownAbsolute";
import {useInputValue} from "../../../hooks/useInputValue";
import Vertical from "../../UI/Lists/Vertical/Vertial/Vertical";
import Input from "../../UI/Inputs/Input/Input";
import BrowzerContentItemsList from "../../../common/BrowzerContentItemsList";
import {validComponentName} from "../../../../../utils/validationMethods";
import Button from "../../UI/Buttons/Button/Button";
import {useBrowzerBlocks} from "../../../hooks/useBrowzerBlocks";
import SmallDottedSeparator from "../../UI/Separators/SmallDottedSeparator";

const ComponentSelector = (props: { hide: boolean, index: number }) => {
    const blocks = useBrowzerBlocks();
    const input = useInputValue('', validComponentName);
    const [selectedComponent, setSelectedComponent] = useState<any>();

    return (
        <DropdownAbsolute
            hide={props.hide}
            style={{top: 0, left: 0, width: '100%'}}
            className={[css.dropdown]}
        >
            <Vertical>
                <Input hook={input} placeholder={'Имя компонента'} className={css.inputName}/>
                <SmallDottedSeparator/>
                <Vertical>
                    {
                        Object.keys(BrowzerContentItemsList).map((key) => {
                            const component = BrowzerContentItemsList[key];
                            return <Button
                                key={key}
                                active
                                css={css}
                                always={key === selectedComponent}
                                onClick={() => {
                                    input.setValue(component.defaultTitle);
                                    setSelectedComponent(key)
                                }}
                                className={css.componentOption}
                            >{component.defaultTitle}</Button>
                        })
                    }
                </Vertical>
                <SmallDottedSeparator/>
                <Button
                    active={input.valid && selectedComponent}
                    onClick={() => {
                        blocks.addComponent(props.index, input.value, selectedComponent, (error) => {})
                    }}
                    className={css.addComponentButton}
                >Добавить</Button>
            </Vertical>
        </DropdownAbsolute>
    );
};

export default ComponentSelector;