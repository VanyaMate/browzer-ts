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

export const getStringDate = function (dateMS: number) {
    const monthNames: { [num: number]: string } = {
        0: "Январь",
        1: "Февраль",
        2: "Март",
        3: "Апрель",
        4: "Май",
        5: "Июнь",
        6: "Июль",
        7: "Август",
        8: "Сентябрь",
        9: "Октябрь",
        10: "Ноябрь",
        11: "Декабрь",
    }

    const date = new Date(dateMS);
    const year = date.getFullYear();
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const showedHours = hours > 9 ? hours : `0${hours}`;
    const showedMinutes = minutes > 9 ? minutes : `0${minutes}`;
    const showedSeconds = seconds > 9 ? seconds : `0${seconds}`;

    return `${year} / ${day} ${month} / ${showedHours}:${showedMinutes}:${showedSeconds}`;
}