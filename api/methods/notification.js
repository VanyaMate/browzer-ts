"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeNotificationStatus = void 0;
const responses_1 = require("../../enums/responses");
const changeNotificationStatus = function (notificationsList, id, status) {
    return new Promise((resolve, reject) => {
        if (id && status !== undefined) {
            for (let i = 0; i < notificationsList.length; i++) {
                const notification = notificationsList[i];
                if ((typeof notification !== 'string') && (notification.id === id)) {
                    notification.status = status;
                    break;
                }
            }
            resolve(true);
        }
        else {
            reject({ message: responses_1.ResponseError.BAD_REQUEST });
        }
    });
};
exports.changeNotificationStatus = changeNotificationStatus;
