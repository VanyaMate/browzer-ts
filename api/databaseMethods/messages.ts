import {firestore} from "firebase-admin";
import Firestore = firestore.Firestore;
import {IMessage} from "../../interfaces/messages";
import {MESSAGES} from "./COLLECTION_NAMES";

export const getMessage = function (db: Firestore, messageId: string): Promise<IMessage> {
    return new Promise<IMessage>(async (resolve, reject) => {
        const document = await db.collection(MESSAGES).doc(messageId).get();
        const message: IMessage = document.data() as IMessage;

        if (message) resolve(message)
        else reject();
    })
}

export const createMessage = function (db: Firestore, message: IMessage): Promise<IMessage> {
    return new Promise<IMessage>(async (resolve, reject) => {
        await db.collection(MESSAGES).doc(message.id).set(message);
        resolve(message);
    });
}

export const updateMessage = function (db: Firestore, message: IMessage): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
        await db.collection(MESSAGES).doc(message.id).set(message);
        resolve(true);
    })
}

export const deleteMessage = function (db: Firestore, messageId: string): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
        await db.collection(MESSAGES).doc(messageId).delete();
    })
}