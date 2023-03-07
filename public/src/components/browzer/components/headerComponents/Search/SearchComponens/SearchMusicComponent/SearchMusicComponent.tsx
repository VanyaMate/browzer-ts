import React from 'react';
import css from "../SearchUsersComponent/SearchUserComponent.module.scss";
import SmallTitle from "../../../../../../UI/Titles/SmallTitle/SmallTitle";

const SearchMusicComponent = (props: {
    value: string,
    openResults: (c: ((v: boolean) => boolean) | boolean) => void,
    openTypes: (v: boolean) => void
}) => {
    return (
        <div className={css.container}>
            <SmallTitle>Музыка</SmallTitle>
            {
                props.value.trim().length > 1 ? <div>Поиск по: { props.value }</div> : 'Пустой запрос'
            }
        </div>
    );
};

export default SearchMusicComponent;