"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserDataForCreate = exports.createHashes = exports.getHashByLogin = exports.createUserData = exports.getPublicPersonalInfo = void 0;
const validationMethods_1 = require("../../utils/validationMethods");
const bcrypt_1 = require("../utils/bcrypt");
const user_1 = require("../../enums/user");
const helpers_1 = require("../../utils/helpers");
const getPublicPersonalInfo = function (userPersonalInfo) {
    const publicPersonalInfo = JSON.parse(JSON.stringify(userPersonalInfo));
    for (const key in publicPersonalInfo) {
        if (publicPersonalInfo[key].hidden) {
            publicPersonalInfo[key].value = '';
        }
    }
    return publicPersonalInfo;
};
exports.getPublicPersonalInfo = getPublicPersonalInfo;
const createUserData = function (data) {
    return {
        login: data.login,
        // TODO: Заменить на локальное изображение
        avatar: 'https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small/profile-icon-design-free-vector.jpg',
        password: data.password,
        sessionKey: data.sessionKey,
        creationTime: Date.now(),
        conversations: [],
        notifications: [],
        blocks: [
            { components: [], active: '' },
            { components: [], active: '' },
            { components: [], active: '' }
        ],
        preferences: {
            conversations: user_1.AccessType.ALL,
            friends: user_1.AccessType.ALL
        },
        personalInfo: {
            firstName: data.personalInfo.firstName,
            lastName: data.personalInfo.lastName,
            telephone: data.personalInfo.telephone || {
                value: '',
                hidden: false,
            },
            email: data.personalInfo.email || {
                value: '',
                hidden: false,
            },
            friends: {
                value: [],
                hidden: false
            },
            musics: {
                value: [],
                hidden: false
            },
            photos: {
                value: [],
                hidden: false
            },
        },
        friendsRequestIn: [],
        friendsRequestOut: [],
    };
};
exports.createUserData = createUserData;
const getHashByLogin = function (login) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, bcrypt_1.encrypt)(login + Date.now()).then((hash) => hash);
    });
};
exports.getHashByLogin = getHashByLogin;
const createHashes = function (password, login) {
    return new Promise((resolve, reject) => {
        let hashPassword = null;
        let hashSessionId = null;
        Promise.all([
            (0, bcrypt_1.encrypt)(password).then((hash) => hashPassword = hash),
            (0, exports.getHashByLogin)(login).then((hash) => hashSessionId = hash),
        ])
            .then(() => {
            resolve([hashPassword, hashSessionId]);
        })
            .catch(reject);
    });
};
exports.createHashes = createHashes;
const validateUserDataForCreate = function (body) {
    var _a, _b, _c, _d, _e;
    const data = (0, helpers_1.convertJsonTo)(body);
    const validationList = [
        [data.login, validationMethods_1.validLogin],
        [data.password, validationMethods_1.validPassword],
        [(_b = (_a = data.personalInfo) === null || _a === void 0 ? void 0 : _a.firstName) === null || _b === void 0 ? void 0 : _b.value, validationMethods_1.validName],
        [(_d = (_c = data.personalInfo) === null || _c === void 0 ? void 0 : _c.lastName) === null || _d === void 0 ? void 0 : _d.value, validationMethods_1.validName],
    ];
    if (((_e = data.personalInfo) === null || _e === void 0 ? void 0 : _e.email) !== undefined) {
        validationList.push([data.personalInfo.email.value, validationMethods_1.validEmail]);
    }
    return validationList.every(([value, validator]) => validator(value)) ? data : null;
};
exports.validateUserDataForCreate = validateUserDataForCreate;
