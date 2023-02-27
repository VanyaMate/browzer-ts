import React, {useEffect} from 'react';
import './App.scss';
import Auth from "./pages/auth/Auth";
import {useActions, useMySelector} from "./hooks/redux";
import Browzer from "./pages/browzer/Browzer";
import {useAuthSessionKeyQuery} from "./store/auth/auth.api";

const App = () => {
    const auth = useMySelector((state) => state.auth);
    const {isLoading, isError, data: userData} = useAuthSessionKeyQuery(auth.authKey, { skip: (auth.authKey === '') || (auth.login !== '') });
    const {
        setFriends, setConversations, setNotifications, setAuth,
        resetAuth
    } = useActions();

    useEffect(() => {
        if (userData) {
            setAuth({login: userData.login, sessionKey: userData.sessionKey});
            setFriends(userData);
            setNotifications(userData.notifications);
            setConversations(userData.conversations);
        } else if (userData === false) {
            resetAuth();
        }
    }, [userData])

    return auth.authKey ? <Browzer/> : <Auth/>;
};

export default App;