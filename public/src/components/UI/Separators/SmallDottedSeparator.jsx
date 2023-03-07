"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const SmallDottedSeparator_module_scss_1 = __importDefault(require("./SmallDottedSeparator.module.scss"));
const SmallDottedSeparator = () => {
    return (<div className={SmallDottedSeparator_module_scss_1.default.sep}></div>);
};
exports.default = SmallDottedSeparator;
