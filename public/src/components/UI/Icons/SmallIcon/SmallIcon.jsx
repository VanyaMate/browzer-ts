"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const SmallIcon_module_scss_1 = __importDefault(require("./SmallIcon.module.scss"));
const SmallIcon = (props) => {
    var _a;
    return (<img className={[SmallIcon_module_scss_1.default.img, props.br ? SmallIcon_module_scss_1.default.br : '', props.className].flat().join(' ')} src={props.src} alt={(_a = props.alt) !== null && _a !== void 0 ? _a : ''}/>);
};
exports.default = SmallIcon;
