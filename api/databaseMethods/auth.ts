import {firestore} from "firebase-admin";
import Firestore = firestore.Firestore;
import {IUserData} from "../../interfaces/users";
import {ResponseError} from "../../enums/responses";
import {compare} from "../utils/bcrypt";
import {getUserDataByLogin} from "./users";

export enum AuthType {
    SESSION_KEY = 'sessionKey',
    PASSWORD = 'password'
}

export const checkUserAccess = function (db: Firestore, auth: [string, string] | null, type: AuthType): Promise<IUserData> {
    return new Promise<IUserData>(async (resolve, reject) => {
        if (auth) {
            const [login, authKey] = auth;
            const userData: IUserData = await getUserDataByLogin(db, login);
            const dbKey = userData[type];
            if ((type === AuthType.PASSWORD) ? await compare(authKey, dbKey) : (authKey === dbKey)) {
                resolve(userData);
                return;
            }
        }

        reject({message: ResponseError.BAD_AUTH});
    })
}