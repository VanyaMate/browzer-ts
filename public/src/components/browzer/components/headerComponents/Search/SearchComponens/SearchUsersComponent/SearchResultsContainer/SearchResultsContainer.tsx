import React, {memo, useMemo} from 'react';
import {IPublicUserData} from "../../../../../../../../../../interfaces/users";
import css from './SearchResultsContainer.module.scss';
import SearchUserItem from "../SearchUserItem/SearchUserItem";
import Vertical from "../../../../../../../UI/Lists/Vertical/Vertial/Vertical";

const SearchResultsContainer = memo((props: {
    isFetching: boolean,
    result: IPublicUserData<string>[]
}) => {
    return (
        <Vertical className={[css.container, props.isFetching ? css.loading : ''].join(' ')}>
            {
                props.result.length ?
                    props.result.map((user) => <SearchUserItem key={user.login} user={user}/>) :
                    'Нет результатов'
            }
        </Vertical>
    );
});

export default SearchResultsContainer;