import {Request, Response} from "express";
import {IUserPersonalInfo, IUserPersonalInfoItem} from "../../interfaces/user";
import {validateRequest} from "../utils/validateRequestMethods";
import {IValidRequestData} from "../../interfaces/request";
import {convertJsonTo} from "../../utils/helpers";
import {AuthType, checkUserAccess} from "./auth";
import {IUserData} from "../../interfaces/users";
import {updateUserData} from "./user";
import {ResponseError} from "../../enums/responses";
import {changePersonalInfoItem} from "../methods/personalInfo";
import {firestore} from "firebase-admin";
import Firestore = firestore.Firestore;

export const changeItem = function (
    req: Request,
    res: Response,
    db: Firestore,
    itemName: keyof IUserPersonalInfo<string>,
    validMethod: (val: string) => boolean
) {
    validateRequest(req, res)
        .then((data: IValidRequestData) => {
            const body: IUserPersonalInfoItem = convertJsonTo<IUserPersonalInfoItem>(data.body);
            if (validMethod(body.value)) {
                checkUserAccess(db, data.auth, AuthType.SESSION_KEY)
                    .then((userData: IUserData<string, string, string>) => {
                        const personalItem = userData.personalInfo[itemName];
                        return changePersonalInfoItem(personalItem, body)
                            .then(() => updateUserData(db, userData))
                            .then(() => res.status(200).send({error: false, success: true}))
                    })
                    .catch((error) => res.status(200).send({error: true, message: error.message}))
            } else {
                res.status(200).send({error: true, message: ResponseError.NO_VALID_DATA })
            }
        })
}