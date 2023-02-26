import React, {useEffect} from 'react';
import './App.scss';
import Auth from "./pages/auth/Auth";
import {useMySelector} from "./hooks/redux";
import Browzer from "./pages/browzer/Browzer";

const App = () => {
    const auth = useMySelector((state) => state.auth);

    return (
        <>
            {auth.authKey ? <Browzer/> : <Auth/>}
        </>
    );
};

export default App;