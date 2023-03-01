import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {StoreType} from "../store";
import {bindActionCreators} from "redux";
import {authActions} from "../store/auth/auth.slice";
import {friendsActions} from "../store/friends/friends.slice";
import {conversationsActions} from "../store/conversations/conversations.slice";
import {notificationsActions} from "../store/notifications/notifications.slice";
import {messagesActions} from "../store/messages/messages.slice";
import {blocksActions} from "../store/blocks/blocks.slice";

const actions = {
    ...authActions,
    ...friendsActions,
    ...conversationsActions,
    ...notificationsActions,
    ...messagesActions,
    ...blocksActions
}

export const useMySelector: TypedUseSelectorHook<StoreType> = useSelector;
export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(actions, dispatch);
}