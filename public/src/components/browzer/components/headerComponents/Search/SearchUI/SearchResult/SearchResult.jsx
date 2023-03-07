"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const BigButton_1 = __importDefault(require("../../../../../../UI/Buttons/BigButton/BigButton"));
const SearchResult_module_scss_1 = __importDefault(require("./SearchResult.module.scss"));
const SmallIcon_1 = __importDefault(require("../../../../../../UI/Icons/SmallIcon/SmallIcon"));
const DropdownAbsolute_1 = __importDefault(require("../../../../../../UI/Dropdowns/DropdownAbsolute"));
const searchComponentsList_1 = require("../../SearchComponens/searchComponentsList");
const consts_1 = require("../../../../../../../common/consts");
const SearchResult = (props) => {
    return (<div className={SearchResult_module_scss_1.default.container}>
            <BigButton_1.default active className={[SearchResult_module_scss_1.default.button, props.opened ? SearchResult_module_scss_1.default.opened : '']} onClick={() => {
            props.openResults && props.openResults((s) => !s);
            props.openTypes && props.openTypes(false);
        }}>
                <SmallIcon_1.default className={[SearchResult_module_scss_1.default.icon]} src={`${consts_1.serverUrl}/assets/icons/right-arrow.png`}/>
            </BigButton_1.default>
            <DropdownAbsolute_1.default hide={!props.opened} className={[SearchResult_module_scss_1.default.dropdown]}>
                {searchComponentsList_1.searchComponentsList[props.type].map((component) => {
            return <component.Component key={component.name} value={props.value} openResults={props.openResults} openTypes={props.openTypes}/>;
        })}
            </DropdownAbsolute_1.default>
        </div>);
};
exports.default = SearchResult;
