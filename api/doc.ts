import express, {Request, Response} from "express";
import * as path from "path";

const doc = function (req: Request, res: Response) {
    res.status(200).sendFile(path.join(__dirname, '/doc/index.html'));
}

export default doc;