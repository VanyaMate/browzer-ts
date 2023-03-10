import React, {ChangeEvent, memo, useEffect, useState} from 'react';
import css from './LoginForm.module.scss';
import MedTitle from "../../../components/UI/Titles/MedTitle/MedTitle";
import {IUserInputValue, useInputValue} from "../../../hooks/useInputValue";
import {validLogin, validPassword} from "../../../../../utils/validationMethods";
import Input from "../../../components/UI/Inputs/Input/Input";
import BigButton from "../../../components/UI/Buttons/BigButton/BigButton";
import {useLazyAuthPassQuery} from "../../../store/auth/auth.api";
import SmallDottedSeparator from "../../../components/UI/Separators/SmallDottedSeparator";
import {useActions} from "../../../hooks/redux";
import {useLogIn, useLogOut} from "../../../hooks/authHooks";
import DropdownAbsolute from "../../../components/UI/Dropdowns/DropdownAbsolute";

const LoginForm = memo(() => {
    const login: IUserInputValue = useInputValue('', validLogin);
    const pass: IUserInputValue = useInputValue('', validPassword);
    const [valid, setValid] = useState(false);
    const [authPass, { isLoading, isError, isFetching, data: userData }] = useLazyAuthPassQuery();
    const logIn = useLogIn();
    const logOut = useLogOut();

    useEffect(() => {
        setValid(!!login.value && !!pass.value);
    }, [login.value, pass.value]);

    useEffect(() => {
        if (userData) {
            logIn(userData);
        } else if (userData === false) {
            logOut();
        }
    }, [userData])

    return (
        <div className={css.container}>
            <MedTitle>Вход</MedTitle>
            <Input hook={login} placeholder={"Логин"}/>
            <Input hook={pass} placeholder={"Пароль"} type={"password"}/>
            <SmallDottedSeparator/>
            <BigButton
                active={valid && !isFetching}
                always={valid}
                loading={isFetching}
                onClick={() => !isFetching && authPass(login.value + ':' + pass.value)}
            >Вход</BigButton>
            <DropdownAbsolute hide={userData ? !!userData : userData ?? true} className={[css.error]}>
                Ошибка вход
            </DropdownAbsolute>
        </div>
    );
});

export default LoginForm;