"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Component_module_scss_1 = __importDefault(require("./Component.module.scss"));
const Component = (props) => {
    return (<div className={[Component_module_scss_1.default.container, props.active ? Component_module_scss_1.default.active : ''].join(' ')}>
            {props.children}
        </div>);
};
exports.default = Component;
