import {IPublicUserData, IUserData, IUserDataForCreate, IUserRequestCreateData} from "../../interfaces/users";
import {IUserPersonalInfo} from "../../interfaces/user";
import {validEmail, validLogin, validName, validPassword} from "../../utils/validationMethods";
import {encrypt} from "../utils/bcrypt";
import {AccessType} from "../../enums/user";
import {convertJsonTo} from "../../utils/helpers";

export const getPublicPersonalInfo = function (userPersonalInfo: IUserPersonalInfo): IUserPersonalInfo {
    const publicPersonalInfo = JSON.parse(JSON.stringify(userPersonalInfo));
    for (const key in publicPersonalInfo) {
        if (publicPersonalInfo[key].hidden) {
            publicPersonalInfo[key].value = '';
        }
    }
    return publicPersonalInfo;
}

export const createUserData = function (data: IUserDataForCreate): IUserData {
    return {
        login: data.login,
        // TODO: Заменить на локальное изображение
        avatar: 'https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small/profile-icon-design-free-vector.jpg',
        password: data.password,
        sessionKey: data.sessionKey,
        creationTime: Date.now(),
        conversations: [],
        notifications: [],
        preferences: {
            conversations: AccessType.ALL,
            friends: AccessType.ALL
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
}

export const getHashByLogin = async function (login: string) {
    return await encrypt(login + Date.now()).then((hash) => hash)
}

export const createHashes = function (password: string, login: string): Promise<[string, string]> {
    return new Promise<[string, string]>((resolve, reject) => {
        let hashPassword: string | null = null;
        let hashSessionId: string | null = null;

        Promise.all([
            encrypt(password).then((hash) => hashPassword = hash),
            getHashByLogin(login).then((hash) => hashSessionId = hash),
        ])
            .then(() => {
                resolve([hashPassword as string, hashSessionId as string]);
            })
            .catch(reject);
    })
}

export const validateUserDataForCreate = function (body: unknown): IUserRequestCreateData | null {
    const data: IUserRequestCreateData = convertJsonTo<IUserRequestCreateData>(body);

    const validationList: [string, (val: string) => boolean][] = [
        [ data.login, validLogin ],
        [ data.password, validPassword ],
        [ data.personalInfo?.firstName?.value, validName ],
        [ data.personalInfo?.lastName?.value, validName ],
    ];

    if (data.personalInfo?.email !== undefined) {
        validationList.push([ data.personalInfo.email.value, validEmail ]);
    }

    return validationList.every(([value, validator]) => validator(value)) ? data : null;
}