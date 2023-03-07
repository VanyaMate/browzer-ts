"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const BigButton_1 = __importDefault(require("../../../../../../UI/Buttons/BigButton/BigButton"));
const ConversationControl_module_scss_1 = __importDefault(require("./ConversationControl.module.scss"));
const SmallIcon_1 = __importDefault(require("../../../../../../UI/Icons/SmallIcon/SmallIcon"));
const consts_1 = require("../../../../../../../common/consts");
const ConversationControl = (props) => {
    return (<div className={ConversationControl_module_scss_1.default.container}>
            <BigButton_1.default className={ConversationControl_module_scss_1.default.button} active always={props.open} onClick={() => {
            props.setOpen((prev) => !prev);
        }} style={{ marginBottom: 5 }}>
                <SmallIcon_1.default src={`${consts_1.serverAssetsUrl}/icons/right-arrow.png`} className={[ConversationControl_module_scss_1.default.icon, ConversationControl_module_scss_1.default.iconRotate, props.open ? ConversationControl_module_scss_1.default.active : '']}/>
            </BigButton_1.default>
            <BigButton_1.default className={ConversationControl_module_scss_1.default.button}>
                <SmallIcon_1.default src={`${consts_1.serverAssetsUrl}/icons/clipboard.png`} className={[ConversationControl_module_scss_1.default.icon]}/>
            </BigButton_1.default>
            <BigButton_1.default className={ConversationControl_module_scss_1.default.button}>
                <SmallIcon_1.default src={`${consts_1.serverAssetsUrl}/icons/inbox.png`} className={[ConversationControl_module_scss_1.default.icon]}/>
            </BigButton_1.default>
        </div>);
};
exports.default = ConversationControl;
