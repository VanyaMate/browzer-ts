import {NotificationType} from "../enums/notifications";
import {AccessType} from "../enums/user";
import {IPublicUserData} from "./users";

export interface IUserNotification<T> {
    id: string,
    status: boolean,
    type: NotificationType,
    data: T,
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

export interface IUserPersonalInfo<F> {
    firstName: IUserPersonalInfoItem,
    lastName: IUserPersonalInfoItem,
    telephone: IUserPersonalInfoItem,
    email: IUserPersonalInfoItem,
    friends: IUserPersonalInfoList<F>,
    musics: IUserPersonalInfoList<string>,
    photos: IUserPersonalInfoList<string>,
}


// Preferences
export interface IUserPreferences {
    conversations: AccessType,
    friends: AccessType,
}


