import React, {useState} from 'react';
import css from './ConversationComponent.module.scss';
import {IComponent} from "../../../../../../interfaces/block";
import {useMySelector} from "../../../../hooks/redux";
import MessagesContainer from "./MessagesContainer/MessagesContainer";
import ConversationsContainer from "./ConversationsContainer/ConversationsContainer";

const ConversationComponent = (props: { active: string, componentData: IComponent }) => {
    const [activeConversation, setActiveConversation] = useState<string>('');

    return (
        <div>
            <MessagesContainer activeConversation={activeConversation}/>
            <ConversationsContainer
                activeConversation={activeConversation}
                setActiveConversation={setActiveConversation}
            />
        </div>
    );
};

export default ConversationComponent;