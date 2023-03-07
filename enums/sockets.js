"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketMessageType = void 0;
var SocketMessageType;
(function (SocketMessageType) {
    SocketMessageType["AUTH"] = "AUTH";
    SocketMessageType["PING"] = "PING";
    SocketMessageType["PONG"] = "PONG";
    SocketMessageType["DISCONNECT"] = "DISCONNECT";
})(SocketMessageType = exports.SocketMessageType || (exports.SocketMessageType = {}));
