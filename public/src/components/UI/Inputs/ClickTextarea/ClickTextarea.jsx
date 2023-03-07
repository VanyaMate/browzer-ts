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
const ClickTextarea_module_scss_1 = __importDefault(require("./ClickTextarea.module.scss"));
const useInputValue_1 = require("../../../../hooks/useInputValue");
const TextArea_1 = __importDefault(require("../Textarea/TextArea"));
const ClickTextarea = (0, react_1.memo)((props) => {
    var _a;
    const inputValue = (0, useInputValue_1.useInputValue)(props.value, props.validator);
    const [redactMod, setRedactMod] = (0, react_1.useState)(false);
    const [previousTimer, setPreviousTimer] = (0, react_1.useState)(Date.now());
    const [previousText, setPreviousText] = (0, react_1.useState)(props.value);
    const [showedText, setShowedText] = (0, react_1.useState)(props.value);
    const inputRef = (0, react_1.useRef)();
    const [makeHandler, setMakeHandler] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        if (!redactMod && makeHandler) {
            if (inputValue.valid && !inputValue.empty) {
                setPreviousText(inputValue.value);
                props.successHandler && props.successHandler(inputValue.value);
            }
            else {
                inputValue.setValue(previousText);
                setShowedText(previousText);
                props.errorHandler && props.errorHandler();
            }
            setMakeHandler(false);
        }
    }, [redactMod]);
    const enterHandler = function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            setRedactMod(false);
            window.removeEventListener('keydown', enterHandler);
        }
    };
    const clickHandler = function () {
        if (redactMod)
            return;
        setPreviousTimer(prev => {
            if ((Date.now() - prev) < 300 && !redactMod) {
                setRedactMod(true);
                setPreviousText(inputValue.value);
                setMakeHandler(true);
                window.addEventListener('keydown', enterHandler);
                setTimeout(() => {
                    var _a;
                    (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
                });
            }
            return Date.now();
        });
    };
    return (<div className={ClickTextarea_module_scss_1.default.container} onClick={() => clickHandler()}>
            {redactMod ? <TextArea_1.default reff={inputRef} hook={inputValue} className={[ClickTextarea_module_scss_1.default.input, (_a = props.className) !== null && _a !== void 0 ? _a : ''].flat().join(' ')} onChange={setShowedText}/> : <div className={ClickTextarea_module_scss_1.default.value} dangerouslySetInnerHTML={{ __html: showedText.replace(/\n/g, '<br>') }}/>}
        </div>);
});
exports.default = ClickTextarea;
