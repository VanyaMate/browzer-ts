"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const TextArea_1 = __importDefault(require("../../../../UI/Inputs/Textarea/TextArea"));
const useInputValue_1 = require("../../../../../hooks/useInputValue");
const IFrameComponent = (props) => {
    const textarea = (0, useInputValue_1.useInputValue)('');
    return (<div>
            IFrameComponent
            <div>id: {props.componentData.id}</div>
            <TextArea_1.default hook={textarea} onSubmit={() => {
            console.log(textarea.value);
            textarea.setValue('');
        }}/>
        </div>);
};
exports.default = IFrameComponent;
