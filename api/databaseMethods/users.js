"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getPublicUserDataByLoginList = exports.getPublicUsersDataByLogin = exports.getFullUserDataByLogin = exports.getUserDataByLogin = exports.getPublicUserDataByLogin = exports.checkLoginExist = void 0;
const COLLECTION_NAMES_1 = require("./COLLECTION_NAMES");
const responses_1 = require("../../enums/responses");
const user_1 = require("../methods/user");
const conversations_1 = require("./conversations");
const checkLoginExist = function (db, login) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const userData = yield (0, exports.getUserDataByLogin)(db, login);
            resolve(userData !== undefined);
        }
        catch (_) {
            resolve(false);
        }
    }));
};
exports.checkLoginExist = checkLoginExist;
const getPublicUserDataByLogin = function (db, login) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const userData = yield (0, exports.getUserDataByLogin)(db, login);
            if (userData !== undefined) {
                const publicData = (0, user_1.getPublicUserData)(userData);
                resolve(publicData);
            }
            else {
                reject({ message: responses_1.ResponseError.NO_FIND });
            }
        }
        catch (_) {
            reject({ message: responses_1.ResponseError.NO_FIND });
        }
    }));
};
exports.getPublicUserDataByLogin = getPublicUserDataByLogin;
const getUserDataByLogin = function (db, login) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const query = db.collection(COLLECTION_NAMES_1.USERS).doc(login);
            const userData = (yield query.get()).data();
            if (userData !== undefined) {
                resolve(userData);
            }
            else {
                reject({ message: responses_1.ResponseError.NO_FIND });
            }
        }
        catch (_) {
            reject({ message: responses_1.ResponseError.NO_FIND });
        }
    }));
};
exports.getUserDataByLogin = getUserDataByLogin;
const getFullUserDataByLogin = function (db, login) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const query = db.collection(COLLECTION_NAMES_1.USERS).doc(login);
            const userData = (yield query.get()).data();
            const friendsData = yield (0, exports.getPublicUserDataByLoginList)(db, userData.personalInfo.friends.value);
            const notificationsData = [];
            const conversationsData = yield (0, conversations_1.getFullConversationsData)(db, userData.conversations);
        }
        catch (_) {
        }
    }));
};
exports.getFullUserDataByLogin = getFullUserDataByLogin;
const getPublicUsersDataByLogin = function (db, login, limit = 5, offset = 0) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const document = yield db.collection(COLLECTION_NAMES_1.USERS)
                .where('login', '>=', login)
                .where('login', '<=', login + '\uf8ff')
                .get();
            const users = [];
            for (let i = offset; (i < document.docs.length) && (i < (offset + limit)); i++) {
                users.push((0, user_1.getPublicUserData)(document.docs[i].data()));
            }
            if (users.length) {
                resolve(users);
            }
            else {
                reject({ message: responses_1.ResponseError.NO_FIND });
            }
        }
        catch (_) {
            reject({ message: responses_1.ResponseError.NO_VALID_DATA });
        }
    }));
};
exports.getPublicUsersDataByLogin = getPublicUsersDataByLogin;
const getPublicUserDataByLoginList = function (db, loginList) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (loginList.length === 0) {
                resolve([]);
                return;
            }
            const collection = db.collection(COLLECTION_NAMES_1.USERS);
            const batches = [];
            while (loginList.length) {
                const batch = loginList.splice(0, 10);
                batches.push(collection
                    .where('login', 'in', batch)
                    .get()
                    .then((result) => result.docs.map((user) => user.data())));
            }
            const usersData = yield Promise.all(batches).then((users) => users.flat());
            const users = usersData.map((user) => (0, user_1.getPublicUserData)(user));
            if (users.length) {
                resolve(users);
            }
            else {
                reject({ message: responses_1.ResponseError.NO_FIND });
            }
        }
        catch (_) {
            reject({ message: responses_1.ResponseError.NO_VALID_DATA });
        }
    }));
};
exports.getPublicUserDataByLoginList = getPublicUserDataByLoginList;
const createUser = function (db, userData) {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        yield db.collection(COLLECTION_NAMES_1.USERS).doc(userData.login).set(userData);
        resolve((0, user_1.getPrivateUserData)(userData));
    }));
};
exports.createUser = createUser;
