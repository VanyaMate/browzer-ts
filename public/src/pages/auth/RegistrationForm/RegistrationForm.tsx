import React, {ChangeEvent, useEffect, useState} from 'react';
import css from './RegistrationForm.module.scss';
import MedTitle from "../../../components/UI/Titles/MedTitle/MedTitle";
import {useInputValue} from "../../../hooks/useInputValue";
import {validEmail, validLogin, validName, validPassword} from "../../../../../utils/validationMethods";
import Input from "../../../components/UI/Inputs/Input";
import BigButton from "../../../components/UI/Buttons/BigButton/BigButton";
import SmallDottedSeparator from "../../../components/UI/Separators/SmallDottedSeparator";
import {useActions} from "../../../hooks/redux";
import {useLazyCreateUserQuery} from "../../../store/users/users.api";

const RegistrationForm = () => {
    const login = useInputValue('', validLogin);
    const pass = useInputValue('', validPassword);
    const samePass = useInputValue('', (samePass: string) => {
        return pass.value === samePass && validPassword(samePass);
    });
    const firstName = useInputValue('', validName);
    const lastName = useInputValue('', validName);
    const [dispatchRegistration, {isFetching, isError, data: registrationData }] = useLazyCreateUserQuery();
    const [valid, setValid] = useState(false);
    const {
        setFriends, setConversations, setNotifications, setAuth,
        resetAuth
    } = useActions();

    useEffect(() => {
        setValid(
            login.valid && !login.empty &&
            pass.valid && !pass.empty &&
            samePass.valid && !samePass.empty  &&
            firstName.valid && !firstName.empty  &&
            lastName.valid && !lastName.empty
        );
    }, [login.valid, pass.valid, samePass.valid, firstName.valid, lastName.valid]);

    useEffect(() => {
        if (registrationData) {
            setAuth({login: registrationData.login, sessionKey: registrationData.sessionKey});
            setFriends(registrationData);
            setNotifications(registrationData.notifications);
            setConversations(registrationData.conversations);
        } else if (registrationData === false) {
            resetAuth();
        }
    }, [registrationData])

    const registration = () => {
        if (!isFetching) {
            dispatchRegistration({
                login: login.value,
                password: pass.value,
                personalInfo: {
                    firstName: {
                        value: firstName.value,
                        hidden: false
                    },
                    lastName: {
                        value: lastName.value,
                        hidden: false
                    }
                }
            });
        }
    }

    return (
        <div className={css.container}>
            <MedTitle>Регистрация</MedTitle>
            <Input hook={login} placeholder={"Логин"}/>
            <Input hook={pass} placeholder={"Пароль"}/>
            <Input hook={samePass} placeholder={"Повторный пароль"}/>
            <SmallDottedSeparator/>
            <Input hook={firstName} placeholder={"Имя"}/>
            <Input hook={lastName} placeholder={"Фамилия"}/>
            <SmallDottedSeparator/>
            <BigButton
                active={valid}
                always={valid}
                onClick={registration}
            >Регистрация</BigButton>
        </div>
    );
};

export default RegistrationForm;