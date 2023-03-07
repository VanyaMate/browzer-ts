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
const SearchUserItem_module_scss_1 = __importDefault(require("./SearchUserItem.module.scss"));
const SmallIcon_1 = __importDefault(require("../../../../../../../UI/Icons/SmallIcon/SmallIcon"));
const BigButton_1 = __importDefault(require("../../../../../../../UI/Buttons/BigButton/BigButton"));
const conversations_api_1 = require("../../../../../../../../store/conversations/conversations.api");
const redux_1 = require("../../../../../../../../hooks/redux");
const user_1 = require("../../../../../../../../../../enums/user");
const conversations_1 = require("../../../../../../../../../../enums/conversations");
const consts_1 = require("../../../../../../../../common/consts");
const canCreateConversation = function (user, myFriends) {
    const conversationPref = user.preferences.conversations;
    if (conversationPref === user_1.AccessType.ALL) {
        return true;
    }
    else if (conversationPref === user_1.AccessType.FRIENDS && inFriends(user.login, myFriends)) {
        return true;
    }
    else {
        return false;
    }
};
const conversationExistWith = function (userLogin, conversations) {
    return conversations.some((conversation) => {
        return (conversation.type === conversations_1.ConversationType.SINGLE) && conversation.members.some((member) => member.login === userLogin);
    });
};
const conversationAccessWith = function (user, conversations, friends) {
    return canCreateConversation(user, friends) || conversationExistWith(user.login, conversations);
};
const friendAccessWith = function (user, friendsRequestIn) {
    return (user.preferences.friends === user_1.AccessType.ALL) ||
        friendsRequestIn.some((friendRequest) => friendRequest.login === user.login);
};
const inFriends = function (userLogin, friendsList) {
    return friendsList.some((friend) => friend.login === userLogin);
};
const SearchUserItem = (0, react_1.memo)((props) => {
    const { friends, conversations, auth } = (0, redux_1.useMySelector)((state) => state);
    const [dispatchCreateConversation, { isFetching: conversationCreation }] = (0, conversations_api_1.useLazyCreateConversationQuery)();
    const { addConversation, setMessages } = (0, redux_1.useActions)();
    const isFriend = (0, react_1.useMemo)(() => inFriends(props.user.login, friends.friends), [props.user, friends.friends]);
    const isFriendRequestOut = (0, react_1.useMemo)(() => inFriends(props.user.login, friends.requestsOut), [props.user, friends.requestsOut]);
    const isFriendRequestIn = (0, react_1.useMemo)(() => inFriends(props.user.login, friends.requestsIn), [props.user, friends.requestsIn]);
    const conversationAccess = (0, react_1.useMemo)(() => conversationAccessWith(props.user, conversations.list, friends.friends), [conversations.list, friends.friends]);
    const friendsAccess = (0, react_1.useMemo)(() => friendAccessWith(props.user, friends.requestsIn), [props.user, friends.requestsIn]);
    return (<div className={SearchUserItem_module_scss_1.default.container}>
            <div className={SearchUserItem_module_scss_1.default.avatar}>
                <SmallIcon_1.default br src={props.user.avatar}/>
            </div>
            <div className={SearchUserItem_module_scss_1.default.login}>{props.user.login}</div>
            <div className={SearchUserItem_module_scss_1.default.control}>
                <BigButton_1.default 
    // TODO: Может быть сюда добавлять проверку на isFetching
    active={conversationAccess} className={[SearchUserItem_module_scss_1.default.message, SearchUserItem_module_scss_1.default.button, conversationCreation ? SearchUserItem_module_scss_1.default.loading : ''].join(' ')} onClick={() => {
            if (!conversationCreation && !conversationExistWith(props.user.login, conversations.list)) {
                // create conversation
                // add to conversation.list and messages
                dispatchCreateConversation({
                    auth: auth.authKey,
                    type: conversations_1.ConversationType.SINGLE,
                    members: [props.user.login]
                })
                    .then(({ data }) => {
                    if (data) {
                        addConversation(data);
                        setMessages([data]);
                    }
                });
            }
            // open conversation
        }}>
                    <SmallIcon_1.default src={`${consts_1.serverUrl}/assets/icons/messenger.png`} className={[SearchUserItem_module_scss_1.default.buttonIcon]}/>
                </BigButton_1.default>
                <BigButton_1.default active={friendsAccess} className={[SearchUserItem_module_scss_1.default.addFriend, SearchUserItem_module_scss_1.default.button].join(' ')} onClick={() => {
        }}>
                    <SmallIcon_1.default src={`${consts_1.serverUrl}/assets/icons/high-five.png`} className={[SearchUserItem_module_scss_1.default.buttonIcon]}/>
                </BigButton_1.default>
            </div>
        </div>);
});
exports.default = SearchUserItem;
