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
const SmallTitle_1 = __importDefault(require("../../../../../../UI/Titles/SmallTitle/SmallTitle"));
const users_api_1 = require("../../../../../../../store/users/users.api");
const SearchResultsContainer_1 = __importDefault(require("./SearchResultsContainer/SearchResultsContainer"));
const SearchUserComponent_module_scss_1 = __importDefault(require("./SearchUserComponent.module.scss"));
const SearchUserComponent = (props) => {
    const [dispatchGetUsersList, { isFetching, data: usersList }] = (0, users_api_1.useLazyGetUsersListQuery)();
    (0, react_1.useEffect)(() => {
        if (props.value.trim().length > 1) {
            dispatchGetUsersList({
                login: props.value,
                limit: 5,
                offset: 0
            });
        }
    }, [props.value]);
    const result = (0, react_1.useMemo)(() => {
        if (usersList && usersList.length && (props.value.trim().length > 1)) {
            return usersList;
        }
        else {
            return [];
        }
    }, [usersList]);
    return (<div className={SearchUserComponent_module_scss_1.default.container}>
            <SmallTitle_1.default>Пользователи</SmallTitle_1.default>
            <SearchResultsContainer_1.default isFetching={isFetching} result={result}/>
        </div>);
};
exports.default = SearchUserComponent;
