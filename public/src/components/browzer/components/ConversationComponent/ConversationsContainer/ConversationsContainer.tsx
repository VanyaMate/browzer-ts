import React, {useState} from 'react';
import {useActions, useMySelector} from "../../../../../hooks/redux";
import {useLazyGetFromConversationQuery} from "../../../../../store/messages/messages.api";
import {IMessage} from "../../../../../../../interfaces/messages";
import MediumIcon from "../../../../UI/Icons/MediumIcon/MediumIcon";
import BigButton from "../../../../UI/Buttons/BigButton/BigButton";
import css from './ConversationsContainer.module.scss';
import Vertical from "../../../../UI/Lists/Vertical/Vertial/Vertical";
import {IConversation} from "../../../../../../../interfaces/conversations";
import ConversationItem from "./ConversationItem/ConversationItem";
import ConversationControl from "./ConversationControl/ConversationControl";

const ConversationsContainer = (props: {
    setActiveConversation: (id: string) => void,
    activeConversation: string
}) => {
    const {conversations, auth, messages} = useMySelector(state => state);
    const [dispatchMessageLoading] = useLazyGetFromConversationQuery();
    const {setConversationMessagesStatus, addMessagesToEnd} = useActions();
    const [open, setOpen] = useState(false);

    const setConversation = function (conversation: IConversation<any>) {
        props.setActiveConversation(conversation.id);
        const messagesSliceData = messages[conversation.id];
        if(!messagesSliceData.firstLoad && !messagesSliceData.loading && !messagesSliceData.end) {
            setConversationMessagesStatus({
                conversationId: conversation.id,
                firstLoad: true,
                loading: true
            });
            dispatchMessageLoading({
                auth: auth.authKey,
                conversationId: conversation.id,
                limit: 20,
                offset: messagesSliceData.messages.length,
            })
                .then(({ data }) => {
                    addMessagesToEnd(data as IMessage[]);
                    setConversationMessagesStatus({
                        conversationId: conversation.id,
                        loading: false,
                        error: true
                    })
                })
                .catch(() => {
                    setConversationMessagesStatus({
                        conversationId: conversation.id,
                        loading: false,
                        error: true
                    })
                });
        }
    }

    return (
        <div className={[css.container, open ? '' : css.hide].join(' ')}>
            <ConversationControl open={open} setOpen={setOpen}/>
            <Vertical>
                {
                    conversations.list.map((conversation) => {
                        return <BigButton
                            key={conversation.id}
                            className={css.button}
                            active={conversation.id !== props.activeConversation}
                            always={conversation.id === props.activeConversation}
                            onClick={() => { setConversation(conversation) }}
                        >
                            <ConversationItem
                                always={conversation.id === props.activeConversation}
                                conversation={conversation}
                            />
                        </BigButton>
                    })
                }
            </Vertical>
        </div>
    );
};

export default ConversationsContainer;