import {firestore} from "firebase-admin";
import Firestore = firestore.Firestore;
import {USERS} from "./collectionsNames";
import DocumentReference = firestore.DocumentReference;
import {IPrivateUserData, IPublicUserData, IUserData} from "../../interfaces/users";
import {convertToPublic} from "../utils/usersMethods";
import {ResponseError} from "../../enums/responses";

export const checkLoginExist = function (db: Firestore, login: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
        try {
            const query: DocumentReference = db.collection(USERS).doc(login);
            const userData: IUserData = (await query.get()).data() as IUserData;
            resolve(userData === undefined);
        } catch (_) {
            reject({ message: ResponseError.BAD_REQUEST });
        }
    })
}

export const getUserDataByLogin = function (db: Firestore, login: string): Promise<IPublicUserData> {
    return new Promise(async (resolve: (data: IPublicUserData) => void, reject) => {
        const query: DocumentReference = db.collection(USERS).doc(login);
        const userData: IUserData = (await query.get()).data() as IUserData;

        if (userData !== undefined) {
            const publicData = convertToPublic(userData);
            resolve(publicData);
        } else {
            reject({ message: ResponseError.NO_FIND })
        }
    });
}

export const getPrivateUserDataByLogin = function (db: Firestore, login: string): Promise<IPrivateUserData> {
    return new Promise((resolve: (data: IPrivateUserData) => void, reject) => {

    });
}

export const createUser = function (db: Firestore, userData: IUserData): Promise<IUserData> {
    return new Promise<IUserData>(async (resolve: (data: IUserData) => void, reject) => {
        const query = await db.collection(USERS).doc(userData.login).set(userData);
        resolve(userData);
    });
}