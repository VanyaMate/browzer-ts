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
import BigButton from "../../UI/Buttons/BigButton/BigButton";
import SmallTitle from "../../UI/Titles/SmallTitle/SmallTitle";

const ComponentSelector = (props: { hide: boolean, index: number, successHandler?: () => void, errorHandler?: () => void}) => {
    const blocks = useBrowzerBlocks();
    const input = useInputValue('', validComponentName);
    const [selectedComponent, setSelectedComponent] = useState<any>();
    const [loading, setLoading] = useState(false)

    return (
        <DropdownAbsolute
            hide={props.hide}
            style={{top: '100%', left: 0, width: '100%', marginTop: 5}}
            className={[css.dropdown]}
        >
            <Vertical>
                <SmallTitle>Выберите компонент</SmallTitle>
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
                <SmallTitle>Название компонента</SmallTitle>
                <Input hook={input} placeholder={'Имя компонента'} className={css.inputName}/>
                <SmallDottedSeparator/>
                <BigButton
                    active={input.valid && selectedComponent}
                    loading={loading}
                    onClick={() => {
                        setLoading(true);
                        blocks.addComponent(props.index, input.value, selectedComponent, (error) => {
                            setLoading(false);
                            setSelectedComponent('');
                            input.setValue('');

                            if (!error) {
                                props.successHandler && props.successHandler();
                            } else {
                                props.errorHandler && props.errorHandler();
                            }
                        })
                    }}
                    className={css.addComponentButton}
                >Добавить</BigButton>
            </Vertical>
        </DropdownAbsolute>
    );
};

export default ComponentSelector;