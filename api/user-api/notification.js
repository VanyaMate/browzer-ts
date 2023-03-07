"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateRequestMethods_1 = require("../utils/validateRequestMethods");
const auth_1 = require("../databaseMethods/auth");
const index_1 = require("../../index");
const notifications_1 = require("../databaseMethods/notifications");
const user_1 = require("../databaseMethods/user");
const notifications_2 = require("../databaseMethods/notifications");
const responses_1 = require("../../enums/responses");
const helpers_1 = require("../../utils/helpers");
const notification = express_1.default.Router();
notification.post('/change', (req, res) => {
    (0, validateRequestMethods_1.validateRequestWithAccess)(req, res, index_1.db, auth_1.AuthType.SESSION_KEY)
        .then(({ userData, body }) => {
        return (0, notifications_1.changeNotificationStatus)(index_1.db, body.id, body.status)
            .then(() => {
            if (body.status === true) {
                userData.notifications = (0, helpers_1.addUniqueValueTo)(userData.notifications, body.id);
            }
            else {
                userData.notifications = (0, helpers_1.getWithoutValue)(userData.notifications, body.id);
            }
            return (0, user_1.updateUserData)(index_1.db, userData);
        })
            .then(() => res.status(200).send({ error: false, success: true }));
    })
        .catch((error) => res.status(200).send({ error: true, message: error.message }));
});
notification.post('/getMyNotificationsData', (req, res) => {
    (0, validateRequestMethods_1.validateRequestWithAccess)(req, res, index_1.db, auth_1.AuthType.SESSION_KEY)
        .then(({ userData, body }) => {
        if (userData.notifications.length) {
            return (0, notifications_2.getNotificationsById)(index_1.db, userData.notifications)
                .then((notifications) => res.status(200).send({ error: false, notifications }))
                .catch(() => res.status(200).send({ error: true, message: responses_1.ResponseError.NO_VALID_DATA }));
        }
        else {
            res.status(200).send({ error: false, notifications: [] });
        }
    })
        .catch((error) => res.status(200).send({ error: true, message: error.message }));
});
exports.default = notification;
