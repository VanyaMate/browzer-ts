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
        password: data.password,
        sessionKey: data.sessionKey,
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

export const createHashes = function (data: IUserRequestCreateData): Promise<[string, string]> {
    return new Promise<[string, string]>((resolve, reject) => {
        let hashPassword: string | null = null;
        let hashSessionId: string | null = null;

        Promise.all([
            encrypt(data.password).then((hash) => hashPassword = hash),
            encrypt(data.login + Date.now()).then((hash) => hashSessionId = hash),
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