import express, {Request, Response} from "express";
import {validateRequestWithAccess} from "../utils/validateRequestMethods";
import {AuthType} from "../databaseMethods/auth";
import {db} from "../../index";
import {createContainerData, getContainer, removeContainerFrom, reorder} from "../methods/block";
import {updateUserData} from "../databaseMethods/user";
import {ResponseError} from "../../enums/responses";
import {ComponentType} from "../../enums/blocks";

const block = express.Router();

block.post('/add', (req: Request, res: Response) => {
    validateRequestWithAccess<{blockIndex: number, name: string, type: ComponentType}>(req, res, db, AuthType.SESSION_KEY)
        .then(({ userData, body }) => {
            const block = userData.blocks[body.blockIndex];
            if (block) {
                const component = createContainerData(body.name, body.type);
                block.components.push(component);
                updateUserData(db, userData)
                    .then(() => res.status(200).send({ error: false, component }))
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
                block.components = removeContainerFrom(block.components, body.id)
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
                const container = getContainer(block.components, body.id);

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
                block.components = reorder(block.components, body.id, body.order);
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
                const conversation = getContainer(block.components, body.id);
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