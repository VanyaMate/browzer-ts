import express, {Request, Response} from "express";
import {validateRequestWithAccess} from "../utils/validateRequestMethods";
import {AuthType} from "../databaseMethods/auth";
import {db} from "../../index";
import {convertJsonTo} from "../../utils/helpers";
import {changeNotificationStatus} from "../methods/notification";
import {updateUserData} from "../databaseMethods/user";

const notification = express.Router();

notification.post('/change', (req: Request, res: Response) => {
    validateRequestWithAccess<{ id: string, status: boolean }>(req, res, db, AuthType.SESSION_KEY)
            .then(({userData, body}) => {
                return changeNotificationStatus(userData.notifications, body.id, body.status)
                    .then(() => updateUserData(db, userData))
                    .then(() => res.status(200).send({ error: false, success: true }))
            })
            .catch((error) => res.status(200).send({ error: true, message: error.message }))
})

export default notification;