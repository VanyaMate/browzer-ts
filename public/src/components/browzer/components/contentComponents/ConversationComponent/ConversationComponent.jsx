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
const ConversationComponent_module_scss_1 = __importDefault(require("./ConversationComponent.module.scss"));
const MessagesContainer_1 = __importDefault(require("./MessagesContainer/MessagesContainer"));
const ConversationsContainer_1 = __importDefault(require("./ConversationsContainer/ConversationsContainer"));
const ConversationComponent = (props) => {
    const [activeConversation, setActiveConversation] = (0, react_1.useState)('');
    return (<div className={ConversationComponent_module_scss_1.default.container}>
            <MessagesContainer_1.default activeConversation={activeConversation}/>
            <ConversationsContainer_1.default activeConversation={activeConversation} setActiveConversation={setActiveConversation}/>
        </div>);
};
exports.default = ConversationComponent;
