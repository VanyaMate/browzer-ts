import {ComponentType} from "../../../enums/blocks";
import ConversationComponent from "../components/browzer/components/ConversationComponent/ConversationComponent";
import {JSXElementConstructor} from "react";
import IFrameComponent from "../components/browzer/components/IFrameComponent/IFrameComponent";
import MusicComponent from "../components/browzer/components/MusicComponent/MusicComponent";
import ProfileComponent from "../components/browzer/components/ProfileComponent/ProfileComponent";
import SettingsComponent from "../components/browzer/components/SettingsComponent/SettingsComponent";

type ComponentItemType = { [type: string]: { defaultTitle: string, Component: JSXElementConstructor<any> } };

const BrowzerContentItemsList: ComponentItemType = {
    [ComponentType.CONVERSATIONS]: {
        defaultTitle: 'Сообщения',
        Component: ConversationComponent
    },
    [ComponentType.IFRAME]: {
        defaultTitle: 'IFrame',
        Component: IFrameComponent
    },
    [ComponentType.MUSIC]: {
        defaultTitle: 'Музыка',
        Component: MusicComponent
    },
    [ComponentType.PROFILE]: {
        defaultTitle: 'Профиль',
        Component: ProfileComponent
    },
    [ComponentType.SETTINGS]: {
        defaultTitle: 'Настройки',
        Component: SettingsComponent
    },

};

export default BrowzerContentItemsList;