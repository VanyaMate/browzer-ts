import React from 'react';
import BigButton from "../../../../../../UI/Buttons/BigButton/BigButton";
import css from './SearchResult.module.scss';
import SmallIcon from "../../../../../../UI/Icons/SmallIcon/SmallIcon";
import DropdownAbsolute from "../../../../../../UI/Dropdowns/DropdownAbsolute";
import {SearchType} from "../../../../../../../../../enums/searchTypes";
import {searchComponentsList} from "../../SearchComponens/searchComponentsList";

const SearchResult = (props: {
    value: string,
    opened: boolean,
    type: SearchType,
    openResults: (c: (v: boolean) => boolean) => void,
    openTypes: (v: boolean) => void
}) => {
    return (
        <div className={css.container}>
            <BigButton
                active
                className={[css.button, props.opened ? css.opened : '']}
                onClick={() => {
                    props.openResults && props.openResults((s) => !s);
                    props.openTypes && props.openTypes(false);
                }}
            >
                <SmallIcon
                    className={[css.icon]}
                    src={'http://localhost:3000/assets/icons/right-arrow.png'}
                />
            </BigButton>
            <DropdownAbsolute hide={!props.opened} className={[css.dropdown]}>
                {
                    searchComponentsList[props.type].map((component) => {
                        return <component.Component
                            key={component.name}
                            value={props.value}
                            openResults={props.openResults}
                            openTypes={props.openTypes}
                        />
                    })
                }
            </DropdownAbsolute>
        </div>
    );
};

export default SearchResult;