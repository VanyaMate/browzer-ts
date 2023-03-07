"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const MediumIcon_module_scss_1 = __importDefault(require("./MediumIcon.module.scss"));
const MediumIcon = (props) => {
    var _a;
    return (<img className={[MediumIcon_module_scss_1.default.img, props.br ? MediumIcon_module_scss_1.default.br : ''].join(' ')} src={props.src} alt={(_a = props.alt) !== null && _a !== void 0 ? _a : ''}/>);
};
exports.default = MediumIcon;
