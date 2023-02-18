import {IUserNotification, IUserPersonalInfo, IUserPersonalInfoItem, IUserPreferences} from "./user";

export interface IUserData extends IPrivateUserData {
    password: string
}

export interface IPublicUserData {
    login: string,
    personalInfo: IUserPersonalInfo,
}

export interface IPrivateUserData {
    login: string,
    sessionId: string,

    preferences: IUserPreferences,
    personalInfo: IUserPersonalInfo,
    notifications: IUserNotification[],

    conversations: string[],
}

export interface IUserDataForCreate extends IUserRequestCreateData {
    sessionId: string,
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