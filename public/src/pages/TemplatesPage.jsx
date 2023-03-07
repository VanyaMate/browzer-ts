"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
