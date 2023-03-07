"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const redux_1 = require("../../../../../../hooks/redux");
const useInputValue_1 = require("../../../../../../hooks/useInputValue");
const messages_api_1 = require("../../../../../../store/messages/messages.api");
const helpers_1 = require("../../../../../../../../utils/helpers");
const messages_1 = require("../../../../../../../../enums/messages");
const MessagesContainer_module_scss_1 = __importDefault(require("./MessagesContainer.module.scss"));
const BigButton_1 = __importDefault(require("../../../../../UI/Buttons/BigButton/BigButton"));
const TextArea_1 = __importDefault(require("../../../../../UI/Inputs/Textarea/TextArea"));
const SmallIcon_1 = __importDefault(require("../../../../../UI/Icons/SmallIcon/SmallIcon"));
const MessagesList_1 = __importDefault(require("./MessagesList/MessagesList"));
const NotifyContent_1 = __importDefault(require("./MessagesList/NotifyContent/NotifyContent"));
const consts_1 = require("../../../../../../common/consts");
const MessagesContainer = (props) => {
    const auth = (0, redux_1.useMySelector)((state) => state.auth);
    const { setMessageStatus, addMessage } = (0, redux_1.useActions)();
    const messageInput = (0, useInputValue_1.useInputValue)('');
    const [dispatchSendMessage, {}] = (0, messages_api_1.useLazySendMessageQuery)();
    const sendMessage = function () {
        const tempId = (0, helpers_1.getRandomID)();
        const message = {
            changed: false,
            conversationId: props.activeConversation,
            creationTime: Date.now(),
            from: {
                type: messages_1.SourceType.USER,
                name: auth.login
            },
            id: tempId,
            text: messageInput.value,
            error: false,
            loading: true
        };
        addMessage(message);
        dispatchSendMessage({
            auth: auth.authKey,
            conversationId: props.activeConversation,
            text: messageInput.value,
            tempId: tempId
        })
            .then(({ data }) => {
            if (data !== false && data !== undefined) {
                setMessageStatus({
                    id: tempId,
                    conversationId: props.activeConversation,
                    newId: data.message.id,
                    error: false,
                    loading: false
                });
            }
            else {
                setMessageStatus({
                    id: tempId,
                    conversationId: props.activeConversation,
                    error: true,
                    loading: false
                });
            }
        })
            .catch(() => {
        });
        messageInput.setValue('');
    };
    return (<div className={MessagesContainer_module_scss_1.default.container}>
            {props.activeConversation ?
            <>
                        <div className={MessagesContainer_module_scss_1.default.header}>
                            <TextArea_1.default hook={messageInput} placeholder={'Сообщение'} onSubmit={sendMessage} className={MessagesContainer_module_scss_1.default.messageInput}/>
                            <BigButton_1.default active className={MessagesContainer_module_scss_1.default.button} onClick={sendMessage}>
                                <SmallIcon_1.default className={[MessagesContainer_module_scss_1.default.icon]} src={`${consts_1.serverUrl}/assets/icons/clip.png`}/>
                            </BigButton_1.default>
                        </div>
                        <MessagesList_1.default activeConversation={props.activeConversation}/>
                    </> :
            <NotifyContent_1.default hide={props.activeConversation !== ''}>Беседа не выбрана ლ(ಠ_ಠ ლ)</NotifyContent_1.default>}
        </div>);
};
exports.default = MessagesContainer;
