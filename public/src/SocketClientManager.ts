import io, {Socket} from "socket.io-client";
import {SocketMessageType} from "../../enums/sockets";
import {NotificationType} from "../../enums/notifications";
import {useActions} from "./hooks/redux";

export default class SocketClientManager {
    private _socket: Socket;
    private _timer: number = 0;
    private _reconnectTimer: number = 0;
    private _auth: [string, string] = ['', ''];
    private _url: string;
    private _handlers: ([handlerType: string, handler: (data: any) => void])[] = [];

    private _pingTimeout: number = 5000;
    private _reconnectTimeout: number = 5000;
    private _reAuth: boolean = false;

    constructor(url: string) {
        this._url = url;
        this._socket = io(this._url, {
            transports: ["websocket", "polling"],
            withCredentials: true
        });
        this._pongHandler = this._pongHandler.bind(this);
        this._authHandler = this._authHandler.bind(this);
        this._disconnectHandler = this._disconnectHandler.bind(this);
        this._serverErrorDisconnect = this._serverErrorDisconnect.bind(this);

        this._socket.on(SocketMessageType.PONG, this._pongHandler);
        this._socket.on(SocketMessageType.AUTH, this._authHandler);
        this._socket.on(SocketMessageType.DISCONNECT, this._disconnectHandler)
        this._socket.on('disconnect', this._serverErrorDisconnect);
    }

    public auth (auth: [string, string]) {
        this._socket.emit(SocketMessageType.AUTH, auth);
        this._auth = auth;
    }

    public disconnect (auth: [string, string]) {
        this._resetTimer();
        this._socket.emit(SocketMessageType.DISCONNECT, auth);
    }

    public addHandlerOnSocket (handlerType: NotificationType, handler: (socket: Socket) => void) {
        this._handlers.push([handlerType, handler]);
        this._socket.on(handlerType, handler);
    }

    public resetHandlersFromSocket () {
        this._handlers.forEach(([handlerType, handler]) => {
            this._socket.removeListener(handlerType, handler);
        })
    }

    private _ping (login: string) {
        console.log('_ping: ', login);
        this._socket.emit(SocketMessageType.PING, login)
    }

    private _resetTimer () {
        console.log('_resetTimer');
        clearInterval(this._timer);
        clearTimeout(this._reconnectTimer);
    }

    private _pongHandler (data: any): void {
        console.log('_pongHandler: ', data);
    }

    private _authHandler (status: boolean): void {
        console.log('_authHandler: ', status);
        if (status) {
            clearTimeout(this._reconnectTimer);
            this._timer = window.setInterval(() => this._ping(this._auth[0]), this._pingTimeout);
        } else {
            this._auth = ['', ''];
        }
    }

    private _disconnectHandler (status: boolean): void {
        console.log('_disconnectHandler: ', status);
        if (status) {
            this._onDisconnect();
        }
    }

    private _serverErrorDisconnect () {
        console.log('_serverErrorDisconnect: ', this._auth);
        if (this._auth[0] !== '' && !this._reAuth) {
            this._onDisconnect();
            this._reAuth = true;

            setTimeout(() => {
                this._socket.connect();
                this.auth(this._auth);
                this._reconnectTimer = window.setTimeout(() => {
                    this._reAuth = false;
                    this._serverErrorDisconnect();
                }, this._reconnectTimeout);
            }, 0);
        }
    }

    private _onDisconnect () {
        console.log('_onDisconnect: ', this._auth);
        this._resetTimer();
    }
}