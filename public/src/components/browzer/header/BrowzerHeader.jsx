"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const BrowzerHeaderItem_1 = __importDefault(require("./headerItem/BrowzerHeaderItem"));
const BrowzerHeader_module_scss_1 = __importDefault(require("./BrowzerHeader.module.scss"));
const redux_1 = require("../../../hooks/redux");
const Button_1 = __importDefault(require("../../UI/Buttons/Button/Button"));
const Search_1 = __importDefault(require("../components/headerComponents/Search/Search"));
const BrowzerHeader = () => {
    const { resetAuth } = (0, redux_1.useActions)();
    return (<div className={BrowzerHeader_module_scss_1.default.container}>
            <BrowzerHeaderItem_1.default>[ BrowzerHeaderItem #1 ]</BrowzerHeaderItem_1.default>
            <BrowzerHeaderItem_1.default nbg>
                <Search_1.default />
            </BrowzerHeaderItem_1.default>
            <BrowzerHeaderItem_1.default>[ BrowzerHeaderItem #3 ]<Button_1.default onClick={() => {
            resetAuth();
        }} active={true}>Выйти</Button_1.default></BrowzerHeaderItem_1.default>
        </div>);
};
exports.default = BrowzerHeader;
