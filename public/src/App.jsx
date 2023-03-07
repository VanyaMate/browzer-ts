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
require("./App.scss");
const Auth_1 = __importDefault(require("./pages/auth/Auth"));
const redux_1 = require("./hooks/redux");
const Browzer_1 = __importDefault(require("./pages/browzer/Browzer"));
const auth_api_1 = require("./store/auth/auth.api");
const authHooks_1 = require("./hooks/authHooks");
const App = () => {
    const auth = (0, redux_1.useMySelector)((state) => state.auth);
    const { isLoading, isFetching, isError, data: userData, refetch } = (0, auth_api_1.useAuthSessionKeyQuery)(auth.authKey, { skip: (auth.authKey === '') || (auth.login !== '') });
    const logInMethod = (0, authHooks_1.useLogIn)();
    const logOutMethod = (0, authHooks_1.useLogOut)();
    (0, react_1.useEffect)(() => {
        if (userData) {
            logInMethod(userData);
        }
        else if (userData === false) {
            logOutMethod();
        }
    }, [userData]);
    (0, react_1.useEffect)(() => {
        if (!isFetching && isError) {
            setTimeout(() => refetch(), 1000);
        }
    }, [isFetching, isError]);
    return auth.authKey ? <Browzer_1.default /> : <Auth_1.default />;
};
exports.default = App;
