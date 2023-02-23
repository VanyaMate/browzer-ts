import {NotificationType} from "../enums/notifications";

export interface INotificationData {
    icon: string,
    title: string,
    message: string,
    data: any
}

export interface INotification<T> {
    type: NotificationType,
    data: INotificationData,
    status: boolean,
    target: T,
    id: string,
    creationTime: number
}