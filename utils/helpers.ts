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

export const getRandomInt = function (min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
}

export const getRandomID = function () {
    const keyList = 'abcdefghijklmnopqrstuvwxyz1234567890';
    let id = '';
    for (let i = 0; i < 10; i++) {
        id += keyList[getRandomInt(0, keyList.length)];
    }
    return id;
}