"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blocks_1 = require("../../../enums/blocks");
const ConversationComponent_1 = __importDefault(require("../components/browzer/components/contentComponents/ConversationComponent/ConversationComponent"));
const IFrameComponent_1 = __importDefault(require("../components/browzer/components/contentComponents/IFrameComponent/IFrameComponent"));
const MusicComponent_1 = __importDefault(require("../components/browzer/components/contentComponents/MusicComponent/MusicComponent"));
const ProfileComponent_1 = __importDefault(require("../components/browzer/components/contentComponents/ProfileComponent/ProfileComponent"));
const SettingsComponent_1 = __importDefault(require("../components/browzer/components/contentComponents/SettingsComponent/SettingsComponent"));
const BrowzerContentItemsList = {
    [blocks_1.ComponentType.CONVERSATIONS]: {
        defaultTitle: 'Сообщения',
        Component: ConversationComponent_1.default
    },
    [blocks_1.ComponentType.IFRAME]: {
        defaultTitle: 'IFrame',
        Component: IFrameComponent_1.default
    },
    [blocks_1.ComponentType.MUSIC]: {
        defaultTitle: 'Музыка',
        Component: MusicComponent_1.default
    },
    [blocks_1.ComponentType.PROFILE]: {
        defaultTitle: 'Профиль',
        Component: ProfileComponent_1.default
    },
    [blocks_1.ComponentType.SETTINGS]: {
        defaultTitle: 'Настройки',
        Component: SettingsComponent_1.default
    },
};
exports.default = BrowzerContentItemsList;
