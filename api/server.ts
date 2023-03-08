import express, {Request, Response} from 'express';

const server = express.Router();

server.get('/check', (req: Request, res: Response) => {
    res.status(200).send(true);
})

export default server;