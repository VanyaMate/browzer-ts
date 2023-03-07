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
const redux_1 = require("../../../../../../hooks/redux");
const messages_api_1 = require("../../../../../../store/messages/messages.api");
const BigButton_1 = __importDefault(require("../../../../../UI/Buttons/BigButton/BigButton"));
const ConversationsContainer_module_scss_1 = __importDefault(require("./ConversationsContainer.module.scss"));
const Vertical_1 = __importDefault(require("../../../../../UI/Lists/Vertical/Vertial/Vertical"));
const ConversationItem_1 = __importDefault(require("./ConversationItem/ConversationItem"));
const ConversationControl_1 = __importDefault(require("./ConversationControl/ConversationControl"));
const ConversationsContainer = (props) => {
    const { conversations, auth, messages } = (0, redux_1.useMySelector)(state => state);
    const [dispatchMessageLoading] = (0, messages_api_1.useLazyGetFromConversationQuery)();
    const { setConversationMessagesStatus, addMessagesToEnd } = (0, redux_1.useActions)();
    const [open, setOpen] = (0, react_1.useState)(props.activeConversation === '');
    const setConversation = function (conversation) {
        props.setActiveConversation(conversation.id);
        const messagesSliceData = messages[conversation.id];
        if (!messagesSliceData.firstLoad && !messagesSliceData.loading && !messagesSliceData.end) {
            setConversationMessagesStatus({
                conversationId: conversation.id,
                firstLoad: true,
                loading: true
            });
            dispatchMessageLoading({
                auth: auth.authKey,
                conversationId: conversation.id,
                limit: 20,
                offset: messagesSliceData.messages.length,
            })
                .then(({ data }) => {
                addMessagesToEnd(data);
                setConversationMessagesStatus({
                    conversationId: conversation.id,
                    loading: false,
                    error: true
                });
            })
                .catch(() => {
                setConversationMessagesStatus({
                    conversationId: conversation.id,
                    loading: false,
                    error: true
                });
            });
        }
    };
    return (<div className={[ConversationsContainer_module_scss_1.default.container, open ? '' : ConversationsContainer_module_scss_1.default.hide].join(' ')}>
            <ConversationControl_1.default open={open} setOpen={setOpen}/>
            <Vertical_1.default>
                {conversations.list.map((conversation) => <BigButton_1.default key={conversation.id} className={ConversationsContainer_module_scss_1.default.button} active always={conversation.id === props.activeConversation} onClick={() => {
                conversation.id !== props.activeConversation &&
                    setConversation(conversation);
            }}>
                            <ConversationItem_1.default always={conversation.id === props.activeConversation} conversation={conversation} setActiveConversation={props.setActiveConversation}/>
                        </BigButton_1.default>)}
            </Vertical_1.default>
        </div>);
};
exports.default = ConversationsContainer;
