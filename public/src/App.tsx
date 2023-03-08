import React, {useEffect} from 'react';
import './App.scss';
import Auth from "./pages/auth/Auth";
import {useMySelector} from "./hooks/redux";
import Browzer from "./pages/browzer/Browzer";
import {useAuthSessionKeyQuery} from "./store/auth/auth.api";
import {useLogIn, useLogOut} from "./hooks/authHooks";
import ServerConnectionStatus
    from "./components/browzer/components/otherComponents/ServerConnectionStatus/ServerConnectionStatus";

const App = () => {
    const auth = useMySelector((state) => state.auth);
    const {isLoading, isFetching, isError, data: userData, refetch} = useAuthSessionKeyQuery(auth.authKey, { skip: (auth.authKey === '') || (auth.login !== '') });
    const logInMethod = useLogIn();
    const logOutMethod = useLogOut();

    useEffect(() => {
        if (userData) {
            logInMethod(userData);
        } else if (userData === false) {
            logOutMethod();
        }
    }, [userData])

    useEffect(() => {
        if (!isFetching && isError) {
            setTimeout(() => refetch(), 1000);
        }
    }, [isFetching, isError])

    return <>
        <ServerConnectionStatus/>
        {
            auth.authKey ? <Browzer/> : <Auth/>
        }
    </>
};

export default App;