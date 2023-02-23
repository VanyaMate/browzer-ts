import io, {Socket} from "socket.io-client";
import {SocketMessageType} from "../../enums/sockets";
import {NotificationType} from "../../enums/notifications";

export default class SocketManager {
    private _socket: Socket;
    private _timer: NodeJS.Timer | undefined = undefined;
    private _auth: [string, string] = ['', ''];
    private _url: string;

    constructor(url: string) {
        this._url = url;
        this._socket = io(this._url, {});

        this._socket.on(SocketMessageType.PONG, (data) => {
            console.log('PONG', data);
        })

        this._socket.on(SocketMessageType.AUTH, (status) => {
            console.log('AUTH', status);
            if (status) {
                this._timer = setInterval(() => this._ping(this._auth[0]), 1000);
            } else {
                this._auth = ['', ''];
            }
        })

        this._socket.on(SocketMessageType.DISCONNECT, (status) => {
            console.log('DISCONNECT', status);
            if (status) {
                this._resetTimer();
            }
        })

        this._socket.on('disconnect', () => {
            console.log('SOCKET.IO DISCONNECTED');
            if (this._auth[0] !== '') {
                console.log('RECONNECT');
                this._socket.connect();
                this.auth(this._auth);
            }
        });

        this._socket.on(NotificationType.FRIEND_IN_REQUEST, (data) => {
            console.log('FRIEND_IN_REQUEST', data);
        })
    }

    public auth (auth: [string, string]) {
        this._socket.emit(SocketMessageType.AUTH, auth);
        this._auth = auth;
    }

    public disconnect (auth: [string, string]) {
        this._socket.emit(SocketMessageType.DISCONNECT, auth);
    }

    private _ping (login: string) {
        this._socket.emit(SocketMessageType.PING, login)
    }

    private _resetTimer () {
        clearInterval(this._timer);
    }
}