import {ResponseError} from "../enums/responses";

export type stringOrNull = string | null;
export type json = string | null;

export interface IValidRequestData extends IValidRequestBody, IValidRequestHeader {}

export interface IError {
    message: ResponseError
}

export interface IValidRequestHeader {
    auth: [string, string] | null
}

export interface IValidRequestBody {
    body: JSON
}

export interface IRequestHeader {
    auth?: string
}

export interface IRequestBody {
    body: unknown
}