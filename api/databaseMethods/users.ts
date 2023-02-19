import {firestore} from "firebase-admin";
import Firestore = firestore.Firestore;
import {USERS} from "./COLLECTION_NAMES";
import DocumentReference = firestore.DocumentReference;
import {IPrivateUserData, IPublicUserData, IUserData} from "../../interfaces/users";
import {ResponseError} from "../../enums/responses";
import {getPrivateUserData, getPublicUserData} from "../methods/user";
import DocumentData = firestore.DocumentData;

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

export const getPublicUserDataByLogin = function (db: Firestore, login: string): Promise<IPublicUserData> {
    return new Promise(async (resolve: (data: IPublicUserData) => void, reject) => {
        try {
            const query: DocumentReference = db.collection(USERS).doc(login);
            const userData: IUserData = (await query.get()).data() as IUserData;

            if (userData !== undefined) {
                const publicData = getPublicUserData(userData);
                resolve(publicData);
            } else {
                reject({ message: ResponseError.NO_FIND })
            }
        }
        catch (_) {
            reject({ message: ResponseError.NO_FIND })
        }
    });
}

export const getPublicUsersDataByLogin = function (db: Firestore, login: string, limit: number = 5, offset: number = 0): Promise<IPublicUserData[]> {
    return new Promise<IPublicUserData[]>(async (resolve, reject) => {
        try {
            const document: DocumentData = await db.collection(USERS)
                .where('login', '>=', login)
                .where('login', '<=', login + '\uf8ff')
                .get();

            const users: IPublicUserData[] = [];
            for (let i = offset; (i < document.docs.length) && (i < (offset + limit)); i++) {
                users.push(getPublicUserData(document.docs[i].data()));
            }

            if (users.length) {
                resolve(users);
            } else {
                reject({ message: ResponseError.NO_FIND });
            }
        } catch (_: unknown) {
            reject({ message: ResponseError.NO_VALID_DATA });
        }
    })
}

export const createUser = function (db: Firestore, userData: IUserData): Promise<IPrivateUserData> {
    return new Promise<IPrivateUserData>(async (resolve: (data: IPrivateUserData) => void) => {
        await db.collection(USERS).doc(userData.login).set(userData);
        resolve(getPrivateUserData(userData));
    });
}