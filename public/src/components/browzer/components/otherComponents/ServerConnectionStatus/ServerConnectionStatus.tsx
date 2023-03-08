import React, {memo, useEffect, useMemo, useState} from 'react';
import css from './ServerConnectionStatus.module.scss';
import {useActions, useMySelector} from "../../../../../hooks/redux";
import {useServerCheckQuery} from "../../../../../store/serverConnection/serverConnection.api";

const ServerConnectionStatus = memo(() => {
    const serverStatus = useMySelector(state => state.serverStatus);
    const { setServerStatus } = useActions();
    const { isError, isFetching, data: checkResponse } = useServerCheckQuery(null, { pollingInterval: 4000 });
    const [timer, setTimer] = useState<number>(0);

    useEffect(() => {
        console.log(checkResponse);
        if (!isFetching && !isError) {
            setServerStatus({
                message: 'Успешное подключение'
            })

            clearTimeout(timer);
            setTimer(window.setTimeout(() => setServerStatus({ opened: false })));
        } else if (!isFetching && isError) {
            clearTimeout(timer);
            setTimer(window.setTimeout(() => setServerStatus({
                opened: true,
                message: 'Ошибка подключения. Переподключение..',
                error: true,
            }), 500));
        } else if (isFetching) {
            setServerStatus({
                message: 'Подключение..'
            })

            setTimer(window.setTimeout(() => setServerStatus({ opened: true })));
        }
    }, [isFetching])

    return (
        <div className={[
            css.container,
            serverStatus.opened ? css.opened : '',
            serverStatus.fetching ? css.fetching : '',
            serverStatus.warning ? css.warning : '',
            serverStatus.error ? css.error : '',
        ].join(' ')}>
            { serverStatus.message }
        </div>
    );
});

export default ServerConnectionStatus;