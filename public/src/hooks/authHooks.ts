import {IPrivateUserData, IPublicUserData} from "../../../interfaces/users";
import {useActions} from "./redux";
import {INotification} from "../../../interfaces/notifications";
import {IConversation} from "../../../interfaces/conversations";
import {useSocketAuth, useSocketDisconnect} from "./socketHooks";

export const useLogIn = function () {
    const {
        setAuth,
        setConversations,
        setFriends,
        setNotifications,
        setMessages
    } = useActions();
    const socketAuth = useSocketAuth();

    return (authData: IPrivateUserData<
        IPublicUserData<string>,
        INotification<string>,
        IConversation<IPublicUserData<string>>
        >
    ) => {
        setAuth({login: authData.login, sessionKey: authData.sessionKey});
        setFriends(authData);
        setNotifications(authData.notifications);
        setConversations(authData.conversations);
        setMessages(authData.conversations);
        socketAuth({ login: authData.login, sessionKey: authData.sessionKey });
    }
}

export const useLogOut = function () {
    const {resetAuth, resetMessages, resetConversations, resetFriends, resetNotifications} = useActions();
    const socketDisconnect = useSocketDisconnect();

    return () => {
        socketDisconnect();
        resetAuth();
        resetConversations();
        resetFriends();
        resetNotifications();
        resetMessages();
    }
}