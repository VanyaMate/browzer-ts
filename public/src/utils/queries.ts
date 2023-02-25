import {serverUrl} from "../common/consts";

export interface IFetchProps {
    url: string,
    auth?: string,
    body?: any
}

export const fetchApi = function (props: IFetchProps) {
    return fetch(`${serverUrl}/api/${props.url}`, {
        method: 'POST',
        headers: {
            auth: props.auth || '',
            "Content-Type": "application/json",
        },
        body: JSON.stringify(props.body || {})
    }).then((res) => res.json());
}