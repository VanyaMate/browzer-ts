import express from 'express';
import cors from 'cors';
import router from './router';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use('/', express.static(__dirname + '/public'));
app.use('/api/doc', express.static(__dirname + '/api/doc'));
app.use('/api', router);

app.listen(port, () => console.log('server start'));