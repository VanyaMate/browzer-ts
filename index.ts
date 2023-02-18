import express, {Express} from 'express';
import cors from 'cors';
import router from './router';
import admin from 'firebase-admin';
const perm = require('./perm-json.json');

const port: number = 3000;
const app: Express = express();

admin.initializeApp({
    credential: admin.credential.cert(perm),
    databaseURL: "https://vm-browzer.firebaseio.app"
});

export const db = admin.firestore();

app.use(cors());
app.use(express.json());
app.use('/', express.static(__dirname + '/public'));
app.use('/api/doc', express.static(__dirname + '/api/doc'));
app.use('/api', router);

app.listen(port, () => console.log(`server start on ${ port }`));