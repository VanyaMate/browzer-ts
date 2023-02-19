import {IPrivateUserData, IPublicUserData, IUserData} from "../../interfaces/users";
import {getPublicPersonalInfo} from "./users";

export const getPublicUserData = function (ud: IUserData): IPublicUserData {
    return {
        login: ud.login,
        personalInfo: getPublicPersonalInfo(ud.personalInfo),
    }
}

export const getPrivateUserData = function (ud: IUserData): IPrivateUserData {
    return {
        login: ud.login,
        sessionKey: ud.sessionKey,
        conversations: ud.conversations,
        personalInfo: ud.personalInfo,
        notifications: ud.notifications,
        preferences: ud.preferences,
        friendsRequestIn: ud.friendsRequestIn,
        friendsRequestOut: ud.friendsRequestOut
    }
}
