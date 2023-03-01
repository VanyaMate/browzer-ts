import {ComponentType} from "../../../enums/blocks";
import Conversations from "../components/browzer/components/conversations/Conversations";
import {JSXElementConstructor} from "react";

type i = { [type: string]: { defaultTitle: string, Component: JSXElementConstructor<any> } };

const BrowzerContentItemsList: i = {
    [ComponentType.CONVERSATIONS]: {
        defaultTitle: 'Сообщения',
        Component: Conversations
    },
};

export default BrowzerContentItemsList;