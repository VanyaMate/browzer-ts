import {useActions, useMySelector} from "./redux";
import {socketClientManager} from "../main";
import {NotificationType} from "../../../enums/notifications";
import {IPublicUserData} from "../../../interfaces/users";
import {INotification} from "../../../interfaces/notifications";
import {IConversation} from "../../../interfaces/conversations";
import {IMessage} from "../../../interfaces/messages";

export const useSocketAuth = function () {
    const connectFriendsSocket = useFriendsSocket();
    const connectConversationsSocket = useConversationsSocket();
    const connectMessagesSocket = userMessagesSocket();

    return (auth: { login: string, sessionKey: string }) => {
        connectFriendsSocket();
        connectConversationsSocket();
        connectMessagesSocket();

        console.log('connect sockets');

        socketClientManager.auth([auth.login, auth.sessionKey]);
    };
}

export const useSocketDisconnect = function () {
    const auth = useMySelector((state) => state.auth);

    return () => {
        socketClientManager.disconnect([auth.login, auth.sessionKey]);
        socketClientManager.resetHandlersFromSocket();
    };
}

export const useFriendsSocket = function () {
    const {
        addRequestIn,
        addRequestOut,
        addFriend,
        removeFriend,
        removeRequestIn,
        removeRequestOut,
        addNotification
    } = useActions();

    return () => {
        socketClientManager.addHandlerOnSocket(NotificationType.FRIEND_IN_REQUEST, (data: unknown) => {
            const message = data as { user: IPublicUserData<string>, notification: INotification<string> };
            addRequestIn(message.user);
            addNotification(message.notification);
        })
        socketClientManager.addHandlerOnSocket(NotificationType.FRIEND_IN_REQUEST_CANCELED, (data: unknown) => {
            const message = data as { user: IPublicUserData<string>, notification: INotification<string> };
            removeRequestIn(message.user.login);
            addNotification(message.notification);
        })
        socketClientManager.addHandlerOnSocket(NotificationType.FRIEND_OUT_REQUEST_CANCELED, (data: unknown) => {
            const message = data as { user: IPublicUserData<string>, notification: INotification<string> };
            removeRequestOut(message.user.login);
            addNotification(message.notification);
        })
        socketClientManager.addHandlerOnSocket(NotificationType.FRIEND_ACCEPT, (data: unknown) => {
            const message = data as { user: IPublicUserData<string>, notification: INotification<string> };
            removeRequestOut(message.user.login);
            addFriend(message.user);
            addNotification(message.notification);
        })
        socketClientManager.addHandlerOnSocket(NotificationType.FRIEND_REMOVE, (data: unknown) => {
            const message = data as { user: IPublicUserData<string>, notification: INotification<string> };
            removeFriend(message.user.login);
            addRequestOut(message.user);
            addNotification(message.notification);
        })
    }
}


export const useConversationsSocket = function () {
    const {
        addConversation,
        removeConversation,
        addNotification
    } = useActions();

    return () => {
        socketClientManager.addHandlerOnSocket(NotificationType.NEW_CONVERSATION, (data: unknown) => {
            const message = data as { conversation: IConversation<IPublicUserData<string>>, notification: INotification<string> };
            addConversation(message.conversation);
            addNotification(message.notification);
        })
        socketClientManager.addHandlerOnSocket(NotificationType.CONVERSATION_REMOVED, (data: unknown) => {
            const message = data as { conversationId: string, notification: INotification<string> };
            removeConversation(message.conversationId)
            addNotification(message.notification);
        })
    }
}

export const userMessagesSocket = function () {
    const {
        addMessage,
        removeMessage,
        changeMessage,
        addNotification
    } = useActions();

    return () => {
        socketClientManager.addHandlerOnSocket(NotificationType.NEW_MESSAGE, (data: unknown) => {
            console.log('NEW_MESSAGE', data);
            const message = data as { message: IMessage, notification: INotification<string> };
            addMessage(message.message);
            addNotification(message.notification);
        })

        socketClientManager.addHandlerOnSocket(NotificationType.MESSAGE_REMOVED, (data: unknown) => {
            console.log('MESSAGE_REMOVED', data);
            const message = data as { message: IMessage, notification: INotification<string> };
            removeMessage(message.message);
            addNotification(message.notification);
        })

        socketClientManager.addHandlerOnSocket(NotificationType.MESSAGE_CHANGED, (data: unknown) => {
            console.log('MESSAGE_CHANGED', data);
            const message = data as { message: { oldText: string, message: IMessage }, notification: INotification<string> };
            changeMessage(message.message.message);
            addNotification(message.notification);
        })
    }
}