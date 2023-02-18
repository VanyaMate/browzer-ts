import {ResponseError} from "../enums/responses";

export type stringOrNull = string | null;
export type json = string | null;

export interface IValidRequestData extends IRequestBody, IRequestHeader {}

export interface IInvalidRequestData {
    message: ResponseError
}

export interface IRequestHeader {
    auth: stringOrNull;
}

export interface IRequestBody {
    body: unknown
}