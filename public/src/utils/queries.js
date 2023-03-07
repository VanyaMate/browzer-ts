"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchApi = void 0;
const consts_1 = require("../common/consts");
const fetchApi = function (props) {
    return fetch(`${consts_1.serverUrl}/api/${props.url}`, {
        method: 'POST',
        headers: {
            auth: props.auth || '',
            "Content-Type": "application/json",
        },
        body: JSON.stringify(props.body || {})
    }).then((res) => res.json());
};
exports.fetchApi = fetchApi;
