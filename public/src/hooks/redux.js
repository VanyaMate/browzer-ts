"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useActions = exports.useMySelector = void 0;
const react_redux_1 = require("react-redux");
const redux_1 = require("redux");
const auth_slice_1 = require("../store/auth/auth.slice");
const friends_slice_1 = require("../store/friends/friends.slice");
const conversations_slice_1 = require("../store/conversations/conversations.slice");
const notifications_slice_1 = require("../store/notifications/notifications.slice");
const messages_slice_1 = require("../store/messages/messages.slice");
const blocks_slice_1 = require("../store/blocks/blocks.slice");
const actions = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, auth_slice_1.authActions), friends_slice_1.friendsActions), conversations_slice_1.conversationsActions), notifications_slice_1.notificationsActions), messages_slice_1.messagesActions), blocks_slice_1.blocksActions);
exports.useMySelector = react_redux_1.useSelector;
const useActions = () => {
    const dispatch = (0, react_redux_1.useDispatch)();
    return (0, redux_1.bindActionCreators)(actions, dispatch);
};
exports.useActions = useActions;
