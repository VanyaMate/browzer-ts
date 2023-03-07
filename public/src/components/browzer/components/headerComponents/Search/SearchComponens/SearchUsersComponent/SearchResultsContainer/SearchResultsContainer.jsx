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
const SearchResultsContainer_module_scss_1 = __importDefault(require("./SearchResultsContainer.module.scss"));
const SearchUserItem_1 = __importDefault(require("../SearchUserItem/SearchUserItem"));
const Vertical_1 = __importDefault(require("../../../../../../../UI/Lists/Vertical/Vertial/Vertical"));
const SearchResultsContainer = (0, react_1.memo)((props) => {
    return (<Vertical_1.default className={[SearchResultsContainer_module_scss_1.default.container, props.isFetching ? SearchResultsContainer_module_scss_1.default.loading : ''].join(' ')}>
            {props.result.length ?
            props.result.map((user) => <SearchUserItem_1.default key={user.login} user={user}/>) :
            'Нет результатов'}
        </Vertical_1.default>);
});
exports.default = SearchResultsContainer;
