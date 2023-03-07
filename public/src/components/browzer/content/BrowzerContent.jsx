"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const BrowzerContent_module_scss_1 = __importDefault(require("./BrowzerContent.module.scss"));
const redux_1 = require("../../../hooks/redux");
const BrowzerContentItem_1 = __importDefault(require("./contentItem/BrowzerContentItem"));
const BrowzerContent = () => {
    const blocks = (0, redux_1.useMySelector)((state) => state.blocks);
    return (<div className={BrowzerContent_module_scss_1.default.container}>
            {blocks.blocks.map((block, index) => {
            return <BrowzerContentItem_1.default key={index} index={index} block={block}/>;
        })}
        </div>);
};
exports.default = BrowzerContent;
