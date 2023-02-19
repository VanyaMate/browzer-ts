import express, {Request, Response} from "express";

const security = express.Router();

security.post('/changePass', (req: Request, res: Response) => {

})

security.post('/resetSessionId', (req: Request, res: Response) => {

})

export default security;