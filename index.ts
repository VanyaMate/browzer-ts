import http from 'http';
import express, {Express} from 'express';
import cors from 'cors';
import router from './router';
import admin from 'firebase-admin';
import SocketManager from "./sockets";
const perm = require('./perm-json.json');

console.log(process.env.PORT);
console.log(process.env);

const port: number = +process.env.PORT! || 3000;
const app: Express = express();
const httpServer = http.createServer(app);

admin.initializeApp({
    credential: admin.credential.cert(perm),
    databaseURL: "https://vm-browzer.firebaseio.app"
});

export const db = admin.firestore();
export const socketManager = new SocketManager(httpServer, db);

app.use(cors());
app.use(express.json());
app.use('/', express.static(__dirname + '/public/build'));
app.use('/assets', express.static(__dirname + '/public/assets'))
app.use('/api/doc', express.static(__dirname + '/api/doc'));
app.use('/api', router);

httpServer.listen(port, () => console.log(`server start on ${ port }`));