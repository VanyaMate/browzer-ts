import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import SocketClientManager from "./SocketClientManager";
import {Provider} from "react-redux";
import {store} from "./store/index";
import {serverUrl} from "./common/consts";


export const socketClientManager = new SocketClientManager(serverUrl);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
)
