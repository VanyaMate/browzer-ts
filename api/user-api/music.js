"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const music = express_1.default.Router();
music.post('/add', (req, res) => {
});
music.post('/remove', (req, res) => {
});
exports.default = music;
