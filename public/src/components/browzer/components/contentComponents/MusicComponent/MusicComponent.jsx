"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const MusicComponent = (props) => {
    return (<div>
            MusicComponent
            <div>id: {props.componentData.id}</div>
        </div>);
};
exports.default = MusicComponent;
