"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchComponentsList = void 0;
const searchTypes_1 = require("../../../../../../../../enums/searchTypes");
const SearchUserComponent_1 = __importDefault(require("./SearchUsersComponent/SearchUserComponent"));
const SearchMusicComponent_1 = __importDefault(require("./SearchMusicComponent/SearchMusicComponent"));
exports.searchComponentsList = {
    [searchTypes_1.SearchType.ALL]: [
        {
            name: 'users',
            Component: SearchUserComponent_1.default
        },
        {
            name: 'music',
            Component: SearchMusicComponent_1.default
        }
    ],
    [searchTypes_1.SearchType.USERS]: [
        {
            name: 'users',
            Component: SearchUserComponent_1.default
        },
    ],
    [searchTypes_1.SearchType.MUSIC]: [
        {
            name: 'music',
            Component: SearchMusicComponent_1.default
        }
    ]
};
