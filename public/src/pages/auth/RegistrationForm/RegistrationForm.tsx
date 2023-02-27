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
    const [login, setLogin, loginValid, loginEmpty] = useInputValue('', validLogin);
    const [pass, setPass, passValid, passEmpty] = useInputValue('', validPassword);
    const [samePass, setSamePass, samePassValid, samePassEmpty] = useInputValue('', (samePass: string) => {
        return pass === samePass && validPassword(samePass);
    });
    const [firstName, setFirstName, firstNameValid, firstNameEmpty] = useInputValue('', validName);
    const [lastName, setLastName, lastNameValid, lastNameEmpty] = useInputValue('', validName);
    const [dispatchRegistration, {isFetching, isError, data: registrationData }] = useLazyCreateUserQuery();
    const [valid, setValid] = useState(false);
    const {
        setFriends, setConversations, setNotifications, setAuth,
        resetAuth
    } = useActions();

    useEffect(() => {
        setValid(
            loginValid && !loginEmpty &&
            passValid && !passEmpty &&
            samePassValid && !samePassEmpty
        );
    }, [loginValid, passValid, samePassValid]);

    useEffect(() => {
        if (registrationData) {
            console.log('registrationData', registrationData);
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
                login,
                password: pass,
                personalInfo: {
                    firstName: {
                        value: firstName,
                        hidden: false
                    },
                    lastName: {
                        value: lastName,
                        hidden: false
                    }
                }
            });
        }
    }

    return (
        <div className={css.container}>
            <MedTitle>Регистрация</MedTitle>
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
            <Input
                value={samePass}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSamePass(e.target.value)}
                valid={samePassValid}
                empty={samePassEmpty}
                placeholder={"Повторный пароль"}
            />
            <SmallDottedSeparator/>
            <Input
                value={firstName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
                valid={firstNameValid}
                empty={firstNameEmpty}
                placeholder={"Имя"}
            />
            <Input
                value={lastName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
                valid={lastNameValid}
                empty={lastNameEmpty}
                placeholder={"Фамилия"}
            />
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