import {
    IUserPersonalInfo,
    IUserPersonalInfoItem,
    IUserPersonalInfoList,
    IUserPreferences
} from "./user";

export interface IUserData<F, N, C> extends IPrivateUserData<F, N, C> {
    password: string
}

export interface IPublicUserData<F> {
    login: string,
    avatar: string,
    creationTime: number,

    personalInfo: IUserPersonalInfo<F>,
    preferences: IUserPreferences
}

export interface IPrivateUserData<F, N, C> {
    login: string,
    avatar: string,
    sessionKey: string,
    creationTime: number,

    preferences: IUserPreferences,
    personalInfo: IUserPersonalInfo<F>,
    notifications: N[],

    conversations: C[],

    friendsRequestIn: F[],
    friendsRequestOut: F[],
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