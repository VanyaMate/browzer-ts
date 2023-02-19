import {firestore} from "firebase-admin";
import Firestore = firestore.Firestore;
import {IUserData} from "../../interfaces/users";
import {USERS} from "./COLLECTION_NAMES";
import DocumentData = firestore.DocumentData;
import {ResponseError} from "../../enums/responses";
import {compare} from "../utils/bcrypt";

export enum AuthType {
    SESSION_KEY = 'sessionKey',
    PASSWORD = 'password'
}

export const checkUserAccess = function (db: Firestore, auth: [string, string] | null, type: AuthType): Promise<IUserData> {
    return new Promise<IUserData>(async (resolve, reject) => {
        if (auth) {
            const [login, authKey] = auth;
            const document: DocumentData = await db.collection(USERS).doc(login).get();
            const userData: IUserData = document.data();
            const dbKey = userData[type];

            if ((type === AuthType.PASSWORD) ? await compare(authKey, dbKey) : (authKey === dbKey)) {
                resolve(userData);
                return;
            }
        }

        reject({message: ResponseError.BAD_AUTH});
    })
}