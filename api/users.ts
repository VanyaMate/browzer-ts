import express, {Request, Response} from "express";
import {validateRequest} from "./utils/validateRequestMethods";
import {IError, IValidRequestData} from "../interfaces/request";
import {createHashes, createUserData, validateUserDataForCreate} from "./methods/users";
import {IPrivateUserData, IPublicUserData, IUserData, IUserRequestCreateData} from "../interfaces/users";
import {ResponseError} from "../enums/responses";
import {
    checkLoginExist,
    createUser,
    getPublicUserDataByLogin,
    getPublicUsersDataByLogin
} from "./databaseMethods/users";
import {db} from '../index';
import {convertJsonTo} from "../utils/helpers";
const users = express.Router();


users.post('/create', (req: Request, res: Response) => {
    validateRequest(req, res)
        .then(async (data: IValidRequestData) => {
            const validData: IUserRequestCreateData | null = validateUserDataForCreate(data.body);
            if (validData && await checkLoginExist(db, validData.login)) {
                const [password, sessionKey]: string[] = await createHashes(validData.password, validData.login);
                const userData: IUserData = createUserData({ ...validData, sessionKey, password });

                return createUser(db, userData).then((data: IPrivateUserData) =>
                    res.status(200).send({ error: false, data })
                )
            }
            res.status(200).send({ error: true, message: ResponseError.NO_VALID_DATA });
        })
});

users.post('/get', (req: Request, res: Response) => {
    validateRequest(req, res)
        .then((data: IValidRequestData) => {
            const {login} = convertJsonTo<{login: string}>(data.body);
            getPublicUserDataByLogin(db, login)
                .then((publicData: IPublicUserData) => res.status(200).send({error: false, data: publicData}))
                .catch((error: IError) => res.status(200).send({error: true, message: error.message}));
        })
});

users.post('/getList', (req: Request, res: Response) => {
    validateRequest(req, res)
        .then((data: IValidRequestData) => {
            const {login, limit, offset} = convertJsonTo<{login: string, limit: number, offset: number}>(data.body);
            getPublicUsersDataByLogin(db, login, limit, offset)
                .then((data) => res.status(200).send(data))
                .catch((error: IError) => res.status(200).send({ error: true, message: error.message }))
        })
})

export default users;