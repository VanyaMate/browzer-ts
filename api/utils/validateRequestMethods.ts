import {
    IError,
    IRequestHeader,
    IValidRequestData,
    stringOrNull
} from "../../interfaces/request";
import {ResponseError} from "../../enums/responses";
import {validLogin} from "../../utils/validationMethods";
import {Request, Response} from "express";

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