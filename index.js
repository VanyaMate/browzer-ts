"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketManager = exports.db = void 0;
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./router"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const sockets_1 = __importDefault(require("./sockets"));
const perm = require('./perm-json.json');
const port = 3000;
const app = (0, express_1.default)();
const httpServer = http_1.default.createServer(app);
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(perm),
    databaseURL: "https://vm-browzer.firebaseio.app"
});
exports.db = firebase_admin_1.default.firestore();
exports.socketManager = new sockets_1.default(httpServer, exports.db);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/', express_1.default.static(__dirname + '/public/build'));
app.use('/assets', express_1.default.static(__dirname + '/public/assets'));
app.use('/api/doc', express_1.default.static(__dirname + '/api/doc'));
app.use('/api', router_1.default);
httpServer.listen(port, () => console.log(`server start on ${port}`));
