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
const ComponentSelector_module_scss_1 = __importDefault(require("./ComponentSelector.module.scss"));
const DropdownAbsolute_1 = __importDefault(require("../../UI/Dropdowns/DropdownAbsolute"));
const useInputValue_1 = require("../../../hooks/useInputValue");
const Vertical_1 = __importDefault(require("../../UI/Lists/Vertical/Vertial/Vertical"));
const Input_1 = __importDefault(require("../../UI/Inputs/Input/Input"));
const BrowzerContentItemsList_1 = __importDefault(require("../../../common/BrowzerContentItemsList"));
const validationMethods_1 = require("../../../../../utils/validationMethods");
const Button_1 = __importDefault(require("../../UI/Buttons/Button/Button"));
const useBrowzerBlocks_1 = require("../../../hooks/useBrowzerBlocks");
const SmallDottedSeparator_1 = __importDefault(require("../../UI/Separators/SmallDottedSeparator"));
const BigButton_1 = __importDefault(require("../../UI/Buttons/BigButton/BigButton"));
const SmallTitle_1 = __importDefault(require("../../UI/Titles/SmallTitle/SmallTitle"));
const ComponentSelector = (props) => {
    const blocks = (0, useBrowzerBlocks_1.useBrowzerBlocks)();
    const input = (0, useInputValue_1.useInputValue)('', validationMethods_1.validComponentName);
    const [selectedComponent, setSelectedComponent] = (0, react_1.useState)();
    const [loading, setLoading] = (0, react_1.useState)(false);
    return (<DropdownAbsolute_1.default hide={props.hide} style={{ top: '100%', left: 0, width: '100%', marginTop: 5 }} className={[ComponentSelector_module_scss_1.default.dropdown]}>
            <Vertical_1.default>
                <SmallTitle_1.default>Выберите компонент</SmallTitle_1.default>
                <Vertical_1.default>
                    {Object.keys(BrowzerContentItemsList_1.default).map((key) => {
            const component = BrowzerContentItemsList_1.default[key];
            return <Button_1.default key={key} active css={ComponentSelector_module_scss_1.default} always={key === selectedComponent} onClick={() => {
                    input.setValue(component.defaultTitle);
                    setSelectedComponent(key);
                }} className={ComponentSelector_module_scss_1.default.componentOption}>{component.defaultTitle}</Button_1.default>;
        })}
                </Vertical_1.default>
                <SmallDottedSeparator_1.default />
                <SmallTitle_1.default>Название компонента</SmallTitle_1.default>
                <Input_1.default hook={input} placeholder={'Имя компонента'} className={ComponentSelector_module_scss_1.default.inputName}/>
                <SmallDottedSeparator_1.default />
                <BigButton_1.default active={input.valid && selectedComponent} loading={loading} onClick={() => {
            setLoading(true);
            blocks.addComponent(props.index, input.value, selectedComponent, (error) => {
                setLoading(false);
                setSelectedComponent('');
                input.setValue('');
                if (!error) {
                    props.successHandler && props.successHandler();
                }
                else {
                    props.errorHandler && props.errorHandler();
                }
            });
        }} className={ComponentSelector_module_scss_1.default.addComponentButton}>Добавить</BigButton_1.default>
            </Vertical_1.default>
        </DropdownAbsolute_1.default>);
};
exports.default = ComponentSelector;
