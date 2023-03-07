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
const ControlButtons_module_scss_1 = __importDefault(require("./ControlButtons.module.scss"));
const IconButton_1 = __importDefault(require("../../../../../UI/Buttons/IconButton/IconButton"));
const useBrowzerBlocks_1 = require("../../../../../../hooks/useBrowzerBlocks");
const SmallIcon_1 = __importDefault(require("../../../../../UI/Icons/SmallIcon/SmallIcon"));
const ControlButtons = (0, react_1.memo)((props) => {
    const blocks = (0, useBrowzerBlocks_1.useBrowzerBlocks)();
    const [adding, setAdding] = (0, react_1.useState)(false);
    return (<div className={ControlButtons_module_scss_1.default.container}>
            <IconButton_1.default active always={!props.addComponentMenuHidden} loading={adding} onClick={() => {
            props.setAddComponentMenuHidden(prev => !prev);
            props.setDropdownHidden(true);
        }}>
                +
            </IconButton_1.default>
            {props.componentsAmount > 3 ? <IconButton_1.default active always={props.activeHiddenOption} onClick={() => {
                props.setDropdownHidden(prev => !prev);
                props.setAddComponentMenuHidden(true);
            }}>
                    <SmallIcon_1.default src={'http://localhost:3000/assets/icons/list.png'} className={[ControlButtons_module_scss_1.default.icon, props.activeHiddenOption ? ControlButtons_module_scss_1.default.active : '']}/>
                </IconButton_1.default> : ''}
        </div>);
});
exports.default = ControlButtons;
