"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const RegistrationForm_module_scss_1 = __importDefault(require("./RegistrationForm.module.scss"));
const MedTitle_1 = __importDefault(require("../../../components/UI/Titles/MedTitle/MedTitle"));
const useInputValue_1 = require("../../../hooks/useInputValue");
const validationMethods_1 = require("../../../../../utils/validationMethods");
const Input_1 = __importDefault(require("../../../components/UI/Inputs/Input/Input"));
const BigButton_1 = __importDefault(require("../../../components/UI/Buttons/BigButton/BigButton"));
const SmallDottedSeparator_1 = __importDefault(require("../../../components/UI/Separators/SmallDottedSeparator"));
const users_api_1 = require("../../../store/users/users.api");
const authHooks_1 = require("../../../hooks/authHooks");
const RegistrationForm = () => {
    const login = (0, useInputValue_1.useInputValue)('', validationMethods_1.validLogin);
    const pass = (0, useInputValue_1.useInputValue)('', validationMethods_1.validPassword);
    const samePass = (0, useInputValue_1.useInputValue)('', (samePass) => {
        return pass.value === samePass && (0, validationMethods_1.validPassword)(samePass);
    });
    const firstName = (0, useInputValue_1.useInputValue)('', validationMethods_1.validName);
    const lastName = (0, useInputValue_1.useInputValue)('', validationMethods_1.validName);
    const [dispatchRegistration, { isFetching, isError, data: registrationData }] = (0, users_api_1.useLazyCreateUserQuery)();
    const valid = (0, react_1.useMemo)(() => {
        return login.valid && !login.empty &&
            pass.valid && !pass.empty &&
            samePass.valid && !samePass.empty &&
            firstName.valid && !firstName.empty &&
            lastName.valid && !lastName.empty;
    }, [login.valid, pass.valid, samePass.valid, firstName.valid, lastName.valid]);
    const logIn = (0, authHooks_1.useLogIn)();
    const logOut = (0, authHooks_1.useLogOut)();
    (0, react_1.useEffect)(() => {
        if (registrationData) {
            logIn(registrationData);
        }
        else if (registrationData === false) {
            logOut();
        }
    }, [registrationData]);
    const registration = () => {
        if (!isFetching) {
            dispatchRegistration({
                login: login.value,
                password: pass.value,
                personalInfo: {
                    firstName: {
                        value: firstName.value,
                        hidden: false
                    },
                    lastName: {
                        value: lastName.value,
                        hidden: false
                    }
                }
            });
        }
    };
    return (<div className={RegistrationForm_module_scss_1.default.container}>
            <MedTitle_1.default>Регистрация</MedTitle_1.default>
            <Input_1.default hook={login} placeholder={"Логин"}/>
            <Input_1.default hook={pass} placeholder={"Пароль"}/>
            <Input_1.default hook={samePass} placeholder={"Повторный пароль"}/>
            <SmallDottedSeparator_1.default />
            <Input_1.default hook={firstName} placeholder={"Имя"}/>
            <Input_1.default hook={lastName} placeholder={"Фамилия"}/>
            <SmallDottedSeparator_1.default />
            <BigButton_1.default active={valid} always={valid} onClick={registration}>Регистрация</BigButton_1.default>
        </div>);
};
exports.default = RegistrationForm;
