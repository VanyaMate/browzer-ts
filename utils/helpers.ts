import {IUserRequestCreateData} from "../interfaces/users";

export const convertJsonTo = function<T> (object: unknown) {
    return typeof(object) === 'string'
        ? JSON.parse(object) as T
        : object as T;
}