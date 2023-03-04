import React, {ChangeEvent, useEffect, useState} from 'react';
import Button from "../components/UI/Buttons/Button/Button";
import {useLazyAuthPassQuery} from "../store/auth/auth.api";
import Input from "../components/UI/Inputs/Input/Input";
import {validLogin, validPassword} from "../../../utils/validationMethods";
import {useInputValue} from "../hooks/useInputValue";
import {authActions} from "../store/auth/auth.slice";
/*

const TemplatesPage = () => {
    const [dispatchAuthPass, { isLoading, isError, data: authResponse }] = useLazyAuthPassQuery();
    const [ login, setLogin, loginValid, loginEmpty ] = useInputValue('', validLogin);
    const [ pass, setPass, passValid, passEmpty ] = useInputValue('', validPassword);

    useEffect(() => {
        if (!isError) {
            authActions.setAuth(authResponse!);
        }
    }, [authResponse])

    return (
        <div>
            {
                isLoading && <h1>Загрузка</h1>
            }
            {
                isError && <h1>Ошибка загрузки</h1>
            }
            {
                authResponse && <pre>{authResponse.login}</pre>
            }

            <Input
                placeholder={'Логин'}
                value={login}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setLogin(e.target.value)}
                valid={loginValid}
                empty={loginEmpty}
            />
            <Input
                placeholder={'Пароль'}
                value={pass}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPass(e.target.value)}
                valid={passValid}
                empty={passEmpty}
            />
            <Button
                active
                onClick={() => {
                    console.log('dispatch');
                    dispatchAuthPass(login + ':' + pass);
                }}
            >Вход</Button>

            <div>
                <Button active>Привет</Button>
                <Button active>Привет</Button>
                <Button>Привет</Button>
                <Button>Привет</Button>
            </div>
        </div>
    );
};

export default TemplatesPage;*/
