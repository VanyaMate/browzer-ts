import React, {useEffect, useRef, useState} from 'react';
import {useInputValue} from "../../../../../hooks/useInputValue";
import css from './Search.module.scss';
import Input from "../../../../UI/Inputs/Input/Input";
import SearchTypeSelector from "./SearchUI/SearchTypeSelector/SearchTypeSelector";
import SearchResult from "./SearchUI/SearchResult/SearchResult";
import {useDebounce} from "../../../../../hooks/useDebounce";
import {useLazyGetUsersListQuery} from "../../../../../store/users/users.api";
import {SearchType} from "../../../../../../../enums/searchTypes";

const Search = () => {
    const searchInput = useInputValue('', (s) => s.trim().length > 1);
    const [openResultDrop, setOpenResultDrop] = useState(false);
    const [openTypeDrop, setOpenTypeDrop] = useState(false);
    const searchValue = useDebounce(searchInput.value, 450);
    const [type, setType] = useState<SearchType>(SearchType.ALL);
    const input = useRef<HTMLInputElement>();

    useEffect(() => {
        if (searchInput.value.trim().length > 0) {
            setOpenResultDrop(true);
            setOpenTypeDrop(false);
        } else {
            setOpenResultDrop(false);
        }
    }, [searchInput.value])

    return (
        <div className={css.container}>
            <SearchTypeSelector
                activeType={type}
                setType={setType}
                openTypeDrop={openTypeDrop}
                setOpenTypeDrop={setOpenTypeDrop}
                setOpenResultDrop={setOpenResultDrop}
                inputRef={input}
            />
            <Input reff={input} hook={searchInput} placeholder={'Поиск'}/>
            <SearchResult
                value={searchValue}
                type={type}
                opened={openResultDrop}
                openResults={setOpenResultDrop}
                openTypes={setOpenTypeDrop}
            />
        </div>
    );
};

export default Search;