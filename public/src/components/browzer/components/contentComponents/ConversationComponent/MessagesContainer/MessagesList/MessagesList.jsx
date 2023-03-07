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
const Message_1 = __importDefault(require("../Message/Message"));
const Vertical_1 = __importDefault(require("../../../../../../UI/Lists/Vertical/Vertial/Vertical"));
const MessagesList_module_scss_1 = __importDefault(require("./MessagesList.module.scss"));
const redux_1 = require("../../../../../../../hooks/redux");
const NotifyContent_1 = __importDefault(require("./NotifyContent/NotifyContent"));
const MessagesList = (0, react_1.memo)((props) => {
    var _a, _b;
    const auth = (0, redux_1.useMySelector)((state) => state.auth);
    const messages = (0, redux_1.useMySelector)((state) => state.messages);
    return (<Vertical_1.default className={MessagesList_module_scss_1.default.container}>
            <NotifyContent_1.default hide={((_a = messages[props.activeConversation]) === null || _a === void 0 ? void 0 : _a.messages.length) !== 0}>Так пусто... ┐(‘～` )┌</NotifyContent_1.default>
            {(_b = messages[props.activeConversation]) === null || _b === void 0 ? void 0 : _b.messages.map((message) => {
            return <Message_1.default key={message.id} message={message} my={auth.login === message.from.name}/>;
        }).reverse()}
        </Vertical_1.default>);
});
exports.default = MessagesList;
