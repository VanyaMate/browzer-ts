import {IPrivateUserData, IPublicUserData, IUserData} from "../../interfaces/users";
import {getPublicPersonalInfo} from "./users";
import {IUserPersonalInfoList} from "../../interfaces/user";

export const getPublicUserData = function (ud: IUserData): IPublicUserData {
    return {
        login: ud.login,
        avatar: ud.avatar,
        personalInfo: getPublicPersonalInfo(ud.personalInfo),
        creationTime: ud.creationTime
    }
}

export const getPrivateUserData = function (ud: IUserData): IPrivateUserData {
    return {
        login: ud.login,
        avatar: ud.avatar,
        sessionKey: ud.sessionKey,
        creationTime: ud.creationTime,
        conversations: ud.conversations,
        personalInfo: ud.personalInfo,
        notifications: ud.notifications,
        preferences: ud.preferences,
        friendsRequestIn: ud.friendsRequestIn,
        friendsRequestOut: ud.friendsRequestOut
    }
}

export const checkIsFriendOf = function (login: string, friends: IUserPersonalInfoList<string>) {
    return friends.value.some((friend) => friend === login);
}
