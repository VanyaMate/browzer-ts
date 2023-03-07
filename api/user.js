"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const security_1 = __importDefault(require("./user-api/security"));
const personalInfo_1 = __importDefault(require("./user-api/personalInfo"));
const preference_1 = __importDefault(require("./user-api/preference"));
const photo_1 = __importDefault(require("./user-api/photo"));
const music_1 = __importDefault(require("./user-api/music"));
const notification_1 = __importDefault(require("./user-api/notification"));
const block_1 = __importDefault(require("./user-api/block"));
const user = express_1.default.Router();
user.use('/security', security_1.default);
user.use('/personalInfo', personalInfo_1.default);
user.use('/preference', preference_1.default);
user.use('/photo', photo_1.default);
user.use('/MusicComponent', music_1.default);
user.use('/notification', notification_1.default);
user.use('/block', block_1.default);
//
exports.default = user;
