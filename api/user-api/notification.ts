import express, {Request, Response} from "express";
import {validateRequestWithAccess} from "../utils/validateRequestMethods";
import {AuthType} from "../databaseMethods/auth";
import {db} from "../../index";
import {changeNotificationStatus} from "../databaseMethods/notifications";
import {updateUserData} from "../databaseMethods/user";
import {getNotificationsById} from "../databaseMethods/notifications";
import {ResponseError} from "../../enums/responses";
import {addUniqueValueTo, getWithoutValue} from "../../utils/helpers";

const notification = express.Router();

notification.post('/change', (req: Request, res: Response) => {
    validateRequestWithAccess<{ id: string, status: boolean }>(req, res, db, AuthType.SESSION_KEY)
            .then(({userData, body}) => {
                return changeNotificationStatus(db, body.id, body.status)
                    .then(() => {
                        if (body.status === true) {
                            userData.notifications = addUniqueValueTo<string>(userData.notifications, body.id)
                        } else {
                            userData.notifications = getWithoutValue<string>(userData.notifications, body.id);
                        }
                        return updateUserData(db, userData);
                    })
                    .then(() => res.status(200).send({ error: false, success: true }))
            })
            .catch((error) => res.status(200).send({ error: true, message: error.message }))
})

notification.post('/getMyNotificationsData', (req: Request, res: Response) => {
    validateRequestWithAccess(req, res, db, AuthType.SESSION_KEY)
        .then(({ userData, body }) => {
            if (userData.notifications.length) {
                return getNotificationsById(db, userData.notifications)
                    .then((notifications) => res.status(200).send({error: false, notifications}))
                    .catch(() => res.status(200).send({error: true, message: ResponseError.NO_VALID_DATA}))
            } else {
                res.status(200).send({error: false, notifications: []})
            }
        })
        .catch((error) => res.status(200).send({ error: true, message: error.message }))
})

export default notification;