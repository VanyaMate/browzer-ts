import {
    IUserNotification,
    IUserPersonalInfo,
    IUserPersonalInfoItem,
    IUserPersonalInfoList,
    IUserPreferences
} from "./user";
import {IConversation} from "./conversations";

export interface IUserData extends IPrivateUserData {
    password: string
}

export interface IPublicUserData {
    login: string,
    avatar: string,
    creationTime: number,

    personalInfo: IUserPersonalInfo,
    friends?: IUserPersonalInfoList<string>
}

export interface IPrivateUserData {
    login: string,
    avatar: string,
    sessionKey: string,
    creationTime: number,

    preferences: IUserPreferences,
    personalInfo: IUserPersonalInfo,
    notifications: IUserNotification[],

    conversations: string[],

    friendsRequestIn: IPublicUserData[],
    friendsRequestOut: IPublicUserData[],
}

export interface IUserDataForCreate extends IUserRequestCreateData {
    sessionKey: string,
}

export interface IUserRequestCreateData {
    login: string,
    password: string,
    personalInfo: {
        firstName: IUserPersonalInfoItem,
        lastName: IUserPersonalInfoItem,
        telephone?: IUserPersonalInfoItem,
        email?: IUserPersonalInfoItem
    }
}