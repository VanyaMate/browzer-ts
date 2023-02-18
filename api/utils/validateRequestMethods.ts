import {
    IInvalidRequestData,
    IRequestHeader,
    IValidRequestData,
    stringOrNull
} from "../../interfaces/request";
import {ResponseError} from "../../enums/responses";
import {validLogin} from "../../utils/validationMethods";
import {Request} from "express";

const authHeadersExits = function (headers: IRequestHeader): boolean {
    const [login, key]: string[] = headers.auth?.split(':') || [];
    return (key && validLogin(login)) as boolean;
}

const validateRequestHeaders = function (headers: IRequestHeader): boolean {
    return authHeadersExits(headers);
}

const validateRequestBody = function (body: unknown): JSON {
    return typeof(body) === 'string' ? JSON.parse(body) : body;
}

export function validateRequest (request: Request): Promise<IValidRequestData> {
    return new Promise<IValidRequestData>((resolve: (data: IValidRequestData) => void, reject: (data: IInvalidRequestData) => void) => {
        try {
            const headers: IRequestHeader = (request.headers as unknown) as IRequestHeader;
            const validHeaders = validateRequestHeaders(headers);
            const validBody = validateRequestBody(request.body);

            resolve({
                auth: validHeaders ? headers.auth : null,
                body: validBody ? request.body : null
            })
        } catch (_: unknown) {
            reject({
                message: ResponseError.BAD_REQUEST
            })
        }
    });
}