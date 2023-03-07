"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validComponentName = exports.validName = exports.validEmail = exports.validPassword = exports.validLogin = void 0;
const validLogin = function (login) {
    var _a;
    if (login === undefined || login === null) {
        return false;
    }
    if (login.length < 3 || login.length > 16) {
        return false;
    }
    if (((_a = login.match(/[\d\w_]/gi)) === null || _a === void 0 ? void 0 : _a.join('')) !== login) {
        return false;
    }
    return true;
};
exports.validLogin = validLogin;
const validPassword = function (password) {
    var _a;
    if (password === undefined || password === null) {
        return false;
    }
    if (password.length < 8 || password.length > 24) {
        return false;
    }
    if (((_a = password.match(/[\d\w_!*+-]/gi)) === null || _a === void 0 ? void 0 : _a.join('')) !== password) {
        return false;
    }
    return true;
};
exports.validPassword = validPassword;
const validEmail = function (email) {
    var _a;
    if (email === undefined || email === null) {
        return false;
    }
    if (email.length > 50 || email.length < 4) {
        return false;
    }
    if (((_a = email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) === null || _a === void 0 ? void 0 : _a.join('')) !== email) {
        return false;
    }
    return true;
};
exports.validEmail = validEmail;
const validName = function (name) {
    var _a;
    if (name === undefined || name === null) {
        return false;
    }
    if (name.length > 24 || name.length < 2) {
        return false;
    }
    if (((_a = name.match(/^[а-яa-z]+$/i)) === null || _a === void 0 ? void 0 : _a.join('')) !== name) {
        return false;
    }
    return true;
};
exports.validName = validName;
const validComponentName = function (name) {
    var _a;
    if (name === undefined || name === null) {
        return false;
    }
    if (name.trim().length > 10 || name.trim().length < 2) {
        return false;
    }
    if (((_a = name.match(/^[а-яa-z\d_<>\s.\+!()/\\\[\]]+$/i)) === null || _a === void 0 ? void 0 : _a.join('')) !== name) {
        //if (name.match(/^[а-яa-z\d()]+$/i)?.join('') !== name) {
        return false;
    }
    return true;
};
exports.validComponentName = validComponentName;
