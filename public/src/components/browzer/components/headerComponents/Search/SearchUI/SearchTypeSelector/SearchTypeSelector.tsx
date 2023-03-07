import React, {MutableRefObject} from 'react';
import BigButton from "../../../../../../UI/Buttons/BigButton/BigButton";
import css from './SearchTypeSelector.module.scss';
import SmallIcon from "../../../../../../UI/Icons/SmallIcon/SmallIcon";
import {SearchType} from "../../../../../../../../../enums/searchTypes";
import DropdownAbsolute from "../../../../../../UI/Dropdowns/DropdownAbsolute";
import {searchComponentsList} from "../../SearchComponens/searchComponentsList";
import Button from "../../../../../../UI/Buttons/Button/Button";
import Vertical from "../../../../../../UI/Lists/Vertical/Vertial/Vertical";

const SearchTypeSelector = (props: {
    activeType: SearchType,
    setType: (t: SearchType) => void,
    openTypeDrop: boolean,
    setOpenTypeDrop: (c: boolean) => void,
    setOpenResultDrop: (c: boolean) => void,
    inputRef: MutableRefObject<HTMLInputElement | undefined>
}) => {
    return (
        <div className={css.container}>
            <BigButton
                className={css.button}
                active
                onClick={() => {
                    props.setOpenTypeDrop(!props.openTypeDrop);
                    props.setOpenResultDrop(false);
                }}
            >
                <div className={css.text}>/{ props.activeType.toLocaleLowerCase() }</div>
            </BigButton>
            <DropdownAbsolute
                className={[css.dropdown]}
                hide={!props.openTypeDrop}
            >
                <Vertical>
                    {
                        Object.keys(searchComponentsList).map((key) => {
                            return <Button
                                key={key}
                                active
                                className={css.dropButton}
                                onClick={() => {
                                    props.setOpenTypeDrop(false);
                                    props.setType(key as SearchType);
                                    props.inputRef.current?.focus();
                                    props.setOpenResultDrop(true);
                                }}
                            >
                                /{ key.toLowerCase() }
                            </Button>
                        })
                    }
                </Vertical>
            </DropdownAbsolute>
        </div>
    );
};

export default SearchTypeSelector;