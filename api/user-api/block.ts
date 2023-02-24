import express, {Request, Response} from "express";
import {validateRequestWithAccess} from "../utils/validateRequestMethods";
import {AuthType} from "../databaseMethods/auth";
import {db} from "../../index";
import {createContainerData, getContainer, removeContainerFrom, reorder} from "../methods/block";
import {updateUserData} from "../databaseMethods/user";
import {ResponseError} from "../../enums/responses";

const block = express.Router();

block.post('/add', (req: Request, res: Response) => {
    validateRequestWithAccess<{blockIndex: number, name: string, link: string}>(req, res, db, AuthType.SESSION_KEY)
        .then(({ userData, body }) => {
            const block = userData.blocks[body.blockIndex];
            if (block) {
                block.containers.push(createContainerData(body.name, body.link));
                updateUserData(db, userData)
                    .then(() => res.status(200).send({ error: false, success: true }))
                    .catch(() => res.status(200).send({ error: true, message: ResponseError.SERVER_ERROR }))
            } else {
                throw new Error();
            }
        })
        .catch(() => res.status(200).send({ error: true, message: ResponseError.NO_VALID_DATA }))
})

block.post('/delete', (req: Request, res: Response) => {
    validateRequestWithAccess<{blockIndex: number, id: string}>(req, res, db, AuthType.SESSION_KEY)
        .then(({ userData, body }) => {
            const block = userData.blocks[body.blockIndex];
            if (block) {
                block.containers = removeContainerFrom(block.containers, body.id)
                updateUserData(db, userData)
                    .then(() => res.status(200).send({ error: false, success: true }))
                    .catch(() => res.status(200).send({ error: true, message: ResponseError.SERVER_ERROR }))
            } else {
                throw new Error();
            }
        })
        .catch(() => res.status(200).send({ error: true, message: ResponseError.NO_VALID_DATA }))
})

block.post('/rename', (req: Request, res: Response) => {
    validateRequestWithAccess<{blockIndex: number, id: string, name: string}>(req, res, db, AuthType.SESSION_KEY)
        .then(({ userData, body }) => {
            const block = userData.blocks[body.blockIndex];
            if (block) {
                const container = getContainer(block.containers, body.id);

                if (container) {
                    container.name = body.name;
                    updateUserData(db, userData)
                        .then(() => res.status(200).send({error: false, success: true}))
                        .catch(() => res.status(200).send({error: true, message: ResponseError.SERVER_ERROR}))
                    return;
                }
            }

            throw new Error();
        })
        .catch(() => res.status(200).send({ error: true, message: ResponseError.NO_VALID_DATA }))
})

block.post('/reorder', (req: Request, res: Response) => {
    validateRequestWithAccess<{blockIndex: number, id: string, order: number}>(req, res, db, AuthType.SESSION_KEY)
        .then(({ userData, body }) => {
            const block = userData.blocks[body.blockIndex];
            if (block) {
                block.containers = reorder(block.containers, body.id, body.order);
                updateUserData(db, userData)
                    .then(() => res.status(200).send({error: false, success: true}))
                    .catch(() => res.status(200).send({error: true, message: ResponseError.SERVER_ERROR}))
                return;
            }

            throw new Error();
        })
        .catch(() => res.status(200).send({ error: true, message: ResponseError.NO_VALID_DATA }))
})

block.post('/activate', (req: Request, res: Response) => {
    validateRequestWithAccess<{blockIndex: number, id: string}>(req, res, db, AuthType.SESSION_KEY)
        .then(({ userData, body }) => {
            const block = userData.blocks[body.blockIndex];
            if (block) {
                const conversation = getContainer(block.containers, body.id);
                if (conversation) {
                    block.active = body.id;

                    updateUserData(db, userData)
                        .then(() => res.status(200).send({error: false, success: true}))
                        .catch(() => res.status(200).send({error: true, message: ResponseError.SERVER_ERROR}))
                    return;
                }
            }
            throw new Error();
        })
        .catch(() => res.status(200).send({ error: true, message: ResponseError.NO_VALID_DATA }))
})

export default block;