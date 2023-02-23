import {firestore} from "firebase-admin";
import Firestore = firestore.Firestore;
import {USERS} from "./COLLECTION_NAMES";
import DocumentReference = firestore.DocumentReference;
import {IPrivateUserData, IPublicUserData, IUserData} from "../../interfaces/users";
import {ResponseError} from "../../enums/responses";
import {getPrivateUserData, getPublicUserData} from "../methods/user";
import DocumentData = firestore.DocumentData;
import QuerySnapshot = firestore.QuerySnapshot;

export const checkLoginExist = function (db: Firestore, login: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
        try {
            const userData = await getUserDataByLogin(db, login);
            resolve(userData !== undefined);
        } catch (_) {
            reject({ message: ResponseError.BAD_REQUEST });
        }
    })
}

export const getPublicUserDataByLogin = function (
    db: Firestore,
    login: string
): Promise<IPublicUserData<string>> {
    return new Promise<IPublicUserData<string>>(async (resolve, reject) => {
        try {
            const userData = await getUserDataByLogin(db, login);

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

export const getUserDataByLogin = function (
    db: Firestore,
    login: string
): Promise<IUserData<string, string, string>> {
    return new Promise<IUserData<string, string, string>>(async (resolve, reject) => {
        try {
            const query: DocumentReference = db.collection(USERS).doc(login);
            const userData = (await query.get()).data() as IUserData<string, string, string>;

            if (userData !== undefined) {
                resolve(userData);
            } else {
                reject({ message: ResponseError.NO_FIND })
            }
        }
        catch (_) {
            reject({ message: ResponseError.NO_FIND })
        }
    });
}

export const getPublicUsersDataByLogin = function (
    db: Firestore,
    login: string,
    limit: number = 5,
    offset: number = 0
): Promise<IPublicUserData<string>[]> {
    return new Promise<IPublicUserData<string>[]>(async (resolve, reject) => {
        try {
            const document: QuerySnapshot = await db.collection(USERS)
                .where('login', '>=', login)
                .where('login', '<=', login + '\uf8ff')
                .get();

            const users: IPublicUserData<string>[] = [];
            for (let i = offset; (i < document.docs.length) && (i < (offset + limit)); i++) {
                users.push(getPublicUserData(document.docs[i].data() as IUserData<string, string, string>));
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

export const getPublicUserDataByLoginList = function (db: Firestore, loginList: string[]): Promise<IPublicUserData<string>[]> {
    return new Promise<IPublicUserData<string>[]>(async (resolve, reject) => {
        try {
            const document: QuerySnapshot = await db.collection(USERS)
                .where('login', 'in', loginList)
                .get();

            const users: IPublicUserData<string>[] = document.docs.map(
                (doc: DocumentData) => getPublicUserData(doc.data())
            );

            if (users.length) {
                resolve(users);
            } else {
                reject({ message: ResponseError.NO_FIND })
            }

        } catch (_) {
            reject({ message: ResponseError.NO_VALID_DATA })
        }
    })
}

export const createUser = function (
    db: Firestore,
    userData: IUserData<string, string, string>
): Promise<IPrivateUserData<string, string, string>> {
    return new Promise<IPrivateUserData<string, string, string>>(async (resolve) => {
        await db.collection(USERS).doc(userData.login).set(userData);
        resolve(getPrivateUserData(userData));
    });
}