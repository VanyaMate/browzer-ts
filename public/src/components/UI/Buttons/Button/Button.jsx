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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const Button_module_scss_1 = __importDefault(require("./Button.module.scss"));
const Button = (0, react_1.memo)((props) => {
    const { css: usedCss, active, always, loading, className } = props, other = __rest(props, ["css", "active", "always", "loading", "className"]);
    return (<div className={[
            usedCss ? usedCss.button : Button_module_scss_1.default.button,
            active ? ((usedCss === null || usedCss === void 0 ? void 0 : usedCss.active) || Button_module_scss_1.default.active) : '',
            always ? ((usedCss === null || usedCss === void 0 ? void 0 : usedCss.always) || Button_module_scss_1.default.always) : '',
            loading ? ((usedCss === null || usedCss === void 0 ? void 0 : usedCss.loading) || Button_module_scss_1.default.loading) : '',
            className ? className : ''
        ].flat().join(' ')} {...other}>
            {props.children}
        </div>);
});
exports.default = Button;
