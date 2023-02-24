import {Server} from "http";
import socket, {Server as SocketServer, Socket} from "socket.io";
import {SocketMessageType} from "./enums/sockets";
import {AuthType, checkUserAccess} from "./api/databaseMethods/auth";
import {firestore} from "firebase-admin";
import Firestore = firestore.Firestore;

interface IConnection {
    timer: NodeJS.Timer,
    socket: Socket
}

type SocketConnection = {[ id: string ]: IConnection};

export default class SocketManager {
    public connections: { [ login: string ]: SocketConnection } = {};
    private _io: SocketServer;
    private _db: Firestore;

    private _previusUpdateTimer: number = Date.now();

    constructor(httpServer: Server, db: Firestore) {
        this._db = db;
        this._io = new socket.Server(httpServer, {
            cors: {
                origin: true,
                methods: ["GET", "POST"],
                allowedHeaders: ["user-data"]
            }
        });

        this._io.on('connection', (socket) => {
            socket.on(SocketMessageType.AUTH, async (auth) => {
                if (!auth || !auth[0] || !auth[1]) return;
                return await checkUserAccess(this._db, auth, AuthType.SESSION_KEY)
                    .then(() => {
                        this.addConnection(auth[0], socket);
                        socket.emit(SocketMessageType.AUTH, true);
                    })
                    .catch(() => {
                        socket.emit(SocketMessageType.AUTH, false);
                    })
            })

            socket.on(SocketMessageType.PING, (login) => {
                this.updateConnection(login, socket.id);
                socket.emit(SocketMessageType.PONG, true);
            })

            socket.on(SocketMessageType.DISCONNECT, (auth) => {
                checkUserAccess(this._db, auth, AuthType.SESSION_KEY)
                    .then(() => {
                        socket.emit(SocketMessageType.DISCONNECT, true);
                        this.removeConnection(auth[0], socket.id);
                    })
                    .catch(() => {
                        socket.emit(SocketMessageType.DISCONNECT, false);
                    })
            })
        });
    }

    public addConnection (login: string, socket: Socket) {
        const connection = this.connections[login];
        if (connection) {
            connection[socket.id] = {
                socket,
                timer: this._removeConnectionTimer(login, socket.id, 50000),
            }
        } else {
            this.connections[login] = {
                [socket.id]: {
                    socket,
                    timer: this._removeConnectionTimer(login, socket.id, 50000),
                }
            }
        }
    }

    public updateConnection (login: string, id: string) {
        if (this.connections[login] && this.connections[login][id]) {
            clearTimeout(this.connections[login][id].timer);
            setTimeout(() => {
                this.connections[login][id].timer = this._removeConnectionTimer(login, id, 50000);
            }, 0);
            return true;
        }
        return false;
    }

    public removeConnection (login: string, id: string) {
        if (this.connections[login] && this.connections[login][id]) {
            this.connections[login][id].socket.disconnect();
            clearTimeout(this.connections[login][id].timer);
            delete this.connections[login][id];
            if (Object.keys(this.connections[login]).length === 0) {
                delete this.connections[login];
            }
        }
    }

    public closeConnection (login: string) {
        if (!this.connections[login]) return;

        for (const id in this.connections[login]) {
            this.connections[login][id].socket.disconnect();
            clearTimeout(this.connections[login][id].timer);
        }

        delete this.connections[login];
    }

    private _removeConnectionTimer (login: string, id: string, delay: number): NodeJS.Timer {
        return setTimeout(() => this.removeConnection(login, id), delay);
    }
}