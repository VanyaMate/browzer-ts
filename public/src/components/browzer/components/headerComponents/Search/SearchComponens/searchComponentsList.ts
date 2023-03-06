import {SearchType} from "../../../../../../../../enums/searchTypes";
import SearchUserComponent from "./SearchUsersComponent/SearchUserComponent";
import {JSXElementConstructor} from "react";

export const searchComponentsList: { [key: string]: { name: string, Component: JSXElementConstructor<any> }[] } = {
    [SearchType.ALL]: [
        {
            name: 'users',
            Component: SearchUserComponent
        }
    ]
}