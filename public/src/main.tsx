import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import io from 'socket.io-client';
import SocketManager from "./sockets";

const login = 'ad3';
const sesionKey = '$2b$04$lviHJI6i12ADtMqnkvKuFO4WspMfBjXXY0r0JOutqVJbBxjaOtrlm';

const socketManager = new SocketManager('localhost:3000');
socketManager.auth([login, sesionKey]);

setTimeout(() => {
    socketManager.disconnect([login, sesionKey]);
}, 3000000)


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
