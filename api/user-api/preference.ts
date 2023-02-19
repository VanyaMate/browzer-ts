import express, {Request, Response} from "express";
import {validateRequest} from "../utils/validateRequestMethods";
import {IValidRequestData} from "../../interfaces/request";

const preference = express.Router();

preference.post('/friends', (req: Request, res: Response) => {
    validateRequest(req, res)
        .then((data: IValidRequestData) => {
            if (data.auth) {

            }
        })
})

preference.post('/conversations', (req: Request, res: Response) => {

})

export default preference;