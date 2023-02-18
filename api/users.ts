import express, {Request, Response} from "express";
import {validateRequest} from "./utils/validateRequestMethods";
import {IInvalidRequestData, IValidRequestData} from "../interfaces/request";
import {IErrorResponseBody} from "../interfaces/response";
import {createHashes, createUserData, validateUserDataForCreate} from "./utils/usersMethods";
import {IUserRequestCreateData} from "../interfaces/users";
import {ResponseError} from "../enums/responses";
import {checkLoginExist, createUser} from "./databaseMethods/users";
import {db} from '../index';
const users = express.Router();


users.post('/create', (req: Request, res: Response) => {
    validateRequest(req)
        .then(async (data: IValidRequestData) => {
            const valid = validateUserDataForCreate(data.body);
            if (valid && await checkLoginExist(db, valid.login)) {
                const [password, sessionId] = await createHashes(valid);
                console.log('password', password);
                console.log('password', sessionId);
                const userData = createUserData({
                    ...valid,
                    sessionId, password
                });
                createUser(db, userData).then((data) => {
                    console.log(data);
                    res.status(200).send({ error: false, data });
                })
                return;
            }
            res.status(200).send({ error: true, message: ResponseError.NO_VALID_DATA });
        })
        .catch((error: IInvalidRequestData) => {
            res.status(200).send({ error: true, message: error.message });
        })
});

export default users;