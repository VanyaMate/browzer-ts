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
const ConversationItem_module_scss_1 = __importDefault(require("./ConversationItem.module.scss"));
const MediumIcon_1 = __importDefault(require("../../../../../../UI/Icons/MediumIcon/MediumIcon"));
const redux_1 = require("../../../../../../../hooks/redux");
const AbsoluteButton_1 = __importDefault(require("../../../../../../UI/Buttons/AbsoluteButton/AbsoluteButton"));
const conversations_api_1 = require("../../../../../../../store/conversations/conversations.api");
const ConversationItem = (props) => {
    var _a, _b;
    const { auth, messages } = (0, redux_1.useMySelector)(state => state);
    const { name, icon } = (0, react_1.useMemo)(() => {
        var _a, _b;
        const data = { name: '', icon: '' };
        if (props.conversation.name) {
            data.name = props.conversation.name;
        }
        else {
            const member = props.conversation.members.filter((member) => member.login !== auth.login)[0];
            if (member) {
                data.name = member.login;
                if (props.conversation.icon) {
                    data.icon = props.conversation.icon;
                }
                else {
                    data.icon = (_b = (_a = member.data) === null || _a === void 0 ? void 0 : _a.avatar) !== null && _b !== void 0 ? _b : '';
                }
            }
        }
        return data;
    }, [props.conversation.name, props.conversation.icon, props.conversation.members]);
    const [dispatchConversationRemove, { isFetching: removeLoading }] = (0, conversations_api_1.useLazyDeleteConversationQuery)();
    const { removeConversation } = (0, redux_1.useActions)();
    return (<div className={[
            ConversationItem_module_scss_1.default.container,
            props.always ? ConversationItem_module_scss_1.default.always : '',
            removeLoading ? ConversationItem_module_scss_1.default.loading : ''
        ].join(' ')}>
            <div className={ConversationItem_module_scss_1.default.icon}>
                <MediumIcon_1.default br src={icon}/>
            </div>
            <div className={ConversationItem_module_scss_1.default.info}>
                <div className={ConversationItem_module_scss_1.default.name}>{name}</div>
                <div className={ConversationItem_module_scss_1.default.message}>{((_b = (_a = messages[props.conversation.id]) === null || _a === void 0 ? void 0 : _a.messages[messages[props.conversation.id].messages.length - 1]) === null || _b === void 0 ? void 0 : _b.text) || ''}</div>
            </div>
            <AbsoluteButton_1.default className={ConversationItem_module_scss_1.default.closeButton} onClick={(e) => {
            e.stopPropagation();
            dispatchConversationRemove({
                auth: auth.authKey,
                id: props.conversation.id
            })
                .then((status) => {
                if (!status) {
                    removeConversation(props.conversation.id);
                    props.setActiveConversation('');
                }
            });
        }}>X</AbsoluteButton_1.default>
        </div>);
};
exports.default = ConversationItem;
