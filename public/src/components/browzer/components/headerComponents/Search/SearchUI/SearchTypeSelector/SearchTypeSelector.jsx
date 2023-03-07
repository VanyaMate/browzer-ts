"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const BigButton_1 = __importDefault(require("../../../../../../UI/Buttons/BigButton/BigButton"));
const SearchTypeSelector_module_scss_1 = __importDefault(require("./SearchTypeSelector.module.scss"));
const DropdownAbsolute_1 = __importDefault(require("../../../../../../UI/Dropdowns/DropdownAbsolute"));
const searchComponentsList_1 = require("../../SearchComponens/searchComponentsList");
const Button_1 = __importDefault(require("../../../../../../UI/Buttons/Button/Button"));
const Vertical_1 = __importDefault(require("../../../../../../UI/Lists/Vertical/Vertial/Vertical"));
const SearchTypeSelector = (props) => {
    return (<div className={SearchTypeSelector_module_scss_1.default.container}>
            <BigButton_1.default className={SearchTypeSelector_module_scss_1.default.button} active onClick={() => {
            props.setOpenTypeDrop(!props.openTypeDrop);
            props.setOpenResultDrop(false);
        }}>
                <div className={SearchTypeSelector_module_scss_1.default.text}>/{props.activeType.toLocaleLowerCase()}</div>
            </BigButton_1.default>
            <DropdownAbsolute_1.default className={[SearchTypeSelector_module_scss_1.default.dropdown]} hide={!props.openTypeDrop}>
                <Vertical_1.default>
                    {Object.keys(searchComponentsList_1.searchComponentsList).map((key) => {
            return <Button_1.default key={key} active className={SearchTypeSelector_module_scss_1.default.dropButton} onClick={() => {
                    var _a;
                    props.setOpenTypeDrop(false);
                    props.setType(key);
                    (_a = props.inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
                    props.setOpenResultDrop(true);
                }}>
                                /{key.toLowerCase()}
                            </Button_1.default>;
        })}
                </Vertical_1.default>
            </DropdownAbsolute_1.default>
        </div>);
};
exports.default = SearchTypeSelector;
