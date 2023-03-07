"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Vertical_module_scss_1 = __importDefault(require("./Vertical.module.scss"));
const Vertical = (props) => {
    return (<div className={[
            Vertical_module_scss_1.default.container,
            props.className || '',
            props.type === 'bottom' ? Vertical_module_scss_1.default.bottom : Vertical_module_scss_1.default.top
        ].flat().join(' ')} style={props.style}>
            {props.children}
        </div>);
};
exports.default = Vertical;
