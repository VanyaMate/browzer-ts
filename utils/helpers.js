"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStringDate = exports.getRandomID = exports.getRandomInt = exports.addUniqueValueTo = exports.getWithoutValue = exports.convertJsonTo = void 0;
const convertJsonTo = function (object) {
    return typeof (object) === 'string'
        ? JSON.parse(object)
        : object;
};
exports.convertJsonTo = convertJsonTo;
const getWithoutValue = function (from, deleteValue) {
    return from.filter((value) => value !== deleteValue);
};
exports.getWithoutValue = getWithoutValue;
const addUniqueValueTo = function (to, value) {
    const uniqueList = new Set(to);
    uniqueList.add(value);
    return [...uniqueList];
};
exports.addUniqueValueTo = addUniqueValueTo;
const getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
};
exports.getRandomInt = getRandomInt;
const getRandomID = function () {
    const keyList = 'abcdefghijklmnopqrstuvwxyz1234567890';
    let id = '';
    for (let i = 0; i < 10; i++) {
        id += keyList[(0, exports.getRandomInt)(0, keyList.length)];
    }
    return id;
};
exports.getRandomID = getRandomID;
const getStringDate = function (dateMS) {
    const monthNames = {
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
    };
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
};
exports.getStringDate = getStringDate;
