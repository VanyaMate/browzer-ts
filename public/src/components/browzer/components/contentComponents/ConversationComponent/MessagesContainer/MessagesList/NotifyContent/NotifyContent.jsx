"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const NotifyContent_module_scss_1 = __importDefault(require("./NotifyContent.module.scss"));
const NotifyContent = (props) => {
    return (<div className={[NotifyContent_module_scss_1.default.container, props.hide ? NotifyContent_module_scss_1.default.hide : ''].join(' ')}>
            {props.children}
        </div>);
};
exports.default = NotifyContent;
