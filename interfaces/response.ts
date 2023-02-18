export interface IResponseBody {
    error: boolean,
    data?: any
}

export interface IErrorResponseBody {
    error: boolean,
    message: string
}