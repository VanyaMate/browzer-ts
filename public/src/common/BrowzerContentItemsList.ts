import {ComponentType} from "../../../enums/blocks";
import Conversations from "../components/browzer/components/conversations/Conversations";
import {JSXElementConstructor} from "react";

type ComponentItemType = { [type: string]: { defaultTitle: string, Component: JSXElementConstructor<any> } };

const BrowzerContentItemsList: ComponentItemType = {
    [ComponentType.CONVERSATIONS]: {
        defaultTitle: 'Сообщения',
        Component: Conversations
    },
    [ComponentType.IFRAME]: {
        defaultTitle: 'IFrame',
        Component: Conversations
    },
    [ComponentType.MUSIC]: {
        defaultTitle: 'Музыка',
        Component: Conversations
    },
    [ComponentType.PROFILE]: {
        defaultTitle: 'Профиль',
        Component: Conversations
    },
    [ComponentType.SETTINGS]: {
        defaultTitle: 'Настройки',
        Component: Conversations
    },

};

export default BrowzerContentItemsList;