"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_client_1 = __importDefault(require("socket.io-client"));
const sockets_1 = require("../../enums/sockets");
class SocketClientManager {
    constructor(url) {
        this._timer = undefined;
        this._reconnectTimer = undefined;
        this._auth = ['', ''];
        this._handlers = [];
        this._pingTimeout = 5000;
        this._reconnectTimeout = 5000;
        this._url = url;
        this._socket = (0, socket_io_client_1.default)(this._url, {});
        this._pongHandler = this._pongHandler.bind(this);
        this._authHandler = this._authHandler.bind(this);
        this._disconnectHandler = this._disconnectHandler.bind(this);
        this._serverErrorDisconnect = this._serverErrorDisconnect.bind(this);
        this._socket.on(sockets_1.SocketMessageType.PONG, this._pongHandler);
        this._socket.on(sockets_1.SocketMessageType.AUTH, this._authHandler);
        this._socket.on(sockets_1.SocketMessageType.DISCONNECT, this._disconnectHandler);
        this._socket.on('disconnect', this._serverErrorDisconnect);
    }
    auth(auth) {
        this._socket.emit(sockets_1.SocketMessageType.AUTH, auth);
        this._auth = auth;
    }
    disconnect(auth) {
        this._resetTimer();
        this._socket.emit(sockets_1.SocketMessageType.DISCONNECT, auth);
    }
    addHandlerOnSocket(handlerType, handler) {
        this._handlers.push([handlerType, handler]);
        this._socket.on(handlerType, handler);
    }
    resetHandlersFromSocket() {
        this._handlers.forEach(([handlerType, handler]) => {
            this._socket.removeListener(handlerType, handler);
        });
    }
    _ping(login) {
        console.log('_ping: ', login);
        this._socket.emit(sockets_1.SocketMessageType.PING, login);
    }
    _resetTimer() {
        console.log('_resetTimer');
        clearInterval(this._timer);
    }
    _pongHandler(data) {
        console.log('_pongHandler: ', data);
    }
    _authHandler(status) {
        console.log('_authHandler: ', status);
        if (status) {
            clearTimeout(this._reconnectTimer);
            this._timer = setInterval(() => this._ping(this._auth[0]), this._pingTimeout);
        }
        else {
            this._auth = ['', ''];
        }
    }
    _disconnectHandler(status) {
        console.log('_disconnectHandler: ', status);
        if (status) {
            this._onDisconnect();
        }
    }
    _serverErrorDisconnect() {
        console.log('_serverErrorDisconnect: ', this._auth);
        if (this._auth[0] !== '') {
            this._onDisconnect();
            setTimeout(() => {
                this._socket.connect();
                this.auth(this._auth);
                this._reconnectTimer = setTimeout(() => this._serverErrorDisconnect(), this._reconnectTimeout);
            }, 0);
        }
    }
    _onDisconnect() {
        console.log('_onDisconnect: ', this._auth);
        this._resetTimer();
    }
}
exports.default = SocketClientManager;
