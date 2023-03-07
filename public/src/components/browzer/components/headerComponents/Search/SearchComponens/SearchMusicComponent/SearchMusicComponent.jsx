"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const SearchUserComponent_module_scss_1 = __importDefault(require("../SearchUsersComponent/SearchUserComponent.module.scss"));
const SmallTitle_1 = __importDefault(require("../../../../../../UI/Titles/SmallTitle/SmallTitle"));
const SearchMusicComponent = (props) => {
    return (<div className={SearchUserComponent_module_scss_1.default.container}>
            <SmallTitle_1.default>Музыка</SmallTitle_1.default>
            {props.value.trim().length > 1 ? <div>Поиск по: {props.value}</div> : 'Пустой запрос'}
        </div>);
};
exports.default = SearchMusicComponent;
