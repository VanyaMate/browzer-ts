import React from 'react';
import BigButton from "../../../../../../UI/Buttons/BigButton/BigButton";
import css from './SearchTypeSelector.module.scss';
import SmallIcon from "../../../../../../UI/Icons/SmallIcon/SmallIcon";

const SearchTypeSelector = () => {
    return (
        <BigButton
            className={css.container}
            active
        >
            <SmallIcon
                className={[css.icon]}
                src={'http://localhost:3000/assets/icons/list.png'}
            />
        </BigButton>
    );
};

export default SearchTypeSelector;