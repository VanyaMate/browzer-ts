import {firestore} from "firebase-admin";
import Firestore = firestore.Firestore;
import {INotification, INotificationData} from "../../interfaces/notifications";
import {MESSAGES, NOTIFICATIONS} from "./COLLECTION_NAMES";
import {IUserData} from "../../interfaces/users";
import {NotificationType} from "../../enums/notifications";
import {getUserDataByLogin} from "./users";
import * as crypto from "crypto";
import {ResponseError} from "../../enums/responses";
import QuerySnapshot = firestore.QuerySnapshot;
import {socketManager} from "../../index";
import socket from "socket.io";

export const createNotificationData = function (
    target: string,
    type: NotificationType,
    data: INotificationData
): INotification<string> | null {
    if (!type || !data) return null;
    return {
        type,
        data,
        target,
        status: false,
        id: crypto.randomUUID(),
        creationTime: Date.now()
    }
}

export const addNotification = function (
    db: Firestore,
    user: IUserData<string, string, string> | string,
    type: NotificationType,
    data: INotificationData
): Promise<INotification<string>> {
    return new Promise<INotification<string>>(async (resolve, reject) => {
        try {
            const userData = typeof(user) === 'string' ?
                await getUserDataByLogin(db, user) : user;
            const notification: INotification<string> | null = createNotificationData(userData.login, type, data);

            if (notification) {
                await db.collection(NOTIFICATIONS).doc(notification.id).set(notification);
                userData.notifications.push(notification.id);

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
        const data = document.data() as INotification<string>;
        data.status = status;
        await db.collection(NOTIFICATIONS).doc(id).set(data);
        resolve(status);
    });
}

export const getNotificationsById = function (
    db: Firestore,
    ids: string[]
): Promise<INotification<string>[]> {
    return new Promise<INotification<string>[]>(async (resolve, reject) => {
        try {
            if (ids.length === 0) {
                resolve([]);
                return;
            }

            const collection = db.collection(NOTIFICATIONS);
            const batches = [];

            while (ids.length) {
                const batch = ids.splice(0, 10);
                batches.push(collection
                    .where('id', 'in', batch)
                    .get()
                    .then((queryResult) =>
                        queryResult.docs.map((notif) => notif.data() as INotification<string>)
                    )
                )
            }

            const notifications: INotification<string>[] = await Promise.all(batches).then(batches => batches.flat())
            resolve(notifications.sort((a, b) => a.creationTime - b.creationTime));
        }
        catch (_) {
            reject(_);
        }
    })
}