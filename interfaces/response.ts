export interface IResponseBody {
    error: boolean,
    data?: any,
    success?: boolean
}

export interface IErrorResponseBody {
    error: boolean,
    message: string
}