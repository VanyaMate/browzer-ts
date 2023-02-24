import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import SocketClientManager from "./SocketClientManager";

const login = 'ad3';
const sesionKey = '$2b$04$lviHJI6i12ADtMqnkvKuFO4WspMfBjXXY0r0JOutqVJbBxjaOtrlm';

const socketClientManager = new SocketClientManager('localhost:3000');
socketClientManager.auth([login, sesionKey]);

// @ts-ignore
window.socketManager = socketClientManager;


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
