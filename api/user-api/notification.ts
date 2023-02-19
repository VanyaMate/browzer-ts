import express, {Request, Response} from "express";
import {validateRequest} from "../utils/validateRequestMethods";
import {IValidRequestData} from "../../interfaces/request";
import {AuthType, checkUserAccess} from "../databaseMethods/auth";
import {db} from "../../index";
import {IPrivateUserData, IUserData} from "../../interfaces/users";
import {convertJsonTo} from "../../utils/helpers";
import {changeNotificationStatus} from "../methods/notification";
import {updateUserData} from "../databaseMethods/user";

const notification = express.Router();

notification.post('/change', (req: Request, res: Response) => {
    validateRequest(req, res)
        .then((data: IValidRequestData) => {
            checkUserAccess(db, data.auth, AuthType.SESSION_KEY)
                .then((userData: IUserData) => {
                    const { id, status } = convertJsonTo<{ id: string, status: boolean }>(data.body);
                    return changeNotificationStatus(userData.notifications, id, status)
                        .then(() => updateUserData(db, userData))
                        .then(() => res.status(200).send({ error: false, success: true }))
                })
                .catch((error) => res.status(200).send({ error: true, message: error.message }))
        })
})

export default notification;