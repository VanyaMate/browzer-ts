import React, {ChangeEvent, useEffect, useState} from 'react';
import css from './RegistrationForm.module.scss';
import MedTitle from "../../../components/UI/Titles/MedTitle/MedTitle";
import {useInputValue} from "../../../hooks/useInputValue";
import {validEmail, validLogin, validName, validPassword} from "../../../../../utils/validationMethods";
import Input from "../../../components/UI/Inputs/Input";
import BigButton from "../../../components/UI/Buttons/BigButton/BigButton";
import SmallDottedSeparator from "../../../components/UI/Separators/SmallDottedSeparator";

const RegistrationForm = () => {
    const [login, setLogin, loginValid, loginEmpty] = useInputValue('', validLogin);
    const [pass, setPass, passValid, passEmpty] = useInputValue('', validPassword);
    const [samePass, setSamePass, samePassValid, samePassEmpty] = useInputValue('', (samePass: string) => {
        return pass === samePass && validPassword(samePass);
    });
    const [valid, setValid] = useState(false);

    useEffect(() => {
        setValid(
            loginValid && !loginEmpty &&
            passValid && !passEmpty &&
            samePassValid && !samePassEmpty
        );
    }, [loginValid, passValid, samePassValid]);

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
            <BigButton
                active={valid}
                always={valid}
            >Регистрация</BigButton>
        </div>
    );
};

export default RegistrationForm;