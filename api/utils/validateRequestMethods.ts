import {IRequestHeader} from "../../interfaces/requestInterfaces";
import {ResponseError} from "../../enums/responses";
import {validLogin} from "../../utils/validationMethods";
import {Request} from "express";

interface IValidRequestData {
    auth: string,
    body: unknown
}

interface IInvalidRequestData {
    message: ResponseError
}

const authHeadersExits = function (headers: IRequestHeader): boolean {
    const [login, key]: string[] = headers.auth.split(':');
    return (key && validLogin(login)) as boolean;
}

const validateRequestHeaders = function (headers: IRequestHeader): boolean {
    return authHeadersExits(headers);
}

const validateRequestBody = function (body: string): boolean {
    return typeof(body) === 'string';
}

export function validateRequest (request: Request): any {
    return new Promise((resolve: (data: IValidRequestData) => void, reject: (data: IInvalidRequestData) => void) => {
        const headers: IRequestHeader = (request.headers as unknown) as IRequestHeader;
        const validHeaders = validateRequestHeaders(headers);
        const validBody = validateRequestBody(request.body);

        if (validHeaders && validBody) {
            resolve({
                auth: headers.auth,
                body: request.body
            })
        } else {
            reject({
                message: ResponseError.BAD_AUTH
            })
        }
    });
}