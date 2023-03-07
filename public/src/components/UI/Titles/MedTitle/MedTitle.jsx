"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const MedTitle_module_scss_1 = __importDefault(require("./MedTitle.module.scss"));
const MedTitle = (props) => {
    return (<div className={MedTitle_module_scss_1.default.title}>
            {props.children}
        </div>);
};
exports.default = MedTitle;
