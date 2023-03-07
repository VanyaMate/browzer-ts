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
const useInputValue_1 = require("../../../../../hooks/useInputValue");
const Search_module_scss_1 = __importDefault(require("./Search.module.scss"));
const Input_1 = __importDefault(require("../../../../UI/Inputs/Input/Input"));
const SearchTypeSelector_1 = __importDefault(require("./SearchUI/SearchTypeSelector/SearchTypeSelector"));
const SearchResult_1 = __importDefault(require("./SearchUI/SearchResult/SearchResult"));
const useDebounce_1 = require("../../../../../hooks/useDebounce");
const searchTypes_1 = require("../../../../../../../enums/searchTypes");
const Search = () => {
    const searchInput = (0, useInputValue_1.useInputValue)('', (s) => s.trim().length > 1);
    const [openResultDrop, setOpenResultDrop] = (0, react_1.useState)(false);
    const [openTypeDrop, setOpenTypeDrop] = (0, react_1.useState)(false);
    const searchValue = (0, useDebounce_1.useDebounce)(searchInput.value, 450);
    const [type, setType] = (0, react_1.useState)(searchTypes_1.SearchType.ALL);
    const input = (0, react_1.useRef)();
    (0, react_1.useEffect)(() => {
        if (searchInput.value.trim().length > 0) {
            setOpenResultDrop(true);
            setOpenTypeDrop(false);
        }
        else {
            setOpenResultDrop(false);
        }
    }, [searchInput.value]);
    return (<div className={Search_module_scss_1.default.container}>
            <SearchTypeSelector_1.default activeType={type} setType={setType} openTypeDrop={openTypeDrop} setOpenTypeDrop={setOpenTypeDrop} setOpenResultDrop={setOpenResultDrop} inputRef={input}/>
            <Input_1.default reff={input} hook={searchInput} placeholder={'Поиск'}/>
            <SearchResult_1.default value={searchValue} type={type} opened={openResultDrop} openResults={setOpenResultDrop} openTypes={setOpenTypeDrop}/>
        </div>);
};
exports.default = Search;
