import {SearchType} from "../../../../../../../../enums/searchTypes";
import SearchUserComponent from "./SearchUsersComponent/SearchUserComponent";
import {JSXElementConstructor} from "react";
import SearchMusicComponent from "./SearchMusicComponent/SearchMusicComponent";

export const searchComponentsList: { [key: string]: { name: string, Component: JSXElementConstructor<any> }[] } = {
    [SearchType.ALL]: [
        {
            name: 'users',
            Component: SearchUserComponent
        },
        {
            name: 'music',
            Component: SearchMusicComponent
        }
    ],
    [SearchType.USERS]: [
        {
            name: 'users',
            Component: SearchUserComponent
        },
    ],
    [SearchType.MUSIC]: [
        {
            name: 'music',
            Component: SearchMusicComponent
        }
    ]
}