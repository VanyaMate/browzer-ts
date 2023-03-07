"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateRequestMethods_1 = require("../utils/validateRequestMethods");
const auth_1 = require("../databaseMethods/auth");
const index_1 = require("../../index");
const block_1 = require("../methods/block");
const user_1 = require("../databaseMethods/user");
const responses_1 = require("../../enums/responses");
const block = express_1.default.Router();
block.post('/add', (req, res) => {
    (0, validateRequestMethods_1.validateRequestWithAccess)(req, res, index_1.db, auth_1.AuthType.SESSION_KEY)
        .then(({ userData, body }) => {
        const block = userData.blocks[body.blockIndex];
        if (block) {
            const component = (0, block_1.createContainerData)(body.name, body.type);
            block.components.push(component);
            (0, user_1.updateUserData)(index_1.db, userData)
                .then(() => res.status(200).send({ error: false, component }))
                .catch(() => res.status(200).send({ error: true, message: responses_1.ResponseError.SERVER_ERROR }));
        }
        else {
            throw new Error();
        }
    })
        .catch(() => res.status(200).send({ error: true, message: responses_1.ResponseError.NO_VALID_DATA }));
});
block.post('/delete', (req, res) => {
    (0, validateRequestMethods_1.validateRequestWithAccess)(req, res, index_1.db, auth_1.AuthType.SESSION_KEY)
        .then(({ userData, body }) => {
        const block = userData.blocks[body.blockIndex];
        if (block) {
            block.components = (0, block_1.removeContainerFrom)(block.components, body.id);
            (0, user_1.updateUserData)(index_1.db, userData)
                .then(() => res.status(200).send({ error: false, success: true }))
                .catch(() => res.status(200).send({ error: true, message: responses_1.ResponseError.SERVER_ERROR }));
        }
        else {
            throw new Error();
        }
    })
        .catch(() => res.status(200).send({ error: true, message: responses_1.ResponseError.NO_VALID_DATA }));
});
block.post('/rename', (req, res) => {
    (0, validateRequestMethods_1.validateRequestWithAccess)(req, res, index_1.db, auth_1.AuthType.SESSION_KEY)
        .then(({ userData, body }) => {
        const block = userData.blocks[body.blockIndex];
        if (block) {
            const container = (0, block_1.getContainer)(block.components, body.id);
            if (container) {
                container.name = body.name;
                (0, user_1.updateUserData)(index_1.db, userData)
                    .then(() => res.status(200).send({ error: false, success: true }))
                    .catch(() => res.status(200).send({ error: true, message: responses_1.ResponseError.SERVER_ERROR }));
                return;
            }
        }
        throw new Error();
    })
        .catch(() => res.status(200).send({ error: true, message: responses_1.ResponseError.NO_VALID_DATA }));
});
block.post('/reorder', (req, res) => {
    (0, validateRequestMethods_1.validateRequestWithAccess)(req, res, index_1.db, auth_1.AuthType.SESSION_KEY)
        .then(({ userData, body }) => {
        const block = userData.blocks[body.blockIndex];
        if (block) {
            block.components = (0, block_1.reorder)(block.components, body.id, body.order);
            (0, user_1.updateUserData)(index_1.db, userData)
                .then(() => res.status(200).send({ error: false, success: true }))
                .catch(() => res.status(200).send({ error: true, message: responses_1.ResponseError.SERVER_ERROR }));
            return;
        }
        throw new Error();
    })
        .catch(() => res.status(200).send({ error: true, message: responses_1.ResponseError.NO_VALID_DATA }));
});
block.post('/activate', (req, res) => {
    (0, validateRequestMethods_1.validateRequestWithAccess)(req, res, index_1.db, auth_1.AuthType.SESSION_KEY)
        .then(({ userData, body }) => {
        const block = userData.blocks[body.blockIndex];
        if (block) {
            const conversation = (0, block_1.getContainer)(block.components, body.id);
            if (conversation) {
                block.active = body.id;
                (0, user_1.updateUserData)(index_1.db, userData)
                    .then(() => res.status(200).send({ error: false, success: true }))
                    .catch(() => res.status(200).send({ error: true, message: responses_1.ResponseError.SERVER_ERROR }));
                return;
            }
        }
        throw new Error();
    })
        .catch(() => res.status(200).send({ error: true, message: responses_1.ResponseError.NO_VALID_DATA }));
});
exports.default = block;
