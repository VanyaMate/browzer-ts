import React from 'react';
import {useMySelector} from "../../../../../hooks/redux";
import Button from "../../../../UI/Buttons/Button/Button";

const ConversationsContainer = (props: {
    setActiveConversation: (id: string) => void,
    activeConversation: string
}) => {
    const conversations = useMySelector((state) => state.conversations);

    return (
        <div>
            {
                conversations.list.map((conversation) => {
                    return <Button
                        key={conversation.id}
                        active={conversation.id !== props.activeConversation}
                        onClick={() => {
                            props.setActiveConversation(conversation.id)
                        }}
                    >
                        {conversation.id}
                    </Button>
                })
            }
        </div>
    );
};

export default ConversationsContainer;