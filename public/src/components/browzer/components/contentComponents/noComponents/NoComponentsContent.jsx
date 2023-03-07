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
const NoComponentsContent_module_scss_1 = __importDefault(require("./NoComponentsContent.module.scss"));
const ComponentSelector_1 = __importDefault(require("../../../UI/ComponentSelector"));
const IconButton_1 = __importDefault(require("../../../../UI/Buttons/IconButton/IconButton"));
const NoComponentsContent = (props) => {
    const [hideSelector, setHideSelector] = (0, react_1.useState)(true);
    return (<div className={NoComponentsContent_module_scss_1.default.container}>
            <div className={NoComponentsContent_module_scss_1.default.relative}>
                <IconButton_1.default active always={!hideSelector} onClick={() => {
            setHideSelector(prev => !prev);
        }}>
                    +
                </IconButton_1.default>

                <ComponentSelector_1.default hide={hideSelector} index={props.index}/>
            </div>
        </div>);
};
exports.default = NoComponentsContent;
