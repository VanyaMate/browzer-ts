import React, {useEffect} from 'react';
import './App.scss';
import Auth from "./pages/auth/Auth";
import {useActions, useMySelector} from "./hooks/redux";
import Browzer from "./pages/browzer/Browzer";
import {useAuthSessionKeyQuery} from "./store/auth/auth.api";
import {socketClientManager} from "./main";
import {NotificationType} from "../../enums/notifications";
import {IPublicUserData} from "../../interfaces/users";
import {INotification} from "../../interfaces/notifications";

const App = () => {
    const auth = useMySelector((state) => state.auth);
    const {isLoading, isError, data: userData} = useAuthSessionKeyQuery(auth.authKey, { skip: (auth.authKey === '') || (auth.login !== '') });
    const {
        setFriends, setConversations, setNotifications, setAuth,
        resetAuth
    } = useActions();

    const {
        addRequestIn, addRequestOut, addFriend,
        removeRequestIn, removeRequestOut, removeFriend
    } = useActions();

    const {addNotification} = useActions();

    useEffect(() => {
        if (userData) {
            console.log(userData.notifications);
            setAuth({login: userData.login, sessionKey: userData.sessionKey});
            setFriends(userData);
            setNotifications(userData.notifications);
            setConversations(userData.conversations);
        } else if (userData === false) {
            resetAuth();
        }
    }, [userData])

    useEffect(() => {
        if (auth.login && auth.sessionKey) {
            socketClientManager.addHandlerOnSocket(NotificationType.FRIEND_IN_REQUEST, (data: unknown) => {
                const message = data as { user: IPublicUserData<string>, notification: INotification<string> };
                addRequestIn(message.user)
                addNotification(message.notification);
            })
            socketClientManager.addHandlerOnSocket(NotificationType.FRIEND_IN_REQUEST_CANCELED, (data: unknown) => {
                const message = data as { user: IPublicUserData<string>, notification: INotification<string> };
                removeRequestIn(message.user.login)
                addNotification(message.notification);
            })
            socketClientManager.auth([auth.login, auth.sessionKey]);
        } else {
            socketClientManager.disconnect([auth.login, auth.sessionKey]);
            socketClientManager.resetHandlersFromSocket();
        }
    }, [auth])

    return auth.authKey ? <Browzer/> : <Auth/>;
};

export default App;