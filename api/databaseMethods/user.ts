import {firestore} from "firebase-admin";
import Firestore = firestore.Firestore;
import {IUserData} from "../../interfaces/users";
import {USERS} from "./COLLECTION_NAMES";
import {ResponseError} from "../../enums/responses";
import {IConversation} from "../../interfaces/conversations";
import {getUserDataByLogin} from "./users";

export const updateUserData = function (db: Firestore, userData: IUserData<string, string, string>): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
        try {
            await db.collection(USERS).doc(userData.login).set(userData);
            resolve(true);
        } catch (error) {
            reject({ message: ResponseError.BAD_REQUEST });
        }
    });
}

export const removeConversationFromLogin = function (
    db: Firestore,
    login: string,
    conversationId: string
): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
        try {
            const userData = await getUserDataByLogin(db, login);

            if (userData) {
                userData.conversations = userData.conversations.filter(
                    (id: IConversation<any>|string) => id !== conversationId
                );
            }

            await updateUserData(db, userData);
            resolve(true);
        } catch (_) {
            reject(false);
        }
    })
}