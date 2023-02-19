import {NotificationType} from "../enums/notifications";

export interface INotificationData {
    icon: string,
    title: string,
    message: string,
    data: any
}

export interface INotification {
    type: NotificationType,
    data: INotificationData,
    status: boolean,
    id: string
}