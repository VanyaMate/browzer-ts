"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const BrowzerHeaderItem_module_scss_1 = __importDefault(require("./BrowzerHeaderItem.module.scss"));
const BrowzerHeaderItem = (props) => {
    return (<div className={[BrowzerHeaderItem_module_scss_1.default.container, props.nbg ? BrowzerHeaderItem_module_scss_1.default.nbg : ''].join(' ')}>
            {props.children}
        </div>);
};
exports.default = BrowzerHeaderItem;
