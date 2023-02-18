export enum AccessType {
    ALL = "ALL",
    FRIENDS = "FRIENDS",
    NO_ONE = "NO_ONE",
}

export enum NotificationType {
    MESSAGE = "MESSAGE",
    FRIEND_IN_REQUEST = "FRIEND_IN-REQUEST",
    FRIEND_IN_REQUEST_CANCELED = "FRIEND_IN-REQUEST_CANCELED",
    FRIEND_OUT_REQUEST = "FRIEND_OUT-REQUEST",
    FRIEND_OUT_REQUEST_CANCELED = "FRIEND_OUT-REQUEST_CANCELED",
    FRIEND_ACCEPT = "FRIEND_ACCEPT",
    NEW_CONVERSATION = "NEW_CONVERSATION",
}

export interface IUserNotification {
    id: string,
    status: boolean,
    type: NotificationType,
    data: any
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
    friendsRequestIn: IUserPersonalInfoList<string>,
    friendsRequestOut: IUserPersonalInfoList<string>,
    musics: IUserPersonalInfoList<string>,
    photos: IUserPersonalInfoList<string>,
}


// Preferences
export interface IUserPreferences {
    conversation: AccessType,
    friends: AccessType,
}


