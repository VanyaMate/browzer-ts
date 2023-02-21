import {firestore} from "firebase-admin";
import Firestore = firestore.Firestore;
import {IMessage} from "../../interfaces/messages";
import {MESSAGES} from "./COLLECTION_NAMES";
import QueryDocumentSnapshot = firestore.QueryDocumentSnapshot;
import conversations from "../conversations";

export const getMessageSnapWithOffset = async function (
    db: Firestore,
    conversationId: string,
    offset: number
): Promise<QueryDocumentSnapshot> {
    const snapList = await db
        .collection(MESSAGES)
        .orderBy('creationTime', 'desc')
        .where('conversationId', '==', conversationId)
        .limit(offset)
        .get();

    return snapList.docs[offset - 1];
}

export const getMessagesWithSnapOffsetWithLimit = async function (
    db: Firestore,
    conversationId: string,
    offsetSnap: QueryDocumentSnapshot,
    limit: number
) {
    return await db
        .collection(MESSAGES)
        .orderBy('creationTime', 'desc')
        .where('conversationId', '==', conversationId)
        .startAfter(offsetSnap)
        .limit(limit)
        .get();
}

export const getMessages = async function (
    db: Firestore,
    conversationId: string,
    limit: number,
): Promise<IMessage[]> {
    const list = await db
        .collection(MESSAGES)
        .orderBy('creationTime', 'desc')
        .where('conversationId', '==', conversationId)
        .limit(limit)
        .get();

    return list.docs.map((message) => message.data() as IMessage);
}

export const getMessage = function (db: Firestore, messageId: string): Promise<IMessage> {
    return new Promise<IMessage>(async (resolve, reject) => {
        const document = await db.collection(MESSAGES).doc(messageId).get();
        const message: IMessage = document.data() as IMessage;

        if (message) resolve(message)
        else reject();
    })
}

export const getMessagesFromConversation = function (
    db: Firestore,
    conversationId: string,
    limit: number,
    offset: number
): Promise<IMessage[]> {
    return new Promise<IMessage[]>(async (resolve, reject) => {
        try {
            if (
                (conversationId !== undefined) &&
                (limit !== undefined) &&
                (offset !== undefined)
            ) {
                if (offset === 0) {
                    const messages: IMessage[] = await getMessages(db, conversationId, limit);
                    resolve(messages);
                    return;
                }

                const offsetLast = await getMessageSnapWithOffset(db, conversationId, offset);

                if (offsetLast) {
                    const limitSnap = await getMessagesWithSnapOffsetWithLimit(db, conversationId, offsetLast, limit);
                    const messages: IMessage[] = limitSnap.docs.map((message) => message.data() as IMessage);
                    resolve(messages);
                    return;
                }
            }

            reject();
        } catch (error) {
            reject();
        }
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