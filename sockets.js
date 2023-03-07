"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = __importDefault(require("socket.io"));
const sockets_1 = require("./enums/sockets");
const auth_1 = require("./api/databaseMethods/auth");
class SocketManager {
    constructor(httpServer, db) {
        this.connections = {};
        this._previusUpdateTimer = Date.now();
        this._db = db;
        this._io = new socket_io_1.default.Server(httpServer, {
            cors: {
                origin: true,
                methods: ["GET", "POST"],
                allowedHeaders: ["user-data"]
            }
        });
        this._io.on('connection', (socket) => {
            socket.on(sockets_1.SocketMessageType.AUTH, (auth) => __awaiter(this, void 0, void 0, function* () {
                if (!auth || !auth[0] || !auth[1])
                    return;
                return yield (0, auth_1.checkUserAccess)(this._db, auth, auth_1.AuthType.SESSION_KEY)
                    .then(() => {
                    this.addConnection(auth[0], socket);
                    socket.emit(sockets_1.SocketMessageType.AUTH, true);
                })
                    .catch(() => {
                    socket.emit(sockets_1.SocketMessageType.AUTH, false);
                });
            }));
            socket.on(sockets_1.SocketMessageType.PING, (login) => {
                this.updateConnection(login, socket.id);
                socket.emit(sockets_1.SocketMessageType.PONG, true);
            });
            socket.on(sockets_1.SocketMessageType.DISCONNECT, (auth) => {
                (0, auth_1.checkUserAccess)(this._db, auth, auth_1.AuthType.SESSION_KEY)
                    .then(() => {
                    socket.emit(sockets_1.SocketMessageType.DISCONNECT, true);
                    this.removeConnection(auth[0], socket.id);
                })
                    .catch(() => {
                    socket.emit(sockets_1.SocketMessageType.DISCONNECT, false);
                });
            });
        });
    }
    addConnection(login, socket) {
        const connection = this.connections[login];
        if (connection) {
            connection[socket.id] = {
                socket,
                timer: this._removeConnectionTimer(login, socket.id, 50000),
            };
        }
        else {
            this.connections[login] = {
                [socket.id]: {
                    socket,
                    timer: this._removeConnectionTimer(login, socket.id, 50000),
                }
            };
        }
    }
    updateConnection(login, id) {
        if (this.connections[login] && this.connections[login][id]) {
            clearTimeout(this.connections[login][id].timer);
            setTimeout(() => {
                if (this.connections[login] && this.connections[login][id]) {
                    this.connections[login][id].timer = this._removeConnectionTimer(login, id, 50000);
                }
            }, 0);
            return true;
        }
        return false;
    }
    removeConnection(login, id) {
        if (this.connections[login] && this.connections[login][id]) {
            this.connections[login][id].socket.disconnect();
            clearTimeout(this.connections[login][id].timer);
            delete this.connections[login][id];
            if (Object.keys(this.connections[login]).length === 0) {
                delete this.connections[login];
            }
        }
    }
    closeConnection(login) {
        if (!this.connections[login])
            return;
        for (const id in this.connections[login]) {
            this.connections[login][id].socket.disconnect();
            clearTimeout(this.connections[login][id].timer);
        }
        delete this.connections[login];
    }
    sendMessage(connection, message) {
        for (let key in connection) {
            connection[key].socket.emit(message.type, message.data);
        }
    }
    _removeConnectionTimer(login, id, delay) {
        return setTimeout(() => this.removeConnection(login, id), delay);
    }
}
exports.default = SocketManager;
