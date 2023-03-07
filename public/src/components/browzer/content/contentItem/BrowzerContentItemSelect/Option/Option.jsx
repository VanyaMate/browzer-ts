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
const ClickInput_1 = __importDefault(require("../../../../../UI/Inputs/ClickInput/ClickInput"));
const AbsoluteButton_1 = __importDefault(require("../../../../../UI/Buttons/AbsoluteButton/AbsoluteButton"));
const Button_1 = __importDefault(require("../../../../../UI/Buttons/Button/Button"));
const useBrowzerBlocks_1 = require("../../../../../../hooks/useBrowzerBlocks");
const Option_module_scss_1 = __importDefault(require("./Option.module.scss"));
const validationMethods_1 = require("../../../../../../../../utils/validationMethods");
const Option = (props) => {
    const [removeFetching, setRemoveFetching] = (0, react_1.useState)(false);
    const blocks = (0, useBrowzerBlocks_1.useBrowzerBlocks)();
    return (<Button_1.default onClick={() => props.setActive(props.option.id)} active always={props.active === props.option.id} style={{ position: 'relative' }} className={removeFetching ? Option_module_scss_1.default.removeFetch : ''}>
            <ClickInput_1.default value={props.option.name} successHandler={(name) => {
            blocks.renameComponent(props.index, props.option.id, name);
        }} errorHandler={() => { }} validator={validationMethods_1.validComponentName}/>
            <AbsoluteButton_1.default className={Option_module_scss_1.default.deleteButton} onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setRemoveFetching(true);
            blocks.removeComponent(props.index, props.option.id);
        }}>
                X
            </AbsoluteButton_1.default>
        </Button_1.default>);
};
exports.default = Option;
