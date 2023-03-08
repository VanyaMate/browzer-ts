import React, {useEffect, useMemo, useState} from 'react';
import css from './ServerConnectionStatus.module.scss';
import {useActions, useMySelector} from "../../../../../hooks/redux";
import {useServerCheckQuery} from "../../../../../store/serverConnection/serverConnection.api";

const ServerConnectionStatus = () => {
    const serverStatus = useMySelector(state => state.serverStatus);
    const { setServerStatus } = useActions();
    const { isError, isFetching } = useServerCheckQuery(null, { pollingInterval: 4000 });

    useEffect(() => {
        if (!isFetching && isError) {
            setTimeout(() => {
                setServerStatus({
                    opened: true,
                    error: true,
                    message: 'Попытка подключения к серверу'
                })
            }, 1000)
        } else if (isFetching) {
            setServerStatus({
                opened: true,
                error: false,
                message: 'Подключение к серверу..'
            })
        } else {
            setServerStatus({
                opened: false,
                error: false
            })
        }
    }, [isError, isFetching])

    return (
        <div className={[
            css.container,
            serverStatus.opened ? css.opened : '',
            serverStatus.warning ? css.warning : '',
            serverStatus.error ? css.error : '',
        ].join(' ')}>
            { serverStatus.message }
        </div>
    );
};

export default ServerConnectionStatus;