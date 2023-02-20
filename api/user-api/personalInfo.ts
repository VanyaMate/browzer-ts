import express, {Request, Response} from "express";
import {changeItem} from "../databaseMethods/personalInfo";
import {validEmail, validName} from "../../utils/validationMethods";
import {db} from '../../index';

const personalInfo = express.Router();

personalInfo.post('/firstName', (req: Request, res: Response) => {
    changeItem(req, res, db, 'firstName', validName);
})

personalInfo.post('/lastName', (req: Request, res: Response) => {
    changeItem(req, res, db, 'lastName', validName);
})

personalInfo.post('/email', (req: Request, res: Response) => {
    changeItem(req, res, db, 'email', validEmail);
})

personalInfo.post('/telephone', (req: Request, res: Response) => {
    // TODO: Заменить на нормальный валидатор
    changeItem(req, res, db, 'telephone', (_: string) => true);
})

export default personalInfo;