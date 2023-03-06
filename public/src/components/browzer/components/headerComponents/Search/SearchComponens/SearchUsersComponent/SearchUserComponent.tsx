import React, {useEffect, useMemo} from 'react';
import SmallTitle from "../../../../../../UI/Titles/SmallTitle/SmallTitle";
import {useLazyGetUsersListQuery} from "../../../../../../../store/users/users.api";
import SearchResultsContainer from "./SearchResultsContainer/SearchResultsContainer";

const SearchUserComponent = (props: {
    value: string,
    openResults: (c: ((v: boolean) => boolean) | boolean) => void,
    openTypes: (v: boolean) => void
}) => {
    const [dispatchGetUsersList, {isFetching, data: usersList}] = useLazyGetUsersListQuery();
    useEffect(() => {
        if (props.value.trim().length > 1) {
            dispatchGetUsersList({
                login: props.value,
                limit: 5,
                offset: 0
            })
        }
    }, [props.value])

    const result = useMemo(() => {
        if (usersList && usersList.length && (props.value.trim().length > 1)) {
            return usersList;
        } else {
            return [];
        }
    }, [usersList])

    return (
        <div>
            <SmallTitle>Пользователи</SmallTitle>
            <SearchResultsContainer isFetching={isFetching} result={result}/>
        </div>
    );
};

export default SearchUserComponent;