import {firestore} from "firebase-admin";
import Firestore = firestore.Firestore;
import {INotification} from "../../interfaces/notifications";
import {NOTIFICATIONS} from "./COLLECTION_NAMES";

export const addNotification = function (db: Firestore, data: INotification): Promise<INotification> {
    return new Promise<INotification>(async (resolve, reject) => {
        await db.collection(NOTIFICATIONS).doc(data.id).set(data);
        resolve(data);
    })
}

export const changeNotificationStatus = function (db: Firestore, id: string, status: boolean): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
        const document = await db.collection(NOTIFICATIONS).doc(id).get();
        const data: INotification = document.data() as INotification;
        data.status = status;
        await db.collection(NOTIFICATIONS).doc(id).set(data);
        resolve(true);
    });
}