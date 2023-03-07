"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const BrowzerHeader_1 = __importDefault(require("../../components/browzer/header/BrowzerHeader"));
const BrowzerContent_1 = __importDefault(require("../../components/browzer/content/BrowzerContent"));
const Browzer = () => {
    return (<>
            <BrowzerHeader_1.default />
            <BrowzerContent_1.default />
        </>);
};
exports.default = Browzer;
