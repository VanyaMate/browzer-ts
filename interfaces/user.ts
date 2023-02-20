import {NotificationType} from "../enums/notifications";
import {AccessType} from "../enums/user";

export interface IUserNotification {
    id: string,
    status: boolean,
    type: NotificationType,
    data: any,
    creationTime: number
}

// Personal Info
export interface IUserPersonalInfoItem {
    value: string,
    hidden: boolean,
}

export interface IUserPersonalInfoList<T> {
    value: T[],
    hidden: boolean
}

export interface IUserPersonalInfo {
    firstName: IUserPersonalInfoItem,
    lastName: IUserPersonalInfoItem,
    telephone: IUserPersonalInfoItem,
    email: IUserPersonalInfoItem,
    friends: IUserPersonalInfoList<string>,
    musics: IUserPersonalInfoList<string>,
    photos: IUserPersonalInfoList<string>,
}


// Preferences
export interface IUserPreferences {
    conversations: AccessType,
    friends: AccessType,
}


