import {firestore} from "firebase-admin";
import Firestore = firestore.Firestore;
import {INotification, INotificationData} from "../../interfaces/notifications";
import {NOTIFICATIONS} from "./COLLECTION_NAMES";
import {IUserData} from "../../interfaces/users";
import {NotificationType} from "../../enums/notifications";
import {getUserDataByLogin} from "./users";
import * as crypto from "crypto";
import {ResponseError} from "../../enums/responses";

export const createNotificationData = function (
    targetId: string,
    type: NotificationType,
    data: INotificationData
): INotification | null {
    if (!type || !data) return null;
    return {
        type,
        data,
        targetId,
        status: false,
        id: crypto.randomUUID(),
        creationTime: Date.now()
    }
}

export const addNotification = function (
    db: Firestore,
    user: IUserData | string,
    type: NotificationType,
    data: INotificationData
): Promise<INotification> {
    return new Promise<INotification>(async (resolve, reject) => {
        try {
            const userData = typeof(user) === 'string' ?
                await getUserDataByLogin(db, user) : user;
            const notification: INotification | null = createNotificationData(userData.login, type, data);

            if (notification) {
                await db.collection(NOTIFICATIONS).doc(notification.id).set(data);

                resolve(notification);
            } else {
                reject({ message: ResponseError.NO_VALID_DATA })
            }
        } catch (_) {
            reject({ message: ResponseError.NO_VALID_DATA });
        }
    })
}

export const changeNotificationStatus = function (
    db: Firestore,
    id: string,
    status: boolean
): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
        const document = await db.collection(NOTIFICATIONS).doc(id).get();
        const data: INotification = document.data() as INotification;
        data.status = status;
        await db.collection(NOTIFICATIONS).doc(id).set(data);
        resolve(true);
    });
}