"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const TextArea_module_scss_1 = __importDefault(require("./TextArea.module.scss"));
const TextArea = (0, react_1.memo)((props) => {
    const { value, setValue, valid, empty } = props.hook;
    const textarea = (0, react_1.useRef)(null);
    const authHeight = function (element) {
        element.style.height = '19px';
        element.style.height = (element.scrollHeight || 19) + 'px';
    };
    (0, react_1.useEffect)(() => {
        authHeight(textarea.current);
        textarea.current.focus();
    }, [value]);
    return (<div className={[
            TextArea_module_scss_1.default.container,
            empty ? '' : valid ? TextArea_module_scss_1.default.valid : TextArea_module_scss_1.default.noValid,
            props.className ? props.className : ''
        ].join(' ')}>
            <textarea ref={textarea} className={TextArea_module_scss_1.default.textarea} value={value} placeholder={props.placeholder} onChange={e => {
            setValue(e.target.value);
            props.onChange && props.onChange(e.target.value);
        }} onInput={e => authHeight(e.target)} onFocus={props.onFocus} onBlur={props.onBlur} onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
                setTimeout(() => {
                    if (value.trim().length !== 0) {
                        props.onSubmit && props.onSubmit();
                    }
                });
            }
        }}/>
        </div>);
});
exports.default = TextArea;
