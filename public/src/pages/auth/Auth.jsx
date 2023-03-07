"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Auth_module_scss_1 = __importDefault(require("./Auth.module.scss"));
const LoginForm_1 = __importDefault(require("./LoginForm/LoginForm"));
const RegistrationForm_1 = __importDefault(require("./RegistrationForm/RegistrationForm"));
const Auth = () => {
    return (<div className={Auth_module_scss_1.default.container}>
            <LoginForm_1.default />
            <RegistrationForm_1.default />
        </div>);
};
exports.default = Auth;
