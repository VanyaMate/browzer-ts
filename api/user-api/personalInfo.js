"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const personalInfo_1 = require("../databaseMethods/personalInfo");
const validationMethods_1 = require("../../utils/validationMethods");
const index_1 = require("../../index");
const personalInfo = express_1.default.Router();
personalInfo.post('/firstName', (req, res) => {
    (0, personalInfo_1.changeItem)(req, res, index_1.db, 'firstName', validationMethods_1.validName);
});
personalInfo.post('/lastName', (req, res) => {
    (0, personalInfo_1.changeItem)(req, res, index_1.db, 'lastName', validationMethods_1.validName);
});
personalInfo.post('/email', (req, res) => {
    (0, personalInfo_1.changeItem)(req, res, index_1.db, 'email', validationMethods_1.validEmail);
});
personalInfo.post('/telephone', (req, res) => {
    // TODO: Заменить на нормальный валидатор
    (0, personalInfo_1.changeItem)(req, res, index_1.db, 'telephone', (_) => true);
});
exports.default = personalInfo;
