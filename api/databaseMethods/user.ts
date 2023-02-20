import {firestore} from "firebase-admin";
import Firestore = firestore.Firestore;
import {IUserData} from "../../interfaces/users";
import {USERS} from "./COLLECTION_NAMES";
import {ResponseError} from "../../enums/responses";

export const updateUserData = function (db: Firestore, userData: IUserData): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
        try {
            await db.collection(USERS).doc(userData.login).set(userData);
            resolve(true);
        } catch (error) {
            reject({ message: ResponseError.BAD_REQUEST });
        }
    });
}