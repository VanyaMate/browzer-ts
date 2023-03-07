"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getNotificationsById = exports.changeNotificationStatus = exports.addNotification = exports.createNotificationData = void 0;
const COLLECTION_NAMES_1 = require("./COLLECTION_NAMES");
const users_1 = require("./users");
const crypto = __importStar(require("crypto"));
const responses_1 = require("../../enums/responses");
const user_1 = require("./user");
const createNotificationData = function (target, type, data) {
    if (!type || !data)
        return null;
    return {
        type,
        data,
        target,
        status: false,
        id: crypto.randomUUID(),
        creationTime: Date.now()
    };
};
exports.createNotificationData = createNotificationData;
const addNotification = function (db, user, type, data) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const userData = typeof (user) === 'string' ?
                yield (0, users_1.getUserDataByLogin)(db, user) : user;
            const notification = (0, exports.createNotificationData)(userData.login, type, data);
            if (notification) {
                userData.notifications.push(notification.id);
                Promise.all([
                    db.collection(COLLECTION_NAMES_1.NOTIFICATIONS).doc(notification.id).set(notification),
                    (0, user_1.updateUserData)(db, userData)
                ])
                    .then(() => resolve(notification))
                    .catch((_) => reject(_));
            }
            else {
                reject({ message: responses_1.ResponseError.NO_VALID_DATA });
            }
        }
        catch (_) {
            reject({ message: responses_1.ResponseError.NO_VALID_DATA });
        }
    }));
};
exports.addNotification = addNotification;
const changeNotificationStatus = function (db, id, status) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        const document = yield db.collection(COLLECTION_NAMES_1.NOTIFICATIONS).doc(id).get();
        const data = document.data();
        data.status = status;
        yield db.collection(COLLECTION_NAMES_1.NOTIFICATIONS).doc(id).set(data);
        resolve(status);
    }));
};
exports.changeNotificationStatus = changeNotificationStatus;
const getNotificationsById = function (db, ids) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (ids.length === 0) {
                resolve([]);
                return;
            }
            const collection = db.collection(COLLECTION_NAMES_1.NOTIFICATIONS);
            const batches = [];
            while (ids.length) {
                const batch = ids.splice(0, 10);
                batches.push(collection
                    .where('id', 'in', batch)
                    .get()
                    .then((queryResult) => queryResult.docs.map((notif) => notif.data())));
            }
            const notifications = yield Promise.all(batches).then(batches => batches.flat());
            resolve(notifications.sort((a, b) => a.creationTime - b.creationTime));
        }
        catch (_) {
            reject(_);
        }
    }));
};
exports.getNotificationsById = getNotificationsById;
