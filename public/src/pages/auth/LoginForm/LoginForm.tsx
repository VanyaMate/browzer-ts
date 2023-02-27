import React, {ChangeEvent, useEffect, useState} from 'react';
import css from './LoginForm.module.scss';
import MedTitle from "../../../components/UI/Titles/MedTitle/MedTitle";
import {IUserInputValue, useInputValue} from "../../../hooks/useInputValue";
import {validLogin, validPassword} from "../../../../../utils/validationMethods";
import Input from "../../../components/UI/Inputs/Input";
import BigButton from "../../../components/UI/Buttons/BigButton/BigButton";
import {useLazyAuthPassQuery} from "../../../store/auth/auth.api";
import SmallDottedSeparator from "../../../components/UI/Separators/SmallDottedSeparator";
import {useActions} from "../../../hooks/redux";

const LoginForm = () => {
    const login: IUserInputValue = useInputValue('', validLogin);
    const pass: IUserInputValue = useInputValue('', validPassword);
    const [valid, setValid] = useState(false);
    const [authPass, { isLoading, isError, isFetching, data: userData }] = useLazyAuthPassQuery();
    const {
        setFriends, setConversations, setNotifications, setAuth,
        resetAuth
    } = useActions();

    useEffect(() => {
        setValid(!!login.value && !!pass.value && !login.empty && !pass.empty);
    }, [login.value, pass.value]);

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

    return (
        <div className={css.container}>
            <MedTitle>Вход</MedTitle>
            <Input hook={login} placeholder={"Логин"}/>
            <Input hook={pass} placeholder={"Пароль"} type={"password"}/>
            <SmallDottedSeparator/>
            <BigButton
                active={valid}
                always={valid}
                onClick={() => !isFetching && authPass(login.value + ':' + pass.value)}
            >Вход</BigButton>
        </div>
    );
};

export default LoginForm;