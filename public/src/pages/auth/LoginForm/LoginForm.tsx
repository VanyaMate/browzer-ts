import React, {ChangeEvent, useEffect, useState} from 'react';
import css from './LoginForm.module.scss';
import MedTitle from "../../../components/UI/Titles/MedTitle/MedTitle";
import {useInputValue} from "../../../hooks/useInputValue";
import {validLogin, validPassword} from "../../../../../utils/validationMethods";
import Input from "../../../components/UI/Inputs/Input";
import BigButton from "../../../components/UI/Buttons/BigButton/BigButton";
import {useLazyAuthPassQuery} from "../../../store/auth/auth.api";
import SmallDottedSeparator from "../../../components/UI/Separators/SmallDottedSeparator";
import {useActions} from "../../../hooks/redux";

const LoginForm = () => {
    const [login, setLogin, loginValid, loginEmpty] = useInputValue('', validLogin);
    const [pass, setPass, passValid, passEmpty] = useInputValue('', validPassword);
    const [valid, setValid] = useState(false);
    const [authPass, { isLoading, isError, isFetching, data: authData }] = useLazyAuthPassQuery();
    const {setAuth} = useActions();

    useEffect(() => {
        setValid(loginValid && passValid && !loginEmpty && !passEmpty);
    }, [loginValid, passValid]);

    useEffect(() => {
        if (authData) {
            setAuth({ login: authData.login, sessionKey: authData.sessionKey });
        }
    }, [authData])

    return (
        <div className={css.container}>
            <MedTitle>Вход</MedTitle>
            <Input
                value={login}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setLogin(e.target.value)}
                valid={loginValid}
                empty={loginEmpty}
                placeholder={"Логин"}
            />
            <Input
                value={pass}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPass(e.target.value)}
                valid={passValid}
                empty={passEmpty}
                placeholder={"Пароль"}
            />
            <SmallDottedSeparator/>
            <BigButton
                active={valid}
                always={valid}
                onClick={() => !isFetching && authPass(login + ':' + pass)}
            >Вход</BigButton>
        </div>
    );
};

export default LoginForm;