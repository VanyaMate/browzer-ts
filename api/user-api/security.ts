import express, {Request, Response} from "express";
import {validateRequest} from "../utils/validateRequestMethods";
import {IValidRequestData} from "../../interfaces/request";
import {AuthType, checkUserAccess} from "../databaseMethods/auth";
import {db} from "../../index";
import {IUserData} from "../../interfaces/users";
import {convertJsonTo} from "../../utils/helpers";
import {validPassword} from "../../utils/validationMethods";
import {createHashes, getHashByLogin} from "../methods/users";
import {updateUserData} from "../databaseMethods/user";
import {ResponseError} from "../../enums/responses";

const security = express.Router();

security.post('/changePass', (req: Request, res: Response) => {
    validateRequest(req, res)
        .then((data: IValidRequestData) => {
            checkUserAccess(db, data.auth, AuthType.PASSWORD)
                .then(async (userData: IUserData) => {
                    const {password} = convertJsonTo<{password: string}>(data.body);
                    if (validPassword(password)) {
                        const [hashPassword, hashSessionKey] = await createHashes(password, userData.login);
                        userData.password = hashPassword;
                        userData.sessionKey = hashSessionKey;
                        return await updateUserData(db, userData)
                            .then(() => res.status(200).send({ error: false, sessionKey: hashSessionKey }))
                    }

                    res.status(200).send({ error: true, message: ResponseError.BAD_REQUEST })
                })
                .catch(() => res.status(200).send({ error: true, message: ResponseError.BAD_AUTH }))
        })
})

security.post('/resetSessionKey', (req: Request, res: Response) => {
    validateRequest(req, res).then((data: IValidRequestData) => {
        checkUserAccess(db, data.auth, AuthType.PASSWORD)
            .then(async (userData: IUserData) => {
                return getHashByLogin(userData.login)
                    .then((hash) => userData.sessionKey = hash)
                    .then(() => updateUserData(db, userData))
                    .then(() => res.status(200).send({ error: false, sessionKey: userData.sessionKey }))
                    .catch(() => res.status(200).send({ error: true, message: ResponseError.BAD_REQUEST }))
            })
            .catch(() => res.status(200).send({ error: true, message: ResponseError.BAD_AUTH }))
    })
})

export default security;