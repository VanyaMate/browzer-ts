"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const photo = express_1.default.Router();
photo.post('/add', (req, res) => {
});
photo.post('/remove', (req, res) => {
});
exports.default = photo;
