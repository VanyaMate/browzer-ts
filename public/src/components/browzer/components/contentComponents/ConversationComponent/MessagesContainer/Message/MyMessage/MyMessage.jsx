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
const MyMessage_module_scss_1 = __importDefault(require("./MyMessage.module.scss"));
const helpers_1 = require("../../../../../../../../../../utils/helpers");
const ClickTextarea_1 = __importDefault(require("../../../../../../../UI/Inputs/ClickTextarea/ClickTextarea"));
const AbsoluteButton_1 = __importDefault(require("../../../../../../../UI/Buttons/AbsoluteButton/AbsoluteButton"));
const SmallIcon_1 = __importDefault(require("../../../../../../../UI/Icons/SmallIcon/SmallIcon"));
const messages_api_1 = require("../../../../../../../../store/messages/messages.api");
const redux_1 = require("../../../../../../../../hooks/redux");
const MyMessage = (0, react_1.memo)((props) => {
    const auth = (0, redux_1.useMySelector)(state => state.auth);
    const { changeMessageText, removeMessage } = (0, redux_1.useActions)();
    const [dispatchChangeMessage, { isFetching: changeLoading, isError: changeError }] = (0, messages_api_1.useLazyChangeMessageQuery)();
    const [dispatchDeleteMessage, { isFetching: deleteLoading, isError: deleteError }] = (0, messages_api_1.useLazyDeleteMessageQuery)();
    return (<div className={[
            MyMessage_module_scss_1.default.container,
            (props.message.loading || deleteLoading || changeLoading) ? MyMessage_module_scss_1.default.loading : '',
            (props.message.error || deleteError || changeError) ? MyMessage_module_scss_1.default.error : '',
        ].join(' ')}>
            <div className={MyMessage_module_scss_1.default.info}>
                <div className={MyMessage_module_scss_1.default.headerInfo}>
                    <div className={MyMessage_module_scss_1.default.changed}>{props.message.changed ? '(изм.)' : ''}</div>
                    <div className={MyMessage_module_scss_1.default.time}>
                        {(0, helpers_1.getStringDate)(props.message.creationTime)}
                    </div>
                    <AbsoluteButton_1.default className={MyMessage_module_scss_1.default.deleteButton} onClick={() => {
            dispatchDeleteMessage({ auth: auth.authKey, messageId: props.message.id })
                .then((status) => {
                if (status) {
                    removeMessage(props.message);
                }
            });
        }}>
                        X
                    </AbsoluteButton_1.default>
                </div>
                <div className={MyMessage_module_scss_1.default.message}>
                    {props.message.error ?
            <AbsoluteButton_1.default className={MyMessage_module_scss_1.default.tryAgain} onClick={() => {
                    console.log('reload message', props.message.id);
                }}>
                            <SmallIcon_1.default src={'http://localhost:3000/assets/icons/reload.png'} className={[MyMessage_module_scss_1.default.reloadIcon]}/>
                        </AbsoluteButton_1.default> : ''}
                    <ClickTextarea_1.default value={props.message.text} className={[MyMessage_module_scss_1.default.input]} validator={(v) => v.length !== 0} successHandler={(text) => {
            dispatchChangeMessage({ auth: auth.authKey, text, messageId: props.message.id })
                .then((status) => {
                if (status) {
                    changeMessageText({
                        conversationId: props.message.conversationId,
                        messageId: props.message.id,
                        text
                    });
                }
            });
        }}/>
                </div>
            </div>
        </div>);
});
exports.default = MyMessage;
