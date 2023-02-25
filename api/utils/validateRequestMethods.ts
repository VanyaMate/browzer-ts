import {
    IError,
    IRequestHeader,
    IValidRequestData,
    stringOrNull
} from "../../interfaces/request";
import {ResponseError} from "../../enums/responses";
import {validLogin} from "../../utils/validationMethods";
import {Request, Response} from "express";
import {AuthType, checkUserAccess} from "../databaseMethods/auth";
import {IUserData} from "../../interfaces/users";
import {firestore} from "firebase-admin";
import Firestore = firestore.Firestore;
import {convertJsonTo} from "../../utils/helpers";

const authHeadersExits = function (headers: IRequestHeader): [string, string] | null {
    const [login, key]: string[] = headers.auth?.split(':') || [];
    return (key && validLogin(login)) ? [login, key] : null;
}

const validateRequestHeaders = function (headers: IRequestHeader): [string, string] | null {
    return authHeadersExits(headers);
}

const validateRequestBody = function (body: unknown): JSON {
    return typeof(body) === 'string' ? JSON.parse(body) : body;
}

export function validateRequest (request: Request, response: Response): Promise<IValidRequestData> {
    return new Promise<IValidRequestData>((resolve: (data: IValidRequestData) => void) => {
        try {
            const headers: IRequestHeader = (request.headers as unknown) as IRequestHeader;
            const validHeaders: [string, string] | null = validateRequestHeaders(headers);
            const validBody: JSON = validateRequestBody(request.body);

            resolve({
                auth: validHeaders || null,
                body: validBody
            })
        } catch (_: unknown) {
            response.status(200).send({ error: true, message: ResponseError.BAD_REQUEST });
        }
    });
}

export const validateRequestWithAccess = function<T> (
    req: Request,
    res: Response,
    db: Firestore,
    authType: AuthType
): Promise<{userData: IUserData<string, string, string>, body: T}> {
    return new Promise((resolve, reject) => {
        validateRequest(req, res)
            .then(async (data: IValidRequestData) => {
                return await checkUserAccess(db, data.auth, authType)
                    .then((userData: IUserData<string, string, string>) => {
                        resolve({userData, body: convertJsonTo<T>(data.body)})
                    })
                    .catch((error: IError) => res.status(200).send({error: true, message: error.message}) || reject())
            })
            .catch((error) => {
                res.status(200).send({error: true, message: error.message}) || reject()
            });
    });
}
