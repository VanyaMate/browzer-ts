import express, {Request, Response} from "express";
import {validateRequest} from "../utils/validateRequestMethods";
import {IValidRequestData} from "../../interfaces/request";
import {AuthType, checkUserAccess} from "../databaseMethods/auth";
import {db} from "../../index";
import {IUserData} from "../../interfaces/users";
import {convertJsonTo} from "../../utils/helpers";
import {updateUserData} from "../databaseMethods/user";
import {IUserPersonalInfo, IUserPersonalInfoItem} from "../../interfaces/user";
import {changePersonalInfoItem} from "../methods/personalInfo";
import {validEmail, validName} from "../../utils/validationMethods";
import {ResponseError} from "../../enums/responses";

const personalInfo = express.Router();

const changeItem = function (req: Request, res: Response, itemName: keyof IUserPersonalInfo, validMethod: (val: string) => boolean) {
    validateRequest(req, res)
        .then((data: IValidRequestData) => {
            const body: IUserPersonalInfoItem = convertJsonTo<IUserPersonalInfoItem>(data.body);
            if (validMethod(body.value)) {
                checkUserAccess(db, data.auth, AuthType.SESSION_KEY)
                    .then((userData: IUserData) => {
                        return changePersonalInfoItem(userData.personalInfo[itemName], body)
                            .then(() => updateUserData(db, userData))
                            .then(() => res.status(200).send({error: false, success: true}))
                    })
                    .catch((error) => res.status(200).send({error: true, message: error.message}))
            } else {
                res.status(200).send({error: true, message: ResponseError.BAD_REQUEST })
            }
        })
}

personalInfo.post('/firstName', (req: Request, res: Response) => {
    changeItem(req, res, 'firstName', validName);
})

personalInfo.post('/lastName', (req: Request, res: Response) => {
    changeItem(req, res, 'lastName', validName);
})

personalInfo.post('/email', (req: Request, res: Response) => {
    changeItem(req, res, 'email', validEmail);
})

personalInfo.post('/telephone', (req: Request, res: Response) => {
    // TODO: Заменить на нормальный валидатор
    changeItem(req, res, 'telephone', (_: string) => true);
})

export default personalInfo;