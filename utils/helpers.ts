import {IUserRequestCreateData} from "../interfaces/users";

export const convertJsonTo = function<T> (object: unknown) {
    return typeof(object) === 'string'
        ? JSON.parse(object) as T
        : object as T;
}

export const getWithoutValue = function<T> (from: T[], deleteValue: T): T[] {
    return from.filter((value: T) => value !== deleteValue);
}

export const addUniqueValueTo = function<T> (to: T[], value: T): T[] {
    const uniqueList: Set<T> = new Set(to);
    uniqueList.add(value);
    return [...uniqueList];
}