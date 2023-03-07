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
const LoginForm_module_scss_1 = __importDefault(require("./LoginForm.module.scss"));
const MedTitle_1 = __importDefault(require("../../../components/UI/Titles/MedTitle/MedTitle"));
const useInputValue_1 = require("../../../hooks/useInputValue");
const validationMethods_1 = require("../../../../../utils/validationMethods");
const Input_1 = __importDefault(require("../../../components/UI/Inputs/Input/Input"));
const BigButton_1 = __importDefault(require("../../../components/UI/Buttons/BigButton/BigButton"));
const auth_api_1 = require("../../../store/auth/auth.api");
const SmallDottedSeparator_1 = __importDefault(require("../../../components/UI/Separators/SmallDottedSeparator"));
const authHooks_1 = require("../../../hooks/authHooks");
const LoginForm = () => {
    const login = (0, useInputValue_1.useInputValue)('', validationMethods_1.validLogin);
    const pass = (0, useInputValue_1.useInputValue)('', validationMethods_1.validPassword);
    const [valid, setValid] = (0, react_1.useState)(false);
    const [authPass, { isLoading, isError, isFetching, data: userData }] = (0, auth_api_1.useLazyAuthPassQuery)();
    const logIn = (0, authHooks_1.useLogIn)();
    const logOut = (0, authHooks_1.useLogOut)();
    (0, react_1.useEffect)(() => {
        setValid(!!login.value && !!pass.value);
    }, [login.value, pass.value]);
    (0, react_1.useEffect)(() => {
        if (userData) {
            logIn(userData);
        }
        else if (userData === false) {
            logOut();
        }
    }, [userData]);
    return (<div className={LoginForm_module_scss_1.default.container}>
            <MedTitle_1.default>Вход</MedTitle_1.default>
            <Input_1.default hook={login} placeholder={"Логин"}/>
            <Input_1.default hook={pass} placeholder={"Пароль"} type={"password"}/>
            <SmallDottedSeparator_1.default />
            <BigButton_1.default active={valid} always={valid} onClick={() => !isFetching && authPass(login.value + ':' + pass.value)}>Вход</BigButton_1.default>
        </div>);
};
exports.default = LoginForm;
