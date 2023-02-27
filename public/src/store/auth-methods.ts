import {IPrivateUserData, IPublicUserData} from "../../../interfaces/users";
import {useActions} from "../hooks/redux";
import {INotification} from "../../../interfaces/notifications";
import {IConversation} from "../../../interfaces/conversations";

export const logIn = function (
    authData: IPrivateUserData<
        IPublicUserData<string>,
        INotification<string>,
        IConversation<IPublicUserData<string>>
    >
) {
    const {setAuth, setConversations, setFriends, setNotifications} = useActions();
    return () => {
        setAuth({login: authData.login, sessionKey: authData.sessionKey});
        setFriends(authData);
        setNotifications(authData.notifications);
        setConversations(authData.conversations);
    }
}

export const logOut = function () {
    const {resetAuth, resetConversations, resetFriends, resetNotifications} = useActions();

    return () => {
        resetAuth();
        resetConversations();
        resetFriends();
        resetNotifications();
    }
}