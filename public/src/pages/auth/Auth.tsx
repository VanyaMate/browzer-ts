import React from 'react';
import css from './Auth.module.scss';
import LoginForm from "./LoginForm/LoginForm";
import RegistrationForm from "./RegistrationForm/RegistrationForm";

const Auth = () => {
    return (
        <div className={css.container}>
            <LoginForm/>
            <RegistrationForm/>
        </div>
    );
};

export default Auth;